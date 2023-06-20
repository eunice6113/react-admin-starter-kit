
import { Response } from '../models/response'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'snctPcsn'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({
         //목록 조회(결재요청)
        getSnctPosts: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/inqRqst`, 
                method: 'POST',
                body, 
            }),
            transformResponse: CommonResponse,
        }),
        /**
         *  결재내역 목록에서 사용하는 API
         */
        //결재함 리스트(결재내역 목록)
        getSnctListPosts: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/inqSnctPage`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
            // `result` is the server response
            // invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
            onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
            // handle subscriptions etc
            onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
        }),
        //상세 조회
        getSnctPostById: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/inqDetail`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),    
        //결재승인
        pcsnSnctAthzPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/athz`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //결재반려
        pcsnSnctRtrcPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/rtrc`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //결재일괄승인
        pcsnSnctLmsmAthzPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/lmsmAthz`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //결재일괄반려
        pcsnSnctLmsmRtrcPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/lmsmRtrc`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //등록
        addSnctPost: build.mutation<Response, any>({
            query: (body) => ({
                url: `${suffixPath}/rqst`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse
        }),
        

    }),
})

/*
[export 명 규칙]

    HTTP 와 완전히 연동되는 것은 아님 (예를 들어 데이터 조회시 POST 를 쓴다 해도 use***Query 라고 하면 됨)
    데이터를 조회하는 경우 use + 함수명(맨 앞글자 -> 대문자) + Query
    데이터를 변화시키는 경우 (등록, 수정, 삭제) use + 함수명(맨 앞글자 -> 대문자) + Mutation

    *mutation: 참조된 데이터가 변경되는 것
*/
export const {
    useGetSnctPostsMutation,       //목록 조회
    useGetSnctListPostsQuery, //결재함 리스트
    useGetSnctPostByIdQuery,    //상세 조회
    usePcsnSnctAthzPostMutation, //결재 승인
    usePcsnSnctRtrcPostMutation, //결재 반려
    usePcsnSnctLmsmAthzPostMutation, //결재 일괄승인
    usePcsnSnctLmsmRtrcPostMutation, //결재 일괄반려
    useAddSnctPostMutation,
} = postApi

export const {
    endpoints: {getSnctPosts, getSnctListPosts, getSnctPostById, pcsnSnctAthzPost, pcsnSnctRtrcPost, pcsnSnctLmsmAthzPost, pcsnSnctLmsmRtrcPost, addSnctPost,  },
} = postApi
