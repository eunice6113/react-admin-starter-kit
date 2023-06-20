import { api } from './api.service';
import { CommonResponse } from './response.service';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<any, any>({
      query: (credentials: any) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: CommonResponse,
    }),

    //세션만료테스트
    deleteToken: build.mutation<any, any>({
      query: (credentials: any) => ({
        url: 'delete/6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useDeleteTokenMutation,
} = authApi

export const {
  endpoints: { login, deleteToken },
} = authApi
