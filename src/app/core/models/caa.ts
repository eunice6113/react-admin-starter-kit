export interface CaaList {
    aplcNo:string;            //신청번호
    cldPotlAplcTcd:string;    //신청유형코드
    snctMngmNo:string;        //결재관리번호
    snctScd:string;           //결재상태코드
    wrtnEmn:string;           //작성직원번호
    wrtnTs:string;            //작성일시
    sysLsmdId:string;         //시스템최종변경ID
    sysLsmdTs:string;         //시스템최종변경일시

    emm:string;               //직원명
    empEnsnNm:string;         //직원영문명
    ead:string;               //이메일주소

    cctnAthrAplcTcd:string;   //접속권한신청유형코드
    cctnAthrAplcTcdNm:string; //접속권한신청유형코드명
    pwd:string;               //비밀번호

    srwd:string;              //검색어
    srEmm:string;             //검색_직원명
    srEmn:string;             //검색_직원번호
    srCctnAthrAplcTcd:string; //검색_신청구분
}

export interface CaaPage {
    pageSize:number,
    pageNo:number,
    cldPotlAplcTcd:string,    //신청유형코드
}