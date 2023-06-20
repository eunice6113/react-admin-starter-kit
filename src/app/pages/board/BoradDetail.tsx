import * as React from 'react';
import { useState, } from 'react';
import moment from 'moment';
import { Dropdown, InputText, RadioButton ,Button, confirmDialog} from 'primereact';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BasePage } from '../../shared/components/base/BasePage';
import ViewButtonsTemplate from '../../shared/components/template/ViewButtonsTemplate';
import ViewTemplate from '../../shared/components/template/ViewTemplate';
import useBasePage from '../../shared/hooks/base-page.hook';
import { CommonUtils } from '../../shared/utils/commonUtils';
import TextEditor from '../../shared/components/text-editor/TextEditor';
import { Post } from '../../core/models/ntc'
import { useGetNtcPostByIdQuery , useUpdateNtcPostMutation, useDeleteNtcPostMutation} from '../../core/services/ntc.service';
import { useGetCodeList } from '../../shared/hooks/get-code.hook';
import downFile from '../../shared/utils/fileDownload';
import CldFileUpload from '../../shared/components/CldFileUpload';


//공지사항 관리 상세/수정
const BoradDetail:React.FC = () => {
    const { goPage,commonCode,commonMsg, isRegister, paramId } = useBasePage()
 
    const [updatePost, ] = useUpdateNtcPostMutation()
    const [deletePost, ] = useDeleteNtcPostMutation()

    const BLBR_DCD = commonCode.BLBR_DCD_NTC;   //게시판구분코드(10:공지사항)
    const BLBR_TCD = useGetCodeList("P2837600");   //게시판유형코드(BLBR_TCD)
    const [cldPotlBlbrTcd,setCldPotlBlbrTcd] =  React.useState([]);  //게시판유형코드 필터된값

    const [mode, setMode] = React.useState<'view' | 'edit' | 'register'>(isRegister ? 'register' : 'view');
    const [atchNoVal, setAtchNoVal] = React.useState('');
    
    const [fileTempCnt,setFileTempCnt] =  React.useState(0)  //첨부파일

    const [detail, setDetail] = useState(null)
    const [initValues, setInitValues] = React.useState<Post>({
        blbrOtptNo: '',      //게시판출력번호
        cldPotlBlbrDcd:BLBR_DCD, //게시판구분코드
        cldPotlBlbrTcd:'',   //게시판유형코드
        cldPotlBlbrTcdNm:'', //게시판유형코드명
        blbrTtlNm:'',        //게시판제목명
        atchNo: '',          //첨부파일번호
        wrtnEmn:'',          //작성직원명
        blbrCon:'',          //게시판내용
        blbrCretTs:'',       //게시판등록일시
        rgsnYmd:'',          //등록년월일
        atchDetail:[],       //첨부파일리스트
        cldPotlAddif:[],     //부가정보
        fileTempCnt:0,
    });
           
    const categories = [
        {name: '노출', key: 'Y'}, 
        {name: '비노출', key: 'N'}];
    const [selectedCategory, setSelectedCategory] = React.useState(categories[1]);


    //게시물 조회조건
     let param = {
        "blbrOtptNo": paramId
    }

    //useQuery 는 object 로 받고, mutation 은 [] 배열로 받는다.
    //내용조회 API 사용하여 데이터 불러옴
    //data 를 post 라는 변수에 받아오겠다는 선언
    const {data:post, refetch } = useGetNtcPostByIdQuery(param)

    React.useEffect(()=> {
        refetch();
    }, [mode])

    React.useEffect(()=> {

        // 게시판유형 filter '10'공지사항에 해당하는것만 노출
        setCldPotlBlbrTcd(BLBR_TCD.filter((t) => t.value.substring(0,2) == BLBR_DCD))
        
    },[BLBR_TCD]) //<-여기를 [] 빈 배열로 놓아야 초기 한 번만 실행됨
    
    //페이지 로딩되고 초기에 실행되는 hook
    React.useEffect(()=> {
        
        //게시판 내용 조회
        let boardData:any = post

        if(boardData){
            if(boardData?.atchNo == null){
                boardData = {
                    ...boardData,
                    atchNo : ''
                }
                setAtchNoVal('')
            }
        }

        setDetail(boardData);
        setInitValues(boardData);

    }, [post]) //post 에 값이 들어오거나 변경되면 이 useEffect 가 실행됨

 
    React.useEffect(()=> {

         if(detail){

            detail.cldPotlAddif && detail.cldPotlAddif.map(({cldPotlAddifTcd,addifCon}) => {
    
                //중요공지여부 세팅
                 if(cldPotlAddifTcd == commonCode.ADDIF_TCD_IMPN_PBNT_YN){ 
                    setSelectedCategory(categories.find((t) => t.key == addifCon))
                 }
            })
         }

    }, [detail]) 
  

   //중요공지여부
   React.useEffect(()=> {
    formik.setFieldValue('cldPotlAddif', [
        {blbrOtptNo: initValues?.blbrOtptNo,
        cldPotlAddifTcd:commonCode.ADDIF_TCD_IMPN_PBNT_YN,   //중요공지여부
        addifCon:selectedCategory.key}
    ])
    }, [selectedCategory]) 

    React.useEffect(()=> {
        
        formik.values.fileTempCnt = fileTempCnt
        formik.setFieldValue('fileTempCnt',fileTempCnt)
    }, [fileTempCnt]) 

   //유효성체크 위한  formik
   const formik:any = useFormik({
        initialValues: initValues,
        enableReinitialize: true,
        // validate,
        validationSchema: Yup.object({
            cldPotlBlbrTcd: Yup.string().trim()
            .required(commonMsg.COM_ERR_MSG_001),
            blbrTtlNm: Yup.string().trim()
            .required(commonMsg.COM_ERR_MSG_001)
            .max(200,'200'+commonMsg.COM_ERR_MSG_003),
            blbrCon: Yup.string().trim()
            .required(commonMsg.COM_ERR_MSG_001),
            fileTempCnt: Yup.number()
            .max(0, '파일이 업로드되지 않았습니다. 상단의 업로드 버튼 클릭 또는 파일삭제 후 진행해 주세요.'),
        }),  
        validate: (values) => {
            let errors = {}

            if(values.blbrCon.length > 0){
                 const blbrCon = values.blbrCon.replace(/(<([^>]+)>)/gi, '').trim()
                 
                 if(blbrCon.length == 0){
                     errors = {...errors, blbrCon : commonMsg.COM_ERR_MSG_001}
                 }
             }
     
             return errors
        },
        onSubmit: values => {          
           console.log(JSON.stringify(values,null,2))

            updatePost(values).unwrap()
            .then(( response:any ) => {
                console.log('updatePost response =>',response)

                if(response) {
                    confirmDialog({
                        message: '공지사항이 수정되었습니다.',
                        acceptLabel: '확인',
                        className: 'noHeader oneButton',
                        accept: () => {
                            setMode('view')
                            goPage(`/stm/ntc/${paramId}`);
                        },
                    })
                }
            }).catch((error) => console.error('rejected', error))

        }
    })

   //목록 버튼
    const list = () => {
         if(!CommonUtils.isDeepEqual(detail,formik.values)){
            confirmDialog({
                message: '등록/수정 내용이 있습니다.\n목록으로 이동 시 내용이 삭제됩니다.\n이동하시겠습니까?',
                className: 'noHeader',
                accept: ()=> { 
                    goList();
                },
                reject: () => { }
            })
        }else{
            goList();
        } 
    }

     //수정 버튼
     const goList = () => {
        goPage('/stm/ntc/list');
    }

    //수정 버튼
    const edit = () => {
        setMode('edit');
    }

    //삭제 버튼
    const remove = () => {
        //console.log('삭제')
        confirmDialog({
            message: '공지사항을 삭제하시겠습니까?',
            className: 'noHeader',
            accept: ()=> { 
                deletePost(formik.values).unwrap()
                .then(( response:any ) => {
    
                    confirmDialog({
                        message: '공지사항이 삭제되었습니다.',
                        className: 'noHeader oneButton',
                        acceptLabel: '확인',
                        accept: () => {goPage('/stm/ntc/list');},
                    })
                    
                }).catch((error) => console.error('rejected', error))
            },
            reject: () => { console.log('취소')}
        })
     
    }
    
    //취소 버튼
    const cancel = () => {
        setMode('view')
    }

    //dir : 파일업로드 경로(gnrl:일반, imln:이미지링크, chls:체크리스트, apfr:신청서)
    let uploadUrl = commonCode.FILE_UPLOAD_URL+`?dir=gnrl&inAtchNo=${atchNoVal}`

    const UploadAfter = (event) => {

        let atchData = JSON.parse(event.xhr.response);
        let resAtchNo :string = atchData.response.atchNo;
        let resAtchList = atchData.response.atchDetail;

        //첨부파일번호set
        setAtchNoVal(resAtchNo);

        if(formik.values.atchDetail){
            formik.setValues({ ...formik.values,atchDetail: formik.values.atchDetail.concat(resAtchList) });       
        }else{
            formik.setValues({ ...formik.values,atchDetail: resAtchList });       
        }
        

    } 
    
    React.useEffect(()=> {
        formik.setValues({...formik.values,atchNo:atchNoVal})
    }, [atchNoVal]) 
    
    const PopFile = (condition) => {
        formik.setValues({ ...formik.values,atchDetail: formik.values.atchDetail.filter((t) => t.atchSrn !== condition.atchSrn) });        
    }  

    const iff = (condition, then, otherwise) => condition? then : otherwise;
   
    const isFormikError = (name: any) => {
        return  Boolean(formik.touched[name] && formik.errors[name])
    }

    //api 읽어와서 업데이트 할 내용
    const authorInfo = {
        title: '등록자 정보',
        rows: [
            {
                cols: [
                    {
                        key: '등록자', 
                        value: iff(detail?.emm , detail?.emm+' ('+detail?.wrtnEmn+')' ,''),
                    },
                    {
                        key: '등록일시', 
                        value: moment(detail?.blbrCretTs, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm:ss'),
                    },
                ]
            }
        ]
    }

    const contentsInfo = {
        title: iff(mode === 'edit', '수정 내용','상세 내용'),
        mode: mode,
        hasRequired: true,
        rows: [
            {
                cols: [
                    {
                        required: true,
                        key: '구분', 
                        error: isFormikError('cldPotlBlbrTcd'),
                        helperText: formik.errors.cldPotlBlbrTcd,
                        value: <span>{detail?.cldPotlBlbrTcdNm}</span>,
                        editingValue: <Dropdown 
                                        name='cldPotlBlbrTcd'
                                        id='cldPotlBlbrTcd'
                                        value={formik.values?.cldPotlBlbrTcd}
                                        options={cldPotlBlbrTcd}
                                        onChange={formik.handleChange}
                                        optionLabel="name"
                                        placeholder="선택"/>
                    },
                ]
            },
            {
                cols: [
                {
                    required: true,
                    key: '제목', 
                    error: isFormikError('blbrTtlNm'),
                    helperText: formik.errors.blbrTtlNm,
                    value: <span> {detail?.blbrTtlNm}</span>,
                    editingValue: <InputText className={iff(isFormikError('blbrTtlNm'), 'p-invalid' , '')}
                                            name="blbrTtlNm" 
                                            id='blbrTtlNm'
                                            type="text" 
                                            maxLength={200}
                                            placeholder="제목을 입력해주세요"
                                            value={formik.values?.blbrTtlNm}
                                            onChange={formik.handleChange} />,
                },
            ]
        },
       
        {
            cols: [
                {
                    required: true,
                    key: '내용', 
                    error: isFormikError('blbrCon'),
                    helperText: formik.errors.blbrCon,
                    value: <div className='ql-editor qlViewMode' dangerouslySetInnerHTML={{ __html: detail?.blbrCon }}/>,
                    editingValue: <TextEditor 
                                    className={iff(isFormikError('blbrCon'), 'p-invalid' , '')}
                                    name='blbrCon'
                                    value= {formik.values?.blbrCon || ''}
                                    onTextChange={(e) => formik.setFieldValue('blbrCon', CommonUtils.nullToString(e.htmlValue))} />,
                },
            ]
        },
        
        {
            cols: [
                {
                    key: '첨부파일', 
                    value: (
                        <>
                         {detail && detail.atchDetail
                        && detail.atchDetail.length > 0 ?
                            <div className='downloadFiles'>
                                <ul className='fileList'>
                                    {
                                        detail.atchDetail.map((e:any) => (
                                            <li key={e.atchNo + e.atchSrn}
                                                onClick={ () => downFile({
                                                atchNo: e.atchNo,
                                                atchSrn:e.atchSrn,
                                                atchNm: e.atchNm
                                            })}><i className='pi pi-download mr5 downloadIco'></i><u>{e.atchNm}</u><span className='ml10'></span></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        :
                        <></>
                        }
                        </>
                        
                       
                    ),
                    editingValue: <>
                    <div className={iff(isFormikError('fileTempCnt') , 'p-invalid' , '')}>
                    <CldFileUpload  name="files"
                                    url={uploadUrl}
                                    onUpload={UploadAfter}
                                    multiple={true}
                                    accept="*"
                                    maxFileSize={50000000}
                                    maxFileCnt ={5}
                                    acceptFileType="hwp, ppt, pptx, doc, docx, txt, xls, xlsx, jpg, png, avi, mov, mpeg4"
                                    atchDetail={formik.values?.atchDetail} 
                                    setFileTempCnt = {setFileTempCnt}
                                    />
                    </div>
                    {iff(isFormikError('fileTempCnt')  , <div className='p-error'>{formik.errors.fileTempCnt}</div> , '')} 
                    {formik.values && formik.values.atchDetail 
                    && formik.values.atchDetail.length > 0 ?
                    <div className='downloadFiles mt10'>
                        <ul className='fileList'>
                            {  
                                formik.values && formik.values.atchDetail && formik.values.atchDetail.map((e) => (
                                    <li key={e.atchNo+e.atchSrn}><i className='pi pi-download mr5 downloadIco'></i><u>{e.atchNm}</u>
                                    <span className='ml10'>{CommonUtils.byteCal(e.atchSizeVl)}</span>
                                    <Button type='button' icon='pi pi-times-circle' className='p-button-text deleteFileBtn' onClick={ () => PopFile({
                                          atchNo: e.atchNo,
                                          atchSrn:e.atchSrn,
                                          atchNm: e.atchNm
                                    })}/></li>
                                ))
                            }
                        </ul>
                    </div>
                    :
                    <></>
                    }
                    </>
                    
                },
            ]
        },
        {
            cols: [
                {
                    key: '중요공지여부',
                    value: <span>{selectedCategory.name}</span>,
                    editingValue: (
                        categories.map((category) => {
                        return (
                            <span key={category.key} className="field-radiobutton mr20">
                                <RadioButton 
                                    inputId={category.key}
                                    name="category"
                                    value={category} 
                                    onChange={(e) => setSelectedCategory(e.value)} 
                                    checked={selectedCategory.key === category.key} 
                                    disabled={category.key === 'R'} />
                                <label className='ml5' htmlFor={category.key}>{category.name}</label>
                            </span>
                    )}))
                }
            ]
        },
    ]
    }

    return(
    <BasePage>
        {/* 등록자 정보 */}
        <ViewTemplate {...authorInfo} />

        {/* 등록 내용 */}
        <ViewTemplate {...contentsInfo} />

        <form onSubmit={formik.handleSubmit}>
            <ViewButtonsTemplate 
                mode={mode}
                list={list}
                edit={edit}
                remove={remove}
                cancel={cancel}
            />
        </form>
       

    </BasePage>)
}
export default BoradDetail;
