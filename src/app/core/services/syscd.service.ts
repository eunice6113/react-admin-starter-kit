import { 
    SysCodeListInq,
    SysCodeList,
    SysCodeSaveInq,
    SysCodeDeleteInq,
    SysCodeIsDuplicatedInq,
    SysCodeIsDuplicated
} from '../models/syscd'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'syscd'

export const sysCdApi = api.injectEndpoints({
    endpoints: (build) => ({
        //목록 조회
        getSysCdList: build.query<SysCodeList, Partial<SysCodeListInq>>({
            query: (body) => ({
                url: `${suffixPath}/list`,
                method: 'POST',
                body,
            }),
            providesTags: ['Posts'],
            transformResponse: CommonResponse,
        }),
        saveSysCd:  build.mutation<SysCodeList, Partial<SysCodeSaveInq>>({
            query: (body) => ({
                url: `${suffixPath}/save`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        deleteSysCd: build.mutation<SysCodeList, Partial<SysCodeDeleteInq>>({
            query: (body) => ({
                url: `${suffixPath}/delete`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        isDuplicatedSysCd: build.query<SysCodeIsDuplicated, Partial<SysCodeIsDuplicatedInq>>({
            query: (body) => ({
                url: `${suffixPath}/is-duplicated`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
    }),
})

export const {
    useLazyGetSysCdListQuery,     //목록 조회
    useSaveSysCdMutation,
    useDeleteSysCdMutation,
    useLazyIsDuplicatedSysCdQuery
} = sysCdApi

export const {
    endpoints: { getSysCdList, saveSysCd, deleteSysCd, isDuplicatedSysCd },
} = sysCdApi
