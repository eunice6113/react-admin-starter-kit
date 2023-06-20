import { RsrcAsgmInq, RsrcAsam, RsrcAsamSaveInq, RsrcAsamSave } from '../models/rsq'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'rsrcAsgm'

export const rsrcAsgmApi = api.injectEndpoints({
    endpoints: (build) => ({
        //목록 조회
        getRsrcAsgm: build.query<RsrcAsam, Partial<RsrcAsgmInq>>({
            query: (body) => ({
                url: `${suffixPath}`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        saveRsrcAsgm:  build.mutation<RsrcAsamSave, Partial<RsrcAsamSaveInq>>({
            query: (body) => ({
                url: `${suffixPath}/save`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
    }),
})

export const {
    useLazyGetRsrcAsgmQuery,       //목록 조회
    useSaveRsrcAsgmMutation
} = rsrcAsgmApi

export const {
    endpoints: { getRsrcAsgm, saveRsrcAsgm },
} = rsrcAsgmApi
