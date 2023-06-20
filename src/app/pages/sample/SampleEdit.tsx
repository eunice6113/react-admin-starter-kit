import * as React from 'react';
import {
    useGetPostByIdQuery,     //상세조회
    useUpdatePostMutation,      //수정
} from '../../core/services/post.service'
import { Post } from '../../core/models/post'
import useBasePage from '../../shared/hooks/base-page.hook';
import { Button, InputText, InputTextarea } from 'primereact';
import { FileUpload } from 'primereact/fileupload';

const SampleEdit:React.FC = () => {
    const { paramId, goPage, goBack, commonCode, BasePage } = useBasePage()

    //내용조회 API 사용하여 데이터 불러옴

    //게시물 조회조건
    let param = {
        "blbrOtptNo": paramId
    }

    const {data:post, } = useGetPostByIdQuery(param)

    const [startLoading, setStartLoading] = React.useState(false)
    const [updatePost, ] = useUpdatePostMutation()
    const [detail, setDetail] = React.useState(null)

    const [values, setValues] = React.useState<Post>({
        blbrOtptNo: '',
        cldPotlBlbrDcd:"10",
        cldPotlBlbrTcd:"1001",
        blbrTtlNm:'', //제목
        atchNo: '',
        wrtnEmn:'',
        blbrCon:'', //내용
        atchDetail:[]
    });

    React.useEffect(()=> {

        //게시판 내용 조회
        let boardData:any = post
        console.log('boardData =>', boardData)

        setDetail(boardData)
        setValues(boardData)

    }, [post]) //post 에 값이 들어오거나 변경되면 이 useEffect 가 실행됨

  
    const Cancel = () => {
        
        //뒤로가기
        goBack();

        //버튼 로딩바 안보이게 하기
        setStartLoading(false);
    }

    const Save = () => {

        //버튼 로딩바 보이게 하기
        setStartLoading(true);

        updatePost(values).unwrap()
        .then(( response:any ) => {
            console.log('updatePost response =>',response)

            if(response) {
                //버튼 로딩바 안보이게 하기
                setStartLoading(false);

                alert('게시물이 수정되었습니다.');
                goPage(`/sample/detail/${paramId}`)
            }
        }).catch((error) => console.error('rejected', error))
    }

    const handleChange = (prop: keyof Post) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const UploadAfter = (event) => {

        let atchData = JSON.parse(event.xhr.response);
        let resAtchNo :string = atchData.response.atchNo;
        let resAtchList = atchData.response.atchDetail;

        console.log("1:"+ JSON.stringify(atchData.response));
        console.log("_atchNo:"+ resAtchNo);

        //첨부파일번호set
        setValues({ ...values, atchNo: resAtchNo });    
        
        console.log("values.atchNo:",values.atchNo);
           

        if(values.atchDetail){
            setValues({ ...values,atchDetail: values.atchDetail.concat(resAtchList) });       
        }else{
            setValues({ ...values,atchDetail: resAtchList });       
        }
        

    } 
    
    const DeleFile = (condition) => {
        setValues({ ...values,atchDetail: values.atchDetail.filter((t) => t.atchSrn !== condition.atchSrn) });        
    }  

    //dir : 파일업로드 경로(gnrl:일반, imln:이미지링크, chls:체크리스트, apfr:신청서)
    let uploadUrl = commonCode.FILE_UPLOAD_URL+`?dir=gnrl&inAtchNo=${values?.atchNo}`


    if(!detail) {
        return (
            <h1>No Data!</h1>
        )
    }

    return(
    <BasePage>
        <div className='heading'>
            <h1>게시판 수정 (샘플)</h1>
        </div>
        <div className='mb'>
            <p>등록자 정보</p>
            <table className='table'>
                <caption>등록자 정보</caption>
                <tbody>
                <tr>
                    <th>등록자</th>
                    <td>s12345 {detail?.wrtnEmn}</td>
                
                    <th>등록일시</th>
                    <td>{detail?.blbrCretTs.join('.')}</td>
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
                    <td>
                        <InputText 
                            value={values?.blbrTtlNm}
                            onChange={handleChange('blbrTtlNm')} 
                        />
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <InputTextarea 
                        rows={5}
                        value={values?.blbrCon}
                        onChange={handleChange('blbrCon')} 
                        />
                    </td>
                </tr>
                <tr>
                    <th>첨부파일</th>
                    <td>
                    <FileUpload name="files" url={uploadUrl} onUpload={UploadAfter} multiple accept="image/*" maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                    </td>
                </tr>
                <tr>
                    <th>첨부파일</th>
                    <td>
                        {values.atchDetail && values.atchDetail.map((e) =>
                          <div key={e.atchNm}>
                            {e.atchNm}
                          <button onClick={ () => DeleFile({
                            atchNo: e.atchNo,
                            atchSrn:e.atchSrn,
                            atchNm: e.atchNm
                          })}>삭제</button>
                          
                          </div>
                        )}
                    </td>
                    
                </tr>
                </tbody>
            </table>
        </div>

        <div className='detailFooterButton'>
            <Button style={{width:100, justifyContent: 'center'}} onClick={Cancel} className="mr10">취소</Button>
            <Button style={{width:100, justifyContent: 'center'}} onClick={Save} loading={startLoading}>확인</Button>
        </div>
    </BasePage>)
}
export default SampleEdit;