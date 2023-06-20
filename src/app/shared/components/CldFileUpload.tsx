

import * as React from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { CommonUtils } from '../utils/commonUtils';
import { getEmpId, getToken, ssoLogin,} from '../../core/services/base/base-api.service';
import { confirmDialog, } from 'primereact';

interface FileUploadProps {
    url: string;            //첨부파일업로드 url :controller
    maxFileSize: number;    //첨부파일 최대크기
    maxFileCnt: number;    //첨부파일 개수
    acceptFileType: string;    //첨부파일 타입
    name?: string;
    onSelect?: any;
    onUpload?: any;
    onFileRemove?: any;
    onError?: any;
    onClear?: any;
    multiple?: boolean;
    accept?: string;
    totalSize?: number;
    onBeforeUpload?:any;
    onBeforeSelect?:any;
    atchDetail?:any[];
    setFileTempCnt?:any;
    className?:any;
}
/**
 * 각 페이지 CldFileUpload 호출 예시
let uploadUrl = commonCode.FILE_UPLOAD_URL+`?dir=gnrl&inAtchNo=${atchNoVal}`
    //dir : 파일업로드 경로(gnrl:일반, imln:이미지링크, chls:체크리스트, apfr:신청서)

<CldFileUpload name="files"             //수정x: BackEnd 첨부파일업로드 메소드 In파라미터명
                url={uploadUrl}         //수정o: 파일업로드url (dir,inAtchNo 수정필요)
                onUpload={UploadAfter}  //수정o: 파일업로드 후 callback method
                multiple={true}         //수정o: 다건파일업로드여부 (첨부파일 개수 1개만 가능일경우 꼭 false)
                accept="*"              //수정o: 파일선택 시스템창의 file Type( *,image/*,video/*,audio/* )
                maxFileSize={5000000}   //수정o: 파일 1건당 업로드 가능 바이트 
                maxFileCnt ={5}         //수정o: 파일 업로드 가능 개수 
                acceptFileType="png,jpg"//수정o: 파일 업로드 가능 확장자 seperator','로 추가 (ex: "png,jpg,jpeg,img")
                atchDetail={atchDetail} //수정o: 업로드된 파일 (파일개수체크에 필요)
                setFileTempCnt = {setFileTempCnt} //수정o: itemTemplate 에 들어있는 파일개수 == 아직업로드 되지 못한 파일
                                                            (2023.01.03 : 파일추가 버튼 클릭 동시에 서버업로드 되므로 , 항상 0 일 것임)
                />
 */                          
