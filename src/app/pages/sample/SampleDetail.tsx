import * as React from 'react';
import { useState, useEffect } from 'react';
import { useGetPostByIdQuery } from '../../core/services/post.service';
import { Button } from 'primereact';
import useBasePage from '../../shared/hooks/base-page.hook';
import downFile from '../../shared/utils/fileDownload';


const SampleDetail:React.FC = () => {
    const { paramId, goPage, BasePage } = useBasePage()

    //게시물 조회조건
    let param = {
        "blbrOtptNo": paramId
    }

    //useQuery 는 object 로 받고, mutation 은 [] 배열로 받는다.
    //내용조회 API 사용하여 데이터 불러옴
    //data 를 post 라는 변수에 받아오겠다는 선언
    const {data:post, refetch } = useGetPostByIdQuery(param)

    const [detail, setDetail] = useState(null)

    React.useEffect(()=> {
        refetch();
      }, [])

    //페이지 로딩되고 초기에 실행되는 hook
    useEffect(()=> {

        //게시판 내용 조회
        let boardData = post
        console.log('boardData =>', boardData)
        setDetail(boardData)

    }, [post]) //post 에 값이 들어오거나 변경되면 이 useEffect 가 실행됨

  
    const goEditPage = () => {
        goPage(`/sample/edit/${paramId}`)
    }

    const goListPage = () => {
        goPage('/sample/list')
    }

    if(!detail) {
        return (
            <h1>No Data!</h1>
        )
    }

    return(
    <BasePage>
        <div className='heading'>
            <h1>게시판 조회 (샘플)</h1>
        </div>
        <div className='mb'>
            <p>등록자 정보</p>
            <table className='table'>
                <caption>등록자 정보</caption>
                <tbody>
                <tr>
                    <th>등록자</th>
                    <td>s12345 {detail.wrtnEmn}</td>
                
                    <th>등록일시</th>
                    <td>{detail.blbrCretTs.join('.')}</td>
                </tr>
                </tbody>
            </table>    
        </div>
        <div>
            <p>등록 내용</p>
            <table className='table'>
                <caption>등록내용</caption>
                <tbody>
                <tr>
                    <th>구분</th>
                    <td>공지사항</td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>{detail.blbrTtlNm}</td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>{detail.blbrCon}</td>
                </tr>
                <tr>
                    <th>첨부파일</th>
                    <td>
                        {detail.atchDetail && detail.atchDetail.map((e) =>
                          <tr><button onClick={ () => downFile({
                            atchNo: e.atchNo,
                            atchSrn:e.atchSrn,
                            atchNm: e.atchNm
                          })}>{e.atchNm}</button></tr>
                        )}
                    </td>
                    
                </tr>
                </tbody>
            </table>
        </div>

        <div className='detailFooterButton'>
            <Button style={{width:100, justifyContent: 'center'}} onClick={goListPage} className="mr10">목록</Button>
            <Button style={{width:100, justifyContent: 'center'}} onClick={goEditPage} >수정</Button>
        </div>
    </BasePage>)
}
export default SampleDetail;