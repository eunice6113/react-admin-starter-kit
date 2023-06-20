import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/user';
import { authApi } from '../../services/base/auth.service';
import { getToken, getUserInfo, setUserInfo, ssoLogin, ssoLogout } from '../../services/base/base-api.service';
import { RootState } from '../../store';

interface Auth {
  empid: null; 
  user: null | User | any; 
  token: string | null; 
  isAuthenticated: boolean;
}

const initialState = {
  empid: null,
  user: null,
  token: null,
  isAuthenticated: false,
} as Auth

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: () => initialState,
    login: () => {
      ssoLogin();
    },
    autoLogin: () => {
      const hasValidToken = getToken();
      console.log('hasValidToken', hasValidToken)

      if(!hasValidToken) {
        ssoLogin();
      }
    },
    logout: () => ssoLogout(),
    storeEmpid: ( state:any, { payload } ) => {
      // console.log('setEmpid state', state, 'payload', payload, 'payload.empid', payload.empid)
      state.empid = payload
      // console.log('setEmpid 2 state.empid', state.empid)
    },
    setUser: ( state, { payload } ) => {
      console.log('setUser', state, payload)
      
      state.user = payload
      setUserInfo(JSON.stringify(payload))
    },
    getUser: () => {
      let userData = JSON.parse(getUserInfo())
      return userData
    },
    tokenReceived: ( state, { payload } ) => {
      console.log('tokenReceived', state, payload)
      state.token = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
        console.log('pending', action)
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action)

        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action)
      })
  },
})

export const { login, logout, tokenReceived, storeEmpid, setUser, getUser } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => 
  state.auth.isAuthenticated
