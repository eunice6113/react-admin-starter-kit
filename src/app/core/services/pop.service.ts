import { Ppup } from '../models/pop'
import { Response } from '../models/response'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'pop'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        //목록 조회
        getPopPosts: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/list`,
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
        getPopPostById: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/detail`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //등록
        addPopPost: build.mutation<Response, Partial<Ppup>>({
            query: (body) => ({
                url: `${suffixPath}/save`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse
        }),
        //수정
        updatePopPost: build.mutation<Response, Partial<Ppup>>({
            query: (body) => ({
                url: `${suffixPath}/save`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //삭제
        deletePopPost: build.mutation<Response, Partial<Ppup>>({
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
    useGetPopPostsQuery,       //목록 조회
    useGetPopPostByIdQuery,    //상세 조회
    useAddPopPostMutation,     //등록
    useUpdatePopPostMutation,  //수정
    useDeletePopPostMutation,  //삭제
} = postApi

export const {
    endpoints: { getPopPosts, getPopPostById, addPopPost, updatePopPost, deletePopPost },
} = postApi
