export interface Post {
    hgrnGrpNo: string;
    aplcNo : string;        
    rqstEmm : string;
    rqstEmn : string;
    ead : string;
    ttlNm: string;
    snctRqstTs : string;
    snctPgrsScd : string;
    snctPgrsStnm : string;
    cldPotlAplcTcd: string;
    cldPotlCtgyDcd: string;
    srwd: string;
    srba: string;
}

export interface PostDetail {
    aplcNo:string
    hgrnGrpNo:string
}