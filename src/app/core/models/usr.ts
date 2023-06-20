export interface Post {
    emn?:string;       //직원번호
    emm:string;        //직원명
    empEnsnNm:string;  //직원영문명
    ead:string;        //이메일주소
    blngBrm:string;    //소속부점명
    blngBrcd:string;    //소속부점코드

    srEmn:string;
    srEmm:string;    
}

export interface PostDetail {
    emn:string
}