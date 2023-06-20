import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { confirmDialog } from 'primereact'
import { getEmpId, getToken, ssoLogin } from './base-api.service'

let base_api = process.env.REACT_APP_API_URL 

const baseQuery = fetchBaseQuery({
    baseUrl: `${base_api}`,
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
        const token = getToken();
        const empid = getEmpId();

        if (empid) {
            headers.set('empid', `${empid}`)
        }
        if (token) {
            headers.set('Authorization', `${token}`)
        }

        return headers
    },
}) 

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    
    //에러 발생
    if (result?.error?.data['success'] === false) {

        let code = result?.error?.data['error']?.code
        let errorMsg = result?.error?.data['error']?.errorMsg

        //세션 만료시 /login api 를 호출하여 토큰을 다시 저장 
        //==> 세션 만료시 logout 페이지를 보여줌 
        if (code === 'AUE00001') {

            localStorage.clear()

            confirmDialog({
                header: code, 
                message: errorMsg,
                className: 'oneButton',
                acceptLabel: '확인',
                accept: ()=> {
                    ssoLogin()
                },
            })
        }
        //인증 토큰이 없을 때 SSO Logout 처리한다
        else if (code.slice(0,3) === 'AUE') {

            localStorage.clear()

            confirmDialog({
                header: code, 
                message: errorMsg,
                className: 'oneButton',
                acceptLabel: '확인',
                accept: ()=> {
                    console.log('AUE ERROR ===> sso logout')
                    ssoLogin()
                },
            })
        } 
        // 일반적인 에러
        else {
            confirmDialog({
                header: code, 
                message: errorMsg,
                className: 'oneButton',
                acceptLabel: '확인',
                accept: ()=> {
                    // console.log('accept')
                },
            })
        }
    }

    return result
}





const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 2 })

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Post', 'Counter', 'Posts', 'Organization'],
    endpoints: () => ({}),
})

export const enhancedApi = api.enhanceEndpoints({
    endpoints: () => ({
        getPost: () => 'test getPost',
        getPosts: () => 'test getPosts',
    }),
})  

export {
    baseQuery,
}