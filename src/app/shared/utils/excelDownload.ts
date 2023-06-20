import * as commonCode from '../config/commonCode';
import { getHeaders } from './fileDownloadHeader';

const downloadFile = (condition) => {


  //arrHeader

    const url = commonCode.REACT_APP_API_URL + '/' + condition.suffixPath + '/download';

    fetch(url,{
        method : 'POST',
        body: JSON.stringify(condition),
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

export default downloadFile;