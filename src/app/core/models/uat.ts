export interface Post {
    becd:string;        //소속코드
    blngNm:string;      //소속명
    lvlSqn:string;      //메뉴순번
    hgrnBecd:string;    //상위소속코드
    hgrnBecd1:string;   //상위소속코드1
    hgrnBecd2:string;   //상위소속코드2    
    emn:string;         //직원번호
    emm:string;         //직원명
    ogznKey:string;     //조직key

    srwd:string;        //검색어
    athrSrn:string;     //권한일련번호
    athrTcd:string;     //권한유형코드
    cldPotlAthrDcd:string;     //권한구분코드

    grpAthrSrn:string;  //그룹_권한일련번호
    grpAthrDcd:string;  //그룹_권한구분코드
    usrAthrSrn:string;  //사용자_권한일련번호
    usrAthrDcd:string;  //사용자_권한구분코드
}