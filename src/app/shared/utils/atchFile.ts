import { getHeaders } from "./fileDownloadHeader";

export class AtchFileService {

    public delFile(condition:any):any {
        console.log("condition:"+condition);
    } 

    public downFile = (condition: any):any => {
        console.log('condition', condition)
      
        const url="http://10.104.51.49/exam_file/download"
        
        fetch(url,{
            method : 'POST',
            body: JSON.stringify(condition),
            // headers: {'Content-Type':'application/json'}
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


      
    public downAllFile = (condition) => {
    console.log('condition', condition)
  
    const url="http://10.104.51.49/exam_file/downloadAll"
    
    fetch(url,{
        method : 'POST',
        body: JSON.stringify(condition),
        // headers: {'Content-Type':'application/json'}
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
}

