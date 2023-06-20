export interface RsrcAsgmInq {
    arrQty?: number | null
    cdSrn?: number | null
    cldPotlQutaRsrcDcd?: string | null
    cldPotlQutaRsrcDcdNm?: string | null
    rltdSysNm?: string | null
}

export type RsrcAsam = any

export type RsrcAsamSaveInq = {
    arrQty: number
    cdSrn: number
    cldPotlQutaRsrcDcd: string
    cldPotlQutaRsrcDcdNm?: string
    rltdSysNm?: string
}[]

export type RsrcAsamSave = any