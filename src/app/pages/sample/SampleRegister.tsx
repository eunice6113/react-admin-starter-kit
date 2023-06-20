import * as React from 'react';
import { useState } from 'react';
import {
    useAddPostMutation,     //등록
} from '../../core/services/post.service'
import useBasePage from '../../shared/hooks/base-page.hook';
import { Button, Dropdown, InputText, InputTextarea } from 'primereact';
import { FileUpload } from 'primereact/fileupload';
import { useDeleteAtchMutation } from '../../core/services/atch.service'

interface Post {
    cldPotlBlbrDcd:string,
    cldPotlBlbrTcd:string,
    blbrTtlNm:string, //제목
    atchNo:string,
    blbrHgrnNo:string, 
    wrtnEmn:string, //작성자
    blbrInqNbi:number,
    blbrCon:string, //내용
}

const SampleRegister:React.FC = () => {
    const { goPage, goBack, commonCode, BasePage } = useBasePage()

    //등록
    const [addPost, ] = useAddPostMutation()
    //첨부파일 삭제
    const [delAtch, ] = useDeleteAtchMutation()

    const [values, setValues] = useState<Post>({
        cldPotlBlbrDcd:'10',
        cldPotlBlbrTcd:'',
        blbrTtlNm:'', //제목
        atchNo:'',
        blbrHgrnNo:'',
        wrtnEmn:'', //작성자
        blbrInqNbi:0,
        blbrCon:'', //내용
    });


    const [atchDetail,setAtchDetail] =  useState([])  //첨부파일

  //게시판구분코드
    const BLBR_DCD = [
        { value: '10', name: '공지사항' },
        { value: '20', name: 'FAQ' },
        { value: '30', name: '건의및개선' },
    ]

    const handleChange = (prop: keyof Post) => (event) => {
        console.log(event.target.value)
        setValues({ ...values, [prop]: event.target.value });
    };
   
    const Cancel = () => {
        
        //뒤로가기
        goBack();
    }

    const Save = () => {
        console.log('values', values)

        addPost(values).unwrap()
        .then(( response:any ) => {
            console.log('addPost response =>', response)

            if(response) {
                alert('게시물이 등록되었습니다.');
                goPage('/sample/list');
            }
        })
        .catch((error) => console.error('rejected', error))
    }

    const UploadAfter = (event) => {

        let atchData = JSON.parse(event.xhr.response);
        let resAtchNo = atchData.response.atchNo;
        let resAtchList = atchData.response.atchDetail;

        //첨부파일번호set
        setValues({ ...values,atchNo: resAtchNo });        

        if(atchDetail){
            setAtchDetail(atchDetail.concat(resAtchList));
            
        }else{
            setAtchDetail(resAtchList);     
        }
    }

    const DelFile = (condition) => {
    
        delAtch(condition).unwrap()
        .then(( response:any ) => {
            console.log('delAtch response =>', response)
    
                console.log('삭제');
                setAtchDetail(atchDetail.filter((t) => t.atchSrn !== condition.atchSrn))
        })
        .catch((error) => console.error('rejected', error))
        
    
    }

    //dir : 파일업로드 경로(gnrl:일반, imln:이미지링크, chls:체크리스트, apfr:신청서)
    let uploadUrl = commonCode.FILE_UPLOAD_URL+`?dir=gnrl&inAtchNo=${values.atchNo}`

    return(
    <BasePage>
        <div className='heading'>
            <h1>게시판 등록 (샘플)</h1>
        </div>
        <div className='mb'>
            <p className="mb10">등록자 정보</p>
            <table className='table'>
                <caption>등록자 정보</caption>
                <tbody>
                <tr>
                    <th>등록자</th>
                    <td>a12345</td>
                
                    <th>등록일시</th>
                    <td>2023.03.02. 15:00:00</td>
                </tr>
                </tbody>
            </table>    
        </div>
        <div>
            <p className="mb10">등록 내용</p>
            <table className='table'>
                <caption>등록내용</caption>
                <tbody>
                <tr>
                    <th>구분</th>
                    <td>
                    <Dropdown 
                        value={values.cldPotlBlbrDcd || ''} 
                        options ={BLBR_DCD}
                        onChange={handleChange('cldPotlBlbrDcd')} 
                        optionLabel="name" 
                        placeholder="Select a City" />

                    </td>
                </tr>
                <tr>
                    <th>유형</th>
                    <td>
                    <Dropdown 
                        value={values.cldPotlBlbrTcd || ''} 
                        options={commonCode.BLBR_DCD}
                        onChange={handleChange('cldPotlBlbrTcd')} 
                        optionLabel="name" 
                        placeholder="Select a City" 
                    />
                       
                    </td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>
                        <InputText 
                            value={values.blbrTtlNm}
                            onChange={handleChange('blbrTtlNm')}  
                        />
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <InputTextarea 
                            rows={5} 
                            cols={30} 
                            value={values.blbrCon} 
                            onChange={handleChange('blbrCon')} 
                        />
                    </td>
                </tr>
                <tr>
                    <th>첨부파일</th>
                    <td>
                    <FileUpload name="files" url={uploadUrl} onUpload={UploadAfter} multiple accept="image/*" maxFileSize={100000000}
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td>
                        {atchDetail && atchDetail.map((e) =>
                          <tr>
                       
                            {e.atchNm}

                        <button onClick={ () => DelFile({
                            atchNo: e.atchNo,
                            atchSrn:e.atchSrn,
                          })}>삭제</button>
                        </tr>
                        )}
                    </td>
                    
                </tr>
                </tbody>
            </table>    
        </div>

        <div className='detailFooterButton'>
            <Button style={{width:100, justifyContent: 'center'}} onClick={Cancel} className="mr10">취소</Button>
            <Button style={{width:100, justifyContent: 'center'}} onClick={Save}>확인</Button>
        </div>
    </BasePage>)
}
export default SampleRegister;