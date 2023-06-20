import * as React from "react";
import { getHeaders } from '../../../shared/utils/fileDownloadHeader';
import * as commonCode from '../../../shared/config/commonCode';
import listImg from '../../../../assets/images/manual-img.png';
import { CommonUtils } from "../../../shared/utils/commonUtils";

interface IProps {
    path?:any;
    no:any;
    srn:any;
    nm?:any;
    alt?:any;
}

export const GetImg: React.FC<IProps> = ({path,no,srn,nm,alt}) => {

    const [imgUrl, setImgUrl] = React.useState('')

    let condition = {
        atchFilePath : path,
        atchNo : no,
        atchSrn : srn,
        atchNm : nm,
    };

    React.useEffect(() => {
        const fileUrl=commonCode.FILE_DOWNLOAD_URL;

        /**
         *  첨부파일번호가 있는 경우에만 파일 이미지 조회
         */
        if(!CommonUtils.isEmpty(condition.atchNo) && condition.atchNo !== 0) {
            fetch(fileUrl,{
                method : 'POST',
                body: JSON.stringify(condition),
                headers: getHeaders()
            })
            .then((res) => {
                if(res.ok){
                    return res.blob();
                }
                if(!res.ok){
                    throw res
                }
            })
            .then((blob) =>{
                
                let url = '';
                
                /**
                 *  등록된 이미지가 있으나 사이즈가 0인 경우 -> File Not Found
                 *  -> 기본이미지 세팅
                 */
                if((blob.size == 0
                        && !CommonUtils.isEmpty(condition.atchNo) )) {
                    url = listImg
                }
                else if(blob.size > 0 && !CommonUtils.isEmpty(condition.atchNo) ) {
                    url = window.URL.createObjectURL(blob);
                }
                
                setImgUrl(url)

            })
            .catch((error) => 
                error.text().then(msg =>  
                    setImgUrl(listImg)
                )
            )
        }

    }, [no]);
    
       //최종이미지
       const loadedImgUrl = React.useMemo(() => imgUrl, [imgUrl])
    
    return(
        <>
            {
                CommonUtils.isEmpty(loadedImgUrl) ? '' : <img src={loadedImgUrl} alt={alt}/> 
            }
        </>
    )
}
