export interface Code {
    code?: string;
    codeName?: string;
}

export type DetailcodeListPost = {
    cmcdId:string,
    cmcdVl:string,
    cmcdVlNm:string,
    cmcdVlDescCon:string,
    cmcdRpsnSqc:number,
    sysLsmdId:string,
   
}

export type CodeListPost = {
    cmcdId:string,
    comCdNm:string,
    cmcdEnsnNm:string,
    cmcdVlDescCon:string,
    cmcdRcn:number,
}