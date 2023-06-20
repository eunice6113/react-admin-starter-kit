export interface Post {
    cmnyNo?:string;         //커뮤니티번호
    cldPotlCmnyDcd:string;  //커뮤니티구분
    cldPotlCmnyDsnm:string;
    ttlNm:string;           //제목
    bltCon?:string;         //내용
    wrtnEmn:string;         //작성자
    wrtnEmm:string;
    brm:string;
    wrtnTs:string;          //작성일시
    inqCnt?:string;         //조회수
    invvNbt:string;         //업보트
    rpcmDetail?: Array<{ rpcmNo:string; efttEvntNo:string; rpcmCon:string; wrtnEmn:string; wrtnEmm:string; wrtnTs:string;}>
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
    cmnyNo:string
}