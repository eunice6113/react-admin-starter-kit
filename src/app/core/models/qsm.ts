export interface Post {
    pageSize?: number,
    pageNo?: number,
    pageGrpInqYn?: string,
    pageGrpNbi?: number,

    srwd?:string,      //전체
    blbrTtlNm?:string, //제목
    emm?:string,    //등록자명
    srwdDummy?:string,

    dySrchDcd?:string,   //일자검색구분
    fromDate?: string,   //시작일자
    toDate?: string,   //종료일자

    expuYn?:string, //노출여부 Y내부 N외부
    cldPotlPgrsScd?:string, //진행상태코드
}
