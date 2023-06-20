import { Post, } from '../models/qsm'
import { Response } from '../models/response'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'qstr'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        //목록 조회
        getQsmPosts: build.query<Response, Partial<Post>>({
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
        getQsmPostById: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/detail`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }), 
        //등록
        addQsmPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/save`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse
        }),
        //수정
        updateQsmPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/save`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //삭제
        deleteQsmPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/delete`, 
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //상세 조회
        getQsmResultById: build.query<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/result`,
                method: 'POST',
                body,
            }),
            transformResponse: CommonResponse,
        }),
        //종료
        updateQsmPgstPost: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/mdfcPgst`, 
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
    useGetQsmPostsQuery,       //목록 조회
    useGetQsmPostByIdQuery,    //상세 조회
    useAddQsmPostMutation,     //등록
    useUpdateQsmPostMutation,  //수정
    useDeleteQsmPostMutation,  //삭제
    useGetQsmResultByIdQuery,  //결과 조회
    useUpdateQsmPgstPostMutation,   //설문종료
} = postApi

export const {
    endpoints: {getQsmPosts, getQsmPostById, addQsmPost, updateQsmPost , deleteQsmPost, getQsmResultById, updateQsmPgstPost},
} = postApi