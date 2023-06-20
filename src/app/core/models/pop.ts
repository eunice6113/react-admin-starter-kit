export interface PuppList {
    ppupNo:string;
    cldPotlPpupDcd:string;
    atchNo:string;
    ppupFnshTs:string; //제목
    ppupMsgCon:string;
    ppupSttgTs:string;
    ppupTtlNm:string; //작성자
    uriPathNm:string;
    useYn:string; //내용
    wrtnEmn:string; //내용
    wrtnTs:string; //내용
    
    pageSize:number,
    pageNo:number,
    cldPotlBlbrDcd:string,
    cldPotlBlbrTcd:string,
    inqDcd1:string,
    srwdCon:string,
    inqDcd2:string,
    insgYmd:string,
    inqFnshYmd:string
}

export interface PuppDtl {
    ppupNo:string
}

export interface PuppSav {
    ppupNo:string,
    cldPotlPpupDcd:string,
    ppupTtlNm:string,
    useYn:string,
    ppupSttgTs:Date,
    ppupFnshTs:Date,
    wrtnEmn:string,
    wrtnTs:Date,
    uriPathNm:string,
    atchNo:number,
    ppupMsgCon :string,
}

export interface Ppup {
    ppupNo:string;
    cldPotlPpupDcd:string;
    atchNo:string;
    ppupFnshTs:string; //제목
    ppupMsgCon:string;
    ppupSttgTs:string;
    ppupTtlNm:string; //작성자
    uriPathNm:string;
    useYn:string; //내용
    wrtnEmn:string; //내용
    wrtnTs:string; //내용
    atchDetailOutVo?: Array<{ atchNo:string; atchSrn:string; atchNm:string; }>;
    files?: Array<{ name:string; size:string; }>;
}