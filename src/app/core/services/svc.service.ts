import { Post, PostDetail } from '../models/svc'
import { Response } from '../models/response'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'svc'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        //목록 조회
        getSvcPosts: build.query<Response, Partial<Post>>({
            query: (body) => ({
                url: `${suffixPath}/page`,
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
        //상세 조회
        getSvcPostById: build.query<Response, Partial<PostDetail>>({
            query: (body) => ({
                url: `${suffixPath}/detail`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        getSvcMaxExpuSqc: build.query<Response, any>({
            query: (body) => ({
                url: `${suffixPath}/maxExpuSqc`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //노출순서 존재 여부 조회
        getSvcPostBySqc: build.mutation<Response, Partial<PostDetail>>({
            query: (body) => ({
                url: `${suffixPath}/isExistExpuSqc`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //등록
        addSvcPost: build.mutation<Response, Partial<Post>>({
            query: (body) => ({
                url: `${suffixPath}/save`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse
        }),
        //수정
        updateSvcPost: build.mutation<Response, Partial<Post>>({
            query: (body) => ({
                url: `${suffixPath}/save`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //삭제
        deleteSvcPost: build.mutation<Response, Partial<Post>>({
            query: (body) => ({
                url: `${suffixPath}/delete`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
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
    useGetSvcPostsQuery,       //목록 조회
    useGetSvcPostByIdQuery,    //상세 조회
    useGetSvcMaxExpuSqcQuery,
    useGetSvcPostBySqcMutation,
    useAddSvcPostMutation,     //등록
    useUpdateSvcPostMutation,  //수정
    useDeleteSvcPostMutation,  //삭제 
} = postApi

export const {
    endpoints: { getSvcPosts, getSvcPostById, getSvcMaxExpuSqc, getSvcPostBySqc, addSvcPost, updateSvcPost, deleteSvcPost },
} = postApi
