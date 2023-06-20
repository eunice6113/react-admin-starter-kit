export interface Post {
    blbrOtptNo:string;      //게시판출력번호
    cldPotlBlbrDcd:string;   //게시판구분코드
    cldPotlBlbrTcd:string;   //게시판유형코드
    cldPotlBlbrTcdNm?:string; //게시판유형코드명
    blbrTtlNm:string;        //게시판제목명
    atchNo?:any;           //첨부파일번호
    blbrHgrnNo?:string;      //게시판상위번호
    wrtnEmn?:string;          //작성직원명
    blbrInqNbi?:number;      //게시판조회건수
    blbrCon:string;          //게시판내용
    blbrCretTs:string;       //게시판등록일시
    rgsnYmd:string;          //등록년월일
    atchDetail?: Array<{ atchNo:string; atchSrn:string; atchNm:string; atchSizeVl:string;}>
    cldPotlAddif?: Array<{ blbrOtptNo :string; cldPotlAddifTcd:string; addifCon:any; }>
    order?:number;
    fileTempCnt?:any;
}

export interface PostDetail {
    blbrOtptNo:string
}

// 검색조건 
export interface NtcSearchParam {
    pageSize?: number,
    pageNo?: number,
    pageGrpInqYn?: string,
    pageGrpNbi?: number ,

    cldPotlBlbrDcd?:string,    //구분코드
    cldPotlBlbrTcd?:string,    //유형코드
    srwd?:string,      //전체
    blbrTtlNm?:string, //제목
    blbrCon?:string,   //내용
    emm?:string,    //등록자명
    dummy?:string,
    fromDate?: string,   //시작일자
    toDate?: string,   //종료일자
    pbntYn?:string,                //공지여부

    optionVal?:string,
    rows?:number, //페이지당 게시물 노출 건수
    first?:number
}