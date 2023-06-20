import { Response } from '../models/response'
import { api } from './base/api.service'
import { CommonResponse } from './base/response.service'

let suffixPath = 'api/git'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        //상세 조회
        getGitFilePostByPath: build.mutation<Response, Partial<any>>({
            query: (body) => ({
                url: `${suffixPath}/file`,
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
    useGetGitFilePostByPathMutation,    //상세 조회
} = postApi

export const {
    endpoints: { getGitFilePostByPath},
} = postApi
