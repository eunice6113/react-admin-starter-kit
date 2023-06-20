export interface RsrcCodeListInq {
    cmcdId?: string
}

export type RsrcCodeList = {
    cmcdId: string,
    comCdNm: string,
    cmcdEnsnNm?: string | null,
    cmcdRcn?: string | null,
    sysLsmdId?: any ,
    sysLsmdTs?: any
}[]