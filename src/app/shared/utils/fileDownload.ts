import * as commonCode from '../../shared/config/commonCode';
import { getHeaders } from './fileDownloadHeader';

const downloadFile = (condition) => {
  console.log('condition', condition)

  const url=commonCode.FILE_DOWNLOAD_URL;
  
  fetch(url,{
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
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = condition.atchNm;
    document.body.appendChild(a);
    a.click();
    setTimeout((_) => {
        window.URL.revokeObjectURL(url);
    },60000);
    a.remove();

  }).catch((error) =>{

    error.text().then(msg =>  
      console.log('msg:',msg)
    )
   
  })

}

export default downloadFile;