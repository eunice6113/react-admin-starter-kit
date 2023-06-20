
// 시스템 코드 목록(요청)
export interface SysCodeListInq {
    assigned: boolean
    sysBsdsIdNm: string | null
    sysBswrDcd: string | null
    pageGrpInqYn: string
    pageGrpNbi: number
    pageNo: number
    pageSize: number
}

// 시스템 코드 목록(응답)
export interface SysCodeList {
    contents: {
        assigned: boolean
        sysBsdsIdNm: string | null
        sysBswrDcd: string | null
    }[]
    contentsNbi: number
    pageGrpNoList: number[]
    pageNo: number
    pageSize: number
    totalPages: number
    ttalDataNbi: number
}

// 시스템 코드 등록(요청)
export interface SysCodeSaveInq {
    sysBswrDcd: string
    sysBsdsIdNm: string
}

// 시스템 코드 삭제(요청)
export interface SysCodeDeleteInq {
    sysBswrDcd: string
    sysBsdsIdNm: string
}

// 시스템 코드 중복검사(요청)
export interface SysCodeIsDuplicatedInq {
    sysBswrDcd: string
    sysBsdsIdNm: string
}

// 시스템 코드 중복검사(응답)
export type SysCodeIsDuplicated = boolean

// 시스템 코드 입력 slice
export interface SyscdInput {
    sysBswrDcd: string
    sysBsdsIdNm: string
    sysBswrDcdInput: string
    sysBsdsIdNmInput: string
    sysBswrDcdError: string
    sysBsdsIdNmError: string
}