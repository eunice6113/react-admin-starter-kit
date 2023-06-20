export type IComment = {
    id: number | string;
    mode?: any;          
    editable?: boolean;     //수정 아이콘 버튼
    deletable?: boolean;    //삭제 아이콘(휴지통) 버튼
    showProfile?: boolean;  //프로필 보여줄지 여부
    userName?: string;      //사용자 이름
    date: string;           //날짜
    originValue?: string;
    value?: string;         //댓글 내용
    setValue?: any;         //댓글 내용 업데이트
    edit?: Function;        //수정
    delt?: any;             //삭제
    register?: any;         //등록
    cancel?: any;           //취소
    isMine?: boolean;       //내가 쓴 댓글인지 여부
}