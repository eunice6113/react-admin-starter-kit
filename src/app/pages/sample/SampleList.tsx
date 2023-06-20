import * as React from 'react';
import { Button, Column, DataTable } from 'primereact';
import {
  useGetPostsQuery,
} from '../../core/services/post.service'
import useBasePage from '../../shared/hooks/base-page.hook';
import { paginator } from '../../shared/utils/table-paginator';
import { TableHead } from '../../core/models/table-head';

//테이블 헤더 내용 정의 (퍼블리셔가 1차적으로 작성)
const headCells: TableHead[] = [
  {
    field: 'id', //참조하는 값
    header: 'ID', //테이블 헤더에 표출되는 제목
    sortable: false, //sorting 관련내용 추후 없데이트
    style: { width: '7%' } //테이블 너비
  },
  {
    field: 'subject',
    header: '제목',
    sortable: false,
    style: { width: '25%' }
  },
  {
    field: 'file',
    header: '첨부파일',
    sortable: false,
    style: { width: '10%' }
  },
  {
    field: 'hit',
    header: '조회수',
    sortable: false,
    style: { width: '10%' }
  },
  {
    field: 'date',
    header: '등록일',
    sortable: false,
    style: { width: '15%' }
  },
];

const SampleList:React.FC = () => {
  const { goPage, BasePage } = useBasePage()
  const [boardRow, setBoardRows] = React.useState([])
  const [first, setFist] = React.useState(0); //읽어올 데이터 index 시작점
  const [rows, setRows] = React.useState(10); //표시할 행 개수

  

  const handleCustomPage = (event) => {
    setFist(event.first);
    setRows(event.rows);
  }

  //게시물 조회조건
  let paramInit = {
    pageSize: 10,
    pageNo: 1,
    pageGrpInqYn : 'Y',
    pageGrpNbi : 5,
    cldPotlBlbrDcd:'10',
    cldPotlBlbrTcd:''
  }
  const [param, setParam] = React.useState(paramInit)

  //목록조회 API 사용하여 데이터 조회
  const { data:posts, refetch } = useGetPostsQuery( param )
  
  //페이지 로딩되고 초기에 실행되는 hook
  React.useEffect(()=> {
    refetch();
  }, []) //<-여기를 [] 빈 배열로 놓아야 초기 한 번만 실행됨


  React.useEffect(()=> {

    if(posts) {
      let response:any = posts
      let boardData = response.contents
  
      //rows 데이터 배열 초기화
      setBoardRows([])
  
      //데이터 읽어와서 필요한 데이터만 골라서 테이블 배열에 추가
      boardData.map(({blbrOtptNo, blbrTtlNm, blbrInqNbi, blbrCretTs, wrtnEmn}) => {
        let obj = {
          id: blbrOtptNo,             //번호
          subject: blbrTtlNm,         //제목
          file: '',                   //첨부파일
          hit: blbrInqNbi,            //조회수
          date: blbrCretTs.join('-')  //날짜
        };

        //rows 데이터 업데이트
        setBoardRows((prev) => (
          [...prev, obj]
        ))
      })
    }

  }, [posts]) //posts 값에 뭔가가 들어오거나 변경될 때 실행됨

  const handleRowClick = (e:any) => {
    let id = e.data.id;
    goPage(`/sample/detail/${id}`);
  }

  const search = () => {

    setParam({
        pageSize: 5,
        pageNo: 1,
        pageGrpInqYn : 'Y',
        pageGrpNbi : 5,
        cldPotlBlbrDcd:'10',
        cldPotlBlbrTcd:''
    })
    refetch()
  }

  return (
    <BasePage>

      <div className='heading'>
        <h1>게시판 관리 (샘플)</h1>
      </div>

      <div style={{display: 'flex', justifyContent: 'justify-end', marginBottom: 10}}>
          <Button style={{marginRight:20, width:100, justifyContent: 'center'}} onClick={()=>{goPage('/sample/register')}}>등 록</Button>
          <Button style={{width:100, justifyContent: 'center'}} onClick={search}>조회<br/>(검색후)</Button>
      </div>

      <DataTable 
        value={boardRow} 
        paginator 
        paginatorTemplate={paginator} 
        first={first} 
        rows={rows} 
        onPage={handleCustomPage} 
        responsiveLayout='scroll'
        onRowClick={handleRowClick}
      >
        {headCells.map(({field, header, sortable, style}, index) => (
          <Column key={field} field={field} header={header} sortable={sortable} style={style}></Column>
        ))}
      </DataTable>
    </BasePage>
  );
}
export default SampleList;