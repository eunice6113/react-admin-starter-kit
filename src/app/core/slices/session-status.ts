//세션만료상태처리

const sessionExpired = () => ({ type: 'sessionExpired' })
const sessionInitialized = () => ({ type: 'sessionInitialized' })

const initialState = { value: false }

function sessionStatusReducer(state = initialState, action) {

    // console.log('*** 3 sessionStatusReducer action', action)

    if(action.type === 'sessionExpired') {
        console.log('*** 3 sessionExpired, value => true')
        return {
            ...state,
            value: true
        }
    }
    else if(action.type === 'sessionInitialized') {

        console.log('*** 6 store.subscribe sessionInitialized, value => false')

        return {
            ...state,
            value: false
        }
    }

    return state;
}

export {
    sessionExpired,
    sessionInitialized,
    sessionStatusReducer
}