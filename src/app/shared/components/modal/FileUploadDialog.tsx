import { Button } from 'primereact';
import * as React from 'react';
import { useDeleteAtchMutation } from '../../../core/services/atch.service';
import CldFileUpload from '../CldFileUpload';

interface IProps {
    uploadUrl: string;
}
const UploadFile: React.FC<IProps> = ({ uploadUrl}) => {
    const [atchNoVal, setAtchNoVal] = React.useState('')
    const [_atchDetail, _setAtchDetail] = React.useState([])
    const [delAtch] = useDeleteAtchMutation()
    
    const UploadAfter = (event) => {

        // console.log('uploadafter==', event)
        let atchData = JSON.parse(event.xhr.response);
        let resAtchNo = atchData.response.atchNo;
        let resAtchList = atchData.response.atchDetail;

        //첨부파일번호set
        setAtchNoVal(resAtchNo);

        if(_atchDetail){
            _setAtchDetail(_atchDetail.concat(resAtchList))
        }else{
            _setAtchDetail(resAtchList);   
        }
    }

    const DelFile = (condition) => {
    
        delAtch(condition).unwrap()
        .then(( response:any ) => {
            console.log('delAtch response =>', response)
            
            _setAtchDetail(_atchDetail.filter((t) => t.atchSrn !== condition.atchSrn))
        
        })
        .catch((error) => console.error('rejected', error))
        
    }

    return (
        <>
        <CldFileUpload name='files'
                           url={uploadUrl+`&inAtchNo=${atchNoVal}`}
                           onUpload={UploadAfter} 
                           multiple={false}
                           accept='*' 
                           maxFileSize={1000000}
                           maxFileCnt={1}
                           acceptFileType='png, jpg, hwp, ppt, pptx, doc, docx, txt, xls, xlsx'/>
            <div className='downloadFiles mt10'>
                <ul className='fileList'>
                    {
                        _atchDetail?.map((e, index) => (
                            <>
                            <li key={'atchs-'+index}>
                                <i className='pi pi-download mr5 downloadIco'></i><u>{e.atchNm}</u>
                                <span className='ml10'>{e.atchSizeVl}</span>
                                <Button type='button' icon='pi pi-times-circle' className='p-button-text deleteFileBtn' 
                                onClick={ () => DelFile({
                                    atchNo: e.atchNo,
                                    atchSrn:e.atchSrn,
                                })}/>
                            </li>
                            </>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default UploadFile;