const CldFileUpload: React.FC<FileUploadProps> = ({name, url, onSelect, onBeforeUpload, onBeforeSelect, onUpload, 
    onFileRemove, onError, onClear, totalSize, multiple, accept, maxFileSize, maxFileCnt,acceptFileType,atchDetail,setFileTempCnt, className}) => {
    const fileUploadRef:any = React.useRef(null);

    const [totalSize1, setTotalSize] = React.useState(0);

    const [fileDisabled, setFileDisabled] = React.useState(false);

    const [cnt, setCnt] = React.useState(0);

    const [dslnFiles, setDslnFiles] = React.useState([]);

    React.useEffect(()=> {
        setFileTempCnt && setFileTempCnt(cnt)
    },[cnt]) 

    React.useEffect(()=> {
    //파일개수체크  
        
        let atchLen = atchDetail? atchDetail?.length : 0 ;

        let totCnt = cnt > 0 ? atchLen +cnt: atchLen +cnt+1

        if(totCnt > maxFileCnt){
            setFileDisabled(true);
        }else{
            setFileDisabled(false);
        }

    },[atchDetail]) 

    React.useEffect(()=> {
    //파일확장자체크 및 파일사이즈체크
        const files:any = fileUploadRef.current.getFiles();
        let isMaxSize:boolean = false;
        const arr:any = [];
        for(let i = 0 ; i <files.length ; i++){
            if(!chkMaxSize(files[i].size)){
                arr.push(i)
                isMaxSize = true;
            }else if(!chkExtension(files[i].name.split('.').pop().toLowerCase())){             
                arr.push(i)
            }
        }

        arr.sort(function(a,b){
            if( a > b) return -1;
            if( a === b) return 0;
            if( a < b) return 1;
        })
    
        arr?.map((t)=>{
            
            fileUploadRef.current.getFiles().splice(t,1)
        })
    
        arr && arr.length >0 && 
            (isMaxSize ? confirmDialog({
                    message: "파일 사이즈는 "+CommonUtils.byteCal(maxFileSize)+"를 초과할 수 없습니다.",
                    className: 'noHeader oneButton',
                    acceptLabel: '확인',
                    accept: () => {
                    },
                })
                : confirmDialog({
                    message: "파일은 "+acceptFileType+"만 첨부가 가능합니다.",
                    className: 'noHeader oneButton',
                    acceptLabel: '확인',
                    accept: () => {
                    },
                })
            )
    },[dslnFiles]) 
     
    React.useEffect(()=> {
        
        let atchLen = atchDetail? atchDetail?.length : 0 ;

        if(atchLen + fileUploadRef.current.getFiles().length > 5){
            fileUploadRef.current.clear()
            setCnt(0);
        }else{
            if(fileUploadRef.current.getFiles().length > 0 ){
    
                if(cnt == fileUploadRef.current.getFiles().length){
                    fileUploadRef.current.upload()
                }
            }
        }
    },[fileUploadRef.current])
    

    const chkExtension= (extension:any) => {
    //파일확장자체크
    
        if(CommonUtils.isDeepEqual(acceptFileType,'*')){
            return true; 
        }else{
            const arr = acceptFileType.split(',').map(item => { 
                return item.trim() //공백제거
            })
            
            //jpg ==> jpeg
            arr?.map((t)=>{
                if(t == 'jpg'){
                    arr.push('jpeg')
                }
            })

            return CommonUtils.isFindString(extension,arr);
        }
        
    }

    
    const chkMaxSize= (size:any) => {
    //파일사이즈체크
        if(Number(size) < Number(maxFileSize)){
            return true
        }else{
            return false
        }
        
    }
    
    const onTemplateSelct= (e:any ) => {
  
        //파일확장자체크
        const arr:any = [];
        for(let i = 0 ; i <e.files.length ; i++){
            if(!chkMaxSize(e.files[i].size) || !chkExtension(e.files[i].name.split('.').pop().toLowerCase())){
                arr.push(i)
            }
        }
        setDslnFiles(arr)


        let atchLen = atchDetail? atchDetail?.length : 0 ;
        let fileLen = e.files.length - arr.length ;
        if(atchLen + fileLen + cnt > maxFileCnt){

        confirmDialog({
            message: "파일은 "+maxFileCnt+"개만 첨부가 가능합니다.",
            className: 'noHeader oneButton',
            acceptLabel: '확인',
            accept: () => {
            setCnt(0);
            },
        })

        }else{  
            setCnt(cnt +fileLen);
        }
      

    }

    const onTemplateRemove = (file, callback) => {
        
        setTotalSize(totalSize1 - file.size);

        setCnt(cnt-1);

        callback();
    }

    const errorHandler = ( event:any ) => {

        if(onError !== undefined) {
            onError()
        }

        let result = JSON.parse(event.xhr.response);
        console.log('handleError', event)
        console.log('result', result)
        console.log('result => ', result?.success, result['success'], result["success"])
        //에러 발생
        
        if (result?.success === false) {

            let code = result?.error?.code
            let errorMsg = result?.error?.errorMsg

            //세션 만료시 /login api 를 호출하여 토큰을 다시 저장 
            if (code === 'AUE00001') {

                localStorage.clear()

                confirmDialog({
                    header: code, 
                    message: errorMsg,
                    className: 'oneButton',
                    acceptLabel: '확인',
                    accept: ()=> {
                        ssoLogin()
                    },
                })

            }
            //인증 토큰이 없을 때 SSO Logout 처리한다
            else if (code.slice(0,3) === 'AUE') {

                localStorage.clear()
                
                confirmDialog({
                    header: code, 
                    message: errorMsg,
                    className: 'oneButton',
                    acceptLabel: '확인',
                    accept: ()=> {
                        console.log('AUE ERROR ===> sso logout')
                        ssoLogin()
                    },
                })
            } 
            // 일반적인 에러
            else {
                confirmDialog({
                    header: code, 
                    message: errorMsg,
                    className: 'oneButton',
                    acceptLabel: '확인',
                    accept: ()=> {
                        // console.log('accept')
                    },
                })
            }
        }
        
    }

    const onBeforeSend = (event:any) => {
        const token = getToken();
        const empid = getEmpId();

        event.xhr.setRequestHeader('empid', empid ? empid: null)
        event.xhr.setRequestHeader('authorization', token ? token: null)
        setCnt(0);
    }

    const headerTemplate = (options:any) => {
        const { className, chooseButton, } = options;

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
            </div>
        );
    }

    const itemTemplate = (file:any, props:any) => {
        if(!chkMaxSize(file.size)){
            return;
        }
        if(!chkExtension(file.name.split('.').pop().toLowerCase())){
            return;
        }
        return (
            <div className="d-flex align-items-center flex-wrap fileUpload">
                <div className="d-flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} style={{maxWidth:200}} />
                    <span className="flex flex-column text-left ml20 mr20">
                        {file.name}
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                    <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const onClearFn = () =>{
        setCnt(0);
    }
    const emptyTemplate = () => {
        
        let maxsize:any = CommonUtils.byteCal(maxFileSize)
        
        return(   <div className="flex align-items-center text-center">
                <i className="pi pi-exclamation-triangle f30 mb5"></i>
                <div className='infoTxt f12'>
                    첨부하실 파일을 추가해주세요.<br/>
                    <div className='mt5'>
                    <p>* 파일은 {maxFileCnt && maxFileCnt == 1 ? maxFileCnt+'개만':maxFileCnt+'개까지'} 첨부가 가능합니다.({acceptFileType}만 가능)</p>
                    <p>* 파일 사이즈는 {maxsize}를 초과할 수 없습니다.</p>
                    </div>
                </div>
            </div>)
    }

    const chooseOptions = {icon: 'pi pi-fw pi-plus', iconOnly: false, label:'파일추가', className: 'custom-choose-btn p-button outline'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: false, label:'업로드', className: 'custom-upload-btn p-button outline'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: false, label:'파일삭제', className: 'custom-cancel-btn p-button outline'};

    return (
        <div>
            <FileUpload 
                ref={fileUploadRef} 
                className={className}
                name={name}
                url={url}
                multiple={multiple}
                accept={accept}
                //maxFileSize={maxFileSize}
                onUpload={onUpload} 
                onBeforeUpload={onBeforeUpload}
                onBeforeSelect={onBeforeSelect}
                onSelect={onTemplateSelct} 
                onError={errorHandler} 
                onClear={onClearFn}
                onBeforeSend={onBeforeSend}
                headerTemplate={headerTemplate} 
                itemTemplate={itemTemplate} 
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} 
                uploadOptions={uploadOptions} 
                cancelOptions={cancelOptions} 
                disabled={fileDisabled}
                />
        </div>
    )
}
export default CldFileUpload;



  