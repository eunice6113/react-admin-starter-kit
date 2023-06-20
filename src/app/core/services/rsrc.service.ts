import { 
    RsrcCodeListInq, 
    RsrcCodeList
} from '../models/rsrc'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'rsrc'

export const rsrcApi = api.injectEndpoints({
    endpoints: (build) => ({
        //목록 조회
        getRsrcCodeList: build.query<RsrcCodeList, Partial<RsrcCodeListInq>>({
            query: (body) => ({
                url: `${suffixPath}/code-list`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        })
    }),
})

export const {
    useGetRsrcCodeListQuery
} = rsrcApi

export const {
    endpoints: { getRsrcCodeList },
} = rsrcApi
