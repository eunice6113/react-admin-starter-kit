export interface Post {
    menuNo:string;          //메뉴번호
    menuNm:string;          //메뉴명
    cldPotlAthrDcd:string;  //권한구분코드
    useYn:string;           //사용여부
    menuLvlSqn:number;      //메뉴레벨순번
    menuSqc:string;         //메뉴순서(string-->number)
    hgrnMenuNo:string;      //상위메뉴번호
    uriPathNm:string;       //URI경로명
    menuDescCon:string;     //메뉴설명내용
}

export interface PostDetail {
    menuNo:string          //메뉴번호
}