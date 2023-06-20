//설문 > 척도형
export interface QMeasure {
    from: any;
    to: any;
    fromLabel: string;
    toLabel: string;
}

//설문 > 설문기간
export interface Qdaterange {
    fromDate: Date;
    toDate: Date;
}

//설문 > 라디오, 체크박스 타입
export interface Qoption {
    name:string;
    key:any;
}

export interface Atch {
     atchNo?:string;
     atchSrn?:string; 
     atchNm?:string; 
     atchSizeVl?:string;
}


//설문 > 문항 타입
export interface Question {
    qstrQsitSqn: any; //설문문항순번
    qstrQsitCon: string; //질문 입력 인풋
    requiredToggle: boolean; //필수 여부 토글 
    mndrYn : string; //필수 여부
    cldPotlQstrQsitDcd: string; //질문유형 선택
    qsitDtl?: Array<{ qstrNo?:string; qstrQsitSqn?:string; qstrQsitDtlsItmSqn?:string; qstrCon?:string;}>;
    atchNo?:string;
    atchDetail?:Atch[];
    fileTempCnt?:any;
    //객관식 질문 - 단수형, 복수형 선택시
    selectedRadio?: Qoption; //선택한 것 - 등록시는 비어도 됨. 라디오는 1개만, 체크는 여러개 key 를 가질 수 있다
    selectedCheck?: Qoption[]; //선택한 것 - 등록시는 비어도 됨. 라디오는 1개만, 체크는 여러개 key 를 가질 수 있다
    options?: Qoption[];
    //날짜형
    date?: Date;
    //척도형
    measure?: QMeasure;
}

//설문 전체
export interface Survey {
    qstrNo?:string; //설문번호
    qsinTtlNm: string; //설문조사제목명
    expuYn: string; //노출구분
    valdSttgTs: Date;   //유효시작일시
    valdFnshTs: Date;   //유효종료일시
    sttgYmd?: string;   //유효시작일시
    fnshYmd?: string;   //유효종료일시
    qstrCon: string; //설문 내용
    qstrPrlgCon: string; //설문머리말내용
    qsit?: Question[]
}



//설문 결과
//설문 전체
export interface SurveyResult {
    title: string; //설문 제목
    type: Qoption; //노출구분 라디오
    daterange: Qdaterange; //설문기간
    sttgYmd?: any;   //유효시작일시
    fnshYmd?: any;   //유효종료일시
    rspdCnt?:string; //응답수
    answersit?: Answer[]
}

export interface Answer {
    question?: string; //질문
    type?: string; //질문유형 
    rspdCnt?:string;
    answers?: any[]; //정답
}