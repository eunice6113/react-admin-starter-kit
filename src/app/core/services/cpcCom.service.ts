import { Response } from '../models/response'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'cpc/com'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({ 
        //목록 조회
        getCpcComBswrPosts: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/bswrPage`,
                method: 'POST',
                body,
            }),
            providesTags: ( result ) => [
            //   ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts' as const, id: 'LIST' },
            ],
            transformResponse: CommonResponse,
            // `result` is the server response
            // invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
            onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
            // handle subscriptions etc
            onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
        }),
        //목록 조회
        getCpcComBwsPosts: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/bwsPage`,
                method: 'POST',
                body,
            }),
            providesTags: ( result ) => [
            //   ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts' as const, id: 'LIST' },
            ],
            transformResponse: CommonResponse,
            // `result` is the server response
            // invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
            onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
            // handle subscriptions etc
            onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
        }),
        getCpcComAlplPosts: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/alplPage`,
                method: 'POST',
                body,
            }),
            providesTags: ( result ) => [
            //   ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts' as const, id: 'LIST' },
            ],
            transformResponse: CommonResponse,
            // `result` is the server response
            // invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
            onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
            // handle subscriptions etc
            onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
        }),
        getCpcComEmpPosts: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/empPage`,
                method: 'POST',
                body,
            }),
            providesTags: ( result ) => [
            //   ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts' as const, id: 'LIST' },
            ],
            transformResponse: CommonResponse,
            // `result` is the server response
            // invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
            onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
            // handle subscriptions etc
            onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
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
    useGetCpcComBswrPostsQuery,    //업무시스템 페이지 조회
    useGetCpcComBwsPostsQuery,     //업무시스템 코드 조회
    useGetCpcComAlplPostsQuery,    //제휴처 페이지 조회
    useGetCpcComEmpPostsQuery,     //직원정보 페이지 조회

} = postApi

export const {
    endpoints: { getCpcComBswrPosts, getCpcComBwsPosts, getCpcComAlplPosts, getCpcComEmpPosts, },
} = postApi
