/* Common CODE */

/* admin, user 동기화 필수!! */

export const METHOD = {
    GET : 'GET',
    DELETE : 'DELETE',
    POST : 'POST',
    PUT : 'PUT'
};

export const MODE = {
    VIEW: 'view',
    EDIT: 'edit',
    REGISTER: 'register',
}

export const AUTHORITIES = {
    ADMIN : 'ROLE_ADMIN',
    USER : 'ROLE_USER',
    SYSTEM : 'ROLE_SYSTEM'
}

export const USER_ROLE = {
    ROLE_ADMIN : '관리자',
    ROLE_USER : '일반사용자',
    ROLE_SYSTEM : '시스템 관리자'
}

//게시판구분코드
export const BLBR_DCD = [
    { value: '10', name: '공지사항' },
    { value: '20', name: 'FAQ' },
    { value: '30', name: '건의및개선' },
]

//게시판유형코드
export const BLBR_TCD = [
    { value: '1001', name: '공지' },
    { value: '2001', name: '클라우드' },
    { value: '2002', name: '클라우드포탈' },
    { value: '2003', name: '매뉴얼' },
    { value: '2099', name: '기타FAQ' },
    { value: '3001', name: '질문' },
    { value: '3002', name: '답변' },
]

//파일 호출URL
export const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export const FILE_UPLOAD_URL = process.env.REACT_APP_FILE_UPLOAD_URL
export const FILE_DOWNLOAD_URL = process.env.REACT_APP_FILE_DOWNLOAD_URL
export const FILE_ALL_DOWNLOAD_URL = process.env.REACT_APP_FILE_ALL_DOWNLOAD_URL

//경로 
export const REACT_APP_USER_URL = process.env.REACT_APP_USER_URL
export const REACT_APP_SURVEY_URL = process.env.REACT_APP_SURVEY_URL


//게시판구분코드	BLBR_DCD
export const BLBR_DCD_NTC = '10'   //공지사항
export const BLBR_DCD_FAQ = '20'   //FAQ(자주묻는질문)
export const BLBR_DCD_QNA = '30'   //건의및개선

//게시판유형코드	BLBR_TCD
export const BLBR_TCD_QSTN = '3001'  //질문
export const BLBR_TCD_RPLY = '3002'  //답변

//부가정보유형코드	ADDIF_TCD
export const ADDIF_TCD_IMPN_PBNT_YN = '10001'  //중요공지여부
export const ADDIF_TCD_EXPU_SQC = '20001'      //노출순서

//설문문항구분코드	QSTR_QSIT_DCD
export const QSTR_QSIT_DCD_01 = '01'   //단답형
export const QSTR_QSIT_DCD_02 = '02'   //장문형
export const QSTR_QSIT_DCD_03 = '03'   //객관식질문(단수)
export const QSTR_QSIT_DCD_04 = '04'   //객관식질문(복수)
export const QSTR_QSIT_DCD_05 = '05'   //척도선택
export const QSTR_QSIT_DCD_06 = '06'   //날짜

//진행상태코드	PGRS_SCD
export const PGRS_SCD_5001 = '5001'   //이벤트진행중
export const PGRS_SCD_5010 = '5010'   //이벤트종료
export const PGRS_SCD_5020 = '5020'   //이벤트당첨발표
export const PGRS_SCD_6001 = '6001'   //설문조사진행중
export const PGRS_SCD_6010 = '6010'   //설문조사종료

//신청유형코드    APLC_TCD
export const APLC_TCD_CAT = "1000";  //서비스카탈로그신청
export const APLC_TCD_FST = "2000";  //TheFastCloud신청
export const APLC_TCD_CAA = "3000";  //접근권한신청

//권한구분코드    ATHR_DCD
export const ATHR_DCD_ADM = "01";  //관리자
export const ATHR_DCD_USR = "10";  //사용자

//MAX_LENGTH
export const MAX_LEN_2:number = 2
export const MAX_LEN_3:number = 3
export const MAX_LEN_15:number = 15
export const MAX_LEN_25:number = 25
export const MAX_LEN_30:number = 30
export const MAX_LEN_50:number = 50
export const MAX_LEN_100:number = 100
export const MAX_LEN_200:number = 200
export const MAX_LEN_500:number = 500
export const MAX_LEN_1000:number = 1000
export const MAX_LEN_2000:number = 2000