import * as commonCode from '../../shared/config/commonCode';
import { getHeaders } from './fileDownloadHeader';

const downAllFile = (condition) => {
  console.log('condition', condition)

  const url=commonCode.FILE_ALL_DOWNLOAD_URL;
  
  fetch(url,{
      method : 'POST',
      body: JSON.stringify(condition),
    //   headers: {'Content-Type':'application/json'}
      headers: getHeaders()
  })
  .then((res) => {
      return res.blob();
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
  }).catch((error) => console.error('rejected', error))

}

export default downAllFile;