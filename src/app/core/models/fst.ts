export interface Post {
    aplcNo : string;     
    bsnsNm: string;
    cldPotlAplcPtnm: string;
    dvm: string;        
    rqstEmm : string;
    rqstEmn : string;
    emm : string;
    emn : string;
    snctRqstTs : string;
    snctPgrsScd : string;
    snctPgrsStnm : string;
    cldPotlAplcTcd: string;
    atchNo:string;              //첨부파일번호
    atchDetail?: Array<{ atchNo:string; atchSrn:string; atchNm:string; atchSizeVl:string;}>
}

export interface PostDetail {
    aplcNo:string
}