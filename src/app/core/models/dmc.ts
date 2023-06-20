export interface RsrcBilgCdInq {
    demandTypeCode: string
    resourceType: string
    notAssigned: boolean
    pageGrpInqYn?: string
    pageGrpNbi?: number
    pageNo?: number
    pageSize?: number
    srwd?: number | null
}

export interface RsrcBilgCd {
    contents: {
        demandTypeCode: string | null
        demandTypeCodename: string | null
        nvrBilgDsncVl: string | null
        nvrPrdsVl: string | null
        nvrRsrcDsncVl: string | null
        productDisplayName: string | null
        productName: string | null
        resourceType: string | null
    }[]
    pageGrpNoList: number[]
    pageNo: number
    pageSize: number
    totalPages: number
    ttalDataNbi: number
}

export interface NotAssignedResourceInq {
    demandTypeCode: string
    resourceType: string
    isNotAssigned: boolean
    pageGrpInqYn?: string
    pageGrpNbi?: number
    pageNo?: number
    pageSize?: number
    srwd?: number | null
}

export interface NotAssignedResource {
    contents: {
        demandTypeCode: string | null
        demandTypeCodename: string | null
        nvrBilgDsncVl: string | null
        nvrPrdsVl: string | null
        nvrRsrcDsncVl: string | null
        productDisplayName: string | null
        productName: string | null
        resourceType: string | null
    }[]
    pageGrpNoList: number[]
    pageNo: number
    pageSize: number
    totalPages: number
    ttalDataNbi: number
}

export interface RsrcBilgCdSaveInq {
    nvrBilgDsncVl: string
    nvrRsrcDsncVl: string
    nvrPrdsVl: string
}

export interface RsrcBilgCdSave {

}

export type RsrcBilgCdDeleteInq = {
    nvrBilgDsncVl: string
    nvrRsrcDsncVl: string
    nvrPrdsVl: string
}[]

export interface RsrcBilgCdDelete {

}