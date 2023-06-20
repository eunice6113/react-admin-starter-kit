export interface Post {
    blbrOtptNo?:string;
    cldPotlBlbrDcd:string;
    cldPotlBlbrTcd:string;
    blbrTtlNm:string; //제목
    atchNo:string;
    blbrHgrnNo?:string;
    wrtnEmn:string; //작성자
    blbrInqNbi?:number;
    blbrCon:string; //내용
    atchDetail?: Array<{ atchNo:string; atchSrn:string; atchNm:string; }>
}

export interface PostDetail {
    blbrOtptNo:string
}