
//일반적인 응답
export const CommonResponse = (response:any, meta:any) => {

    console.log('CommonResponse =>', response, 'meta', meta)
    
    if(response.success) {
        return response.response
    }
}
