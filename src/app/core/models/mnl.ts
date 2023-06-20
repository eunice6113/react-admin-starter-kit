export interface Post {
    dcmnMngmNo?:string;         //문서관리번호
    cldPotlExpuPageDcd:string;  //노출페이지구분
    cldPotlPtngTcd:string;      //노출페이지유형
    cldPotlCtgyDcd:string;      //카테고리
    vrsnVl: string;              //버전
    pdfPrc: string;              //상품가격
    dscnRt: string;              //할인률
    ttlNm:string;               //매뉴얼명
    expuSqc?:string;            //노출순서
    wrtnEmn:string;             //작성자
    wrtnTs:string;
    uriPathNm?:string;          //url경로
    phrsCon:string;             //문구내용
    atchNo:string;              //첨부파일번호
    srba:string;
    srwd:string;
    atchDetail?: Array<{ atchNo:string; atchSrn:string; atchNm:string; atchSizeVl:string;}>;
    fileTempCnt: number;
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
    sort?:string;
    fromDate?: Date;   //시작일자
    toDate?: Date;   //종료일자
}

export interface PostDetail {
    dcmnMngmNo:string
}