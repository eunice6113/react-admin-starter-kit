export interface Response {
    error: boolean,
    success: boolean,
    response: any
}

export interface commonPagingResponse {
        pageSize: number,
        pageNo: number,
        ttalDataNbi: number,
        contents: Object[],
        totalPages: number,
        contentsNbi: number,
        pageGrpNoList: [],
}

export interface test {
    
}