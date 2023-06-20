import { 
    RsrcBilgCdInq, 
    RsrcBilgCd,
    NotAssignedResourceInq,
    NotAssignedResource,
    RsrcBilgCdSaveInq,
    RsrcBilgCdSave,
    RsrcBilgCdDeleteInq,
    RsrcBilgCdDelete
} from '../models/dmc'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'rsrcBilgCd'

export const rsrcBilgCdApi = api.injectEndpoints({
    endpoints: (build) => ({
        //목록 조회
        getRsrcBilgCd: build.query<RsrcBilgCd, Partial<RsrcBilgCdInq>>({
            query: (body) => ({
                url: `${suffixPath}`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        getNotAssignedResource: build.query<NotAssignedResource, Partial<NotAssignedResourceInq>>({
            query: (body) => ({
                url: `${suffixPath}/not-assigned-resource`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        saveRsrcAsgm:  build.mutation<RsrcBilgCdSave, Partial<RsrcBilgCdSaveInq>>({
            query: (body) => ({
                url: `${suffixPath}/save`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        deleteRsrcAsgm:  build.mutation<RsrcBilgCdDelete, Partial<RsrcBilgCdDeleteInq>>({
            query: (body) => ({
                url: `${suffixPath}/delete`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
    }),
})

export const {
    useLazyGetRsrcBilgCdQuery,     //목록 조회
    useGetNotAssignedResourceQuery,
    useSaveRsrcAsgmMutation,
    useDeleteRsrcAsgmMutation
} = rsrcBilgCdApi

export const {
    endpoints: { getRsrcBilgCd, getNotAssignedResource, saveRsrcAsgm, deleteRsrcAsgm },
} = rsrcBilgCdApi
