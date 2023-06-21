import * as React from 'react';
import moment from 'moment';
import NoData from '../../shared/components/ui/NoData';
import useBasePage from '../../shared/hooks/base-page.hook';
import { BasePage } from '../../shared/components/base/BasePage';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { paginator } from '../../shared/utils/table-paginator';
import { useGetNtcPostsQuery } from '../../core/services/ntc.service'
import { NtcSearchParam } from '../../core/models/ntc'
import { useGetCodeList } from '../../shared/hooks/get-code.hook';
import { useAppSelector,useAppDispatch } from '../../core/hooks';
import { storeSearchParam } from '../../core/slices/history.slice';
import { CommonUtils } from '../../shared/utils/commonUtils';
import './board-list.css';


//공지사항 관리
const BoardList: React.FC = () => {
    const { goPage, commonCode, commonMsg } = useBasePage()
    
    //검색조건 set 하기위해 
    const dispatch = useAppDispatch()

    //검색조건 get >> 리덕스의 store 에서 가져온다 
    const history:any = useAppSelector((state) => state.history.searchParams)

    const BLBR_DCD = commonCode.BLBR_DCD_NTC;   //게시판구분코드(10:공지사항)
    const BLBR_TCD = useGetCodeList("P2837600");   //게시판유형코드(BLBR_TCD)
    const [cldPotlBlbrTcd,setCldPotlBlbrTcd] =  React.useState([{value:'', name:'구분 전체'}])  //게시판유형코드 필터된값


    const options = [   //검색조건 selectBox
        { name: '전체', value: 'srwd',  },
        { name: '제목', value: 'blbrTtlNm',  },
        { name: '내용', value: 'blbrCon', },
        { name: '등록자', value: 'emm',  },
    ];

    //table
    const [data, setData] = React.useState([]);
    const [first, setFirst] = React.useState(history?.first ? history?.first : 0);  //페이지 첫 행 번호 0,10,20,30,...
    const [rows, setRows] = React.useState(history?.rows ? history?.rows : 10); //페이지 당 게시물 숫자 dropdownOptions
    const [dataCnt, setDataCnt] = React.useState(0);
    const [pageSizeVal] = React.useState(10);
    
    

    //검색조건 세팅 값 (화면 세팅용 , 실제 api파라미터 아님)
    const [values, setValues] = React.useState<NtcSearchParam>({
        cldPotlBlbrDcd:BLBR_DCD,    //구분코드
        cldPotlBlbrTcd:'',    //유형코드
        srwd:'',      //전체
        blbrTtlNm:'', //제목
        blbrCon:'',   //내용
        emm:'',    //등록자명
        fromDate: moment().set('month', -1).format('YYYYMMDD'),   //시작일자
        toDate: moment().format('YYYYMMDD'),   //종료일자
        dummy:'',
        optionVal:'',
        pbntYn:'Y',
    });

    //게시물 조회조건 (실제 api파라미터)
    const [param, setParam] = React.useState<NtcSearchParam>({
        pageSize: 10,
        pageNo: 1,
        pageGrpInqYn : 'Y',
        cldPotlBlbrDcd:'10',    //구분코드
        cldPotlBlbrTcd: history?.cldPotlBlbrTcd ? history?.cldPotlBlbrTcd : '',    //유형코드
        pbntYn:'Y',
        fromDate: history?.fromDate ? history?.fromDate : moment().set('month', -1).format('YYYYMMDD'),   //시작일자
        toDate: history?.toDate ? history?.toDate : moment().format('YYYYMMDD'),   //종료일자
        first:history?.first ? history?.first : first,
        rows:history?.rows ? history?.rows : rows
    });

    //검색구분
    const [optionVal, setOptionVal] = React.useState('srwd') //전체

    //목록조회 API 사용하여 데이터 조회
    const { data:posts, refetch } = useGetNtcPostsQuery( param ) 

    //초기화
    React.useEffect(() => {
        
        // 검색조건 있으면 세팅
        if(!CommonUtils.isEmpty(history)){
            setParam(history);
            setOptionVal(history?.optionVal)
            setValues(history);
        }
       refetch();
    }, []); 

    React.useEffect(()=> {

        // 게시판유형 filter '10'공지사항에 해당하는것만 노출
        setCldPotlBlbrTcd(cldPotlBlbrTcd.concat(BLBR_TCD.filter((t) => t.value.substring(0,2) == BLBR_DCD)))
        
    },[BLBR_TCD]) //<-여기를 [] 빈 배열로 놓아야 초기 한 번만 실행됨
    
    React.useEffect(() => {

        if(posts) {
            let response:any = posts
            let boardData = response.contents
            
            setDataCnt(response.ttalDataNbi);

            //rows 데이터 배열 초기화
            setData([])
        
            //데이터 읽어와서 필요한 데이터만 골라서 테이블 배열에 추가
            boardData.map((data) => {

                let obj = {
                    no: data.blbrOtptNo,
                    type: data.cldPotlBlbrTcdNm,
                    subject: data.blbrTtlNm,
                    attach: data.atchNo? <i className='pi pi-paperclip'></i>:<></>,
                    author: data?.emm ? data?.emm+' ('+data?.wrtnEmn+')' :'',
                    hit: data.blbrInqNbi,
                    registerDate: moment(data.cretYmd).format('YYYY.MM.DD'),
                    pbntYn: data.pbntYn, //중요공지여부
                };
                    //rows 데이터 업데이트
                setData((prev) => (
                    [...prev, obj]
                ))
                      
            })
        }
    }, [posts]); 

    const handleChange = (prop: keyof NtcSearchParam, value:any) => {

        if(prop === 'fromDate' || prop === 'toDate'){
            setValues({ ...values, [prop]: moment(value.target.value).format('YYYYMMDD') });
        }else{
            setValues({ ...values, [prop]: value });
        }
    };

    const onCustomPage = (event:any) => {
        
        setFirst(event.first);  //페이지 첫 행 번호 0,10,20,30,...
        setRows(event.rows);    //페이지 당 게시물 숫자 dropdownOptions
        setParam ({...param,
                    first:event.first,
                    rows:event.rows}) // 검색조건 set , 뒤로가기 등으로 왔을때 필요
    }
    
    //신규 등록 버튼
    const register = (event:any) => {
        goPage(`/board/register`);
    }

    const goDetail = ( e:any ) => {

        //검색조건 set >> 리덕스의 store 에 저장
        dispatch( storeSearchParam(param) )

        goPage(`/board/${ e.data.no}`);
    }

    const searchKeyDown = (e) => {
        if(e.key === 'Enter') {
            search();
        }
    }

    const search = () => {
        setFirst(0) // 검색버튼 클릭 시 1페이지로 
        setParam({
            pageSize: pageSizeVal,
            pageNo: 1,
            pageGrpInqYn : 'Y',
            first:first,
            rows:rows,
            cldPotlBlbrDcd:BLBR_DCD,
            cldPotlBlbrTcd:values.cldPotlBlbrTcd,
            [optionVal]:values.dummy,
            fromDate:values.fromDate,   //시작일자
            toDate: values.toDate,   //종료일자
            pbntYn:'Y',
            dummy:values.dummy,
            optionVal:optionVal
        })

        refetch();
    }

    //중요공지 스타일
    const rowClass = (data:any) => {
        return {
            'important-notice': data.pbntYn === 'Y'
        }
    }
    
    const headerTemplate = [
        {
            field: 'idx',
            header: '순번',
            sortable: false,
            style: {width: '8%', textAlign:'center', color:'gray'}
        },
        {
            field: 'type',
            header: '구분',
            sortable: false,
            style: {width: '10%'},
            className: 'text-center'
        },
        {
            field: 'subject',
            header: '제목',
            sortable: false,
            style: {width: '40%'},
        },
        {
            field: 'attach',
            header: '첨부파일',
            sortable: false,
            style: {width: '10%'},
            className: 'text-center'
        },
        {
            field: 'author',
            header: '등록자',
            sortable: false,
            style: {width: '12%'},
            className: 'text-center'
        },
        {
            field: 'hit',
            header: '조회수',
            sortable: false,
            style: {width: '10%'},
            className: 'text-center'
        },
        {
            field: 'registerDate',
            header: '등록일',
            sortable: false,
            style: {width: '10%'},
            className: 'text-center'
        },
        {
            field: 'no',
            header: '게시판번호',
            sortable: false,
            style: {display: 'none'}
        },
    ]
    const onIdxTemplate = (data:any, props:any) =>{
        return dataCnt -props.rowIndex ;
    }
    return(
    <BasePage className='boardList'>
        <div className='searchBar' onKeyDown={(e) => searchKeyDown(e)}>
            <Dropdown value={optionVal} options={options} onChange={(e) => setOptionVal(e.value)} 
                optionLabel='name' placeholder='전체' />
            <Dropdown value={values.cldPotlBlbrTcd} options={cldPotlBlbrTcd} onChange={(e) => handleChange('cldPotlBlbrTcd', e.value)} 
                optionLabel='name' placeholder='전체' />

            <InputText className='searchTxt' placeholder='검색어를 입력해주세요' value={values.dummy} onChange={(e) => handleChange('dummy', e.target.value)} />

            <Calendar maxDate={moment(values?.toDate).toDate()} dateFormat='yy-mm-dd' value={moment(values.fromDate).toDate()} onChange={(e) => handleChange('fromDate', e)} showIcon />
            <span className='mt5'>~</span>
            <Calendar minDate={moment(values?.fromDate).toDate()} dateFormat='yy-mm-dd' value={moment(values.toDate).toDate()} onChange={(e) => handleChange('toDate', e)} showIcon />
            <Button label='조회' onClick={search}/>
        </div>

        <div className='toolbar mb10'>
            <p>총 <span className='pageNm'>{dataCnt}</span>개</p>
            <Button className='ml-auto outline' label='신규등록' icon='pi pi-pencil' onClick={register} />
        </div>

        <DataTable value={data} paginator paginatorTemplate={paginator} 
            onRowClick={(e) => goDetail(e)}
            first={first} 
            rows={rows}
            rowClassName={rowClass}
            onPage={onCustomPage} 
            emptyMessage = {<NoData message={commonMsg.COM_INF_MSG_001} />}
            responsiveLayout='scroll'>
            {headerTemplate.map((col:any, index) => (
                <Column key={col.header} field={col.field} header={col.header} style={col.style} className={col.className} body={col.field == 'idx' ? onIdxTemplate : null}></Column>
            ))}
        </DataTable>
    </BasePage>)
}
export default BoardList;

