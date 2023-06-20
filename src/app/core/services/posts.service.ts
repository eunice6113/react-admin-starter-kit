import { api } from './base/api.service'

export interface Post {
  id: number
  name: string
  fetched_at: string
}

type PostsResponse = Post[]

export interface User {
  first_name: string
  last_name: string
  email: string
  phone: string
}

let suffixPath = process.env.REACT_APP_API_NAME //'exam_pbns'

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => ({ url: 'posts' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
        { type: 'Posts' as const, id: 'LIST' },
      ],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `${suffixPath}/posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: build.query<Post, number>({
      query: (id) => `${suffixPath}/posts/${id}`,
      providesTags: (_post, _err, id) => [{ type: 'Posts', id }],
    }),
    updatePost: build.mutation<Post, Partial<Post>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `${suffixPath}/posts/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `${suffixPath}/posts/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => 'error-prone',
    }),
  }),
})

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useGetErrorProneQuery,
} = postsApi

export const {
  endpoints: { getPost },
} = postsApi
