import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './services/base/api.service';
import auth from './slices/auth/auth.slice';
import historyReducer from './slices/history.slice';


const reducer = {
    [api.reducerPath]: api.reducer,
    history: historyReducer,
    auth,
}

/**
 * Log a warning and show a toast!

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!')

        let dialog = alertDialog();
        dialog.confirm({
            header: 'Async error!', 
            message: action.error.data.message
        })
    }

    return next(action)
}
*/

export const createStore = (
    options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
    configureStore({
        reducer: reducer,
        //Adding the api middleware enables caching, invalidation, polling,
        //and other useful features of `rtk-query`.
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        ...options,
    })
  
export const store = createStore()








// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

