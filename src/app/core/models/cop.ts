export interface Post {
    entpSrn: string;
    bzn: string;            //사업자등록번호
    alplNm:  string;        //제휴처명
    rsprNm:  string;        //담당자명
    rsprCnplNo: string;      //담당자연락처
    rsprEad: string;         //담당자이메일
    rpprNm:string;          //대표자명
    rpprTpn:string;         //대표자전화번호
    wrtnEmn:string;
    wrtnEmm:string;
    wrtnTs:string;

    srba:string;
    srwd:string;
}

export interface PostPage {
    pageSize: number;
    pageNo: number;
    pageGrpInqYn : string;
    pageGrpNbi : number;

    cldPotlExpuPageDcd?:string;    //노출구분
    cldPotlPtngTcd?:string;    //전시구분
    cldPotlCtgyDcd?:string;     //카테고리구분
    srwd?:string;      //검색어
    srba?:string;      //검색기준
    fromDate?: Date;   //시작일자
    toDate?: Date;   //종료일자
}

export interface PostDetail {
    entpSrn:string
}