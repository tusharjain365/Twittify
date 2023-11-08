import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, GET_USER_BY_SEARCH, GET_USER_BY_SEARCH_FAILURE, GET_USER_BY_SEARCH_REQUEST, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, THEME, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType";

const initialState={
    user:null,
    error:null,
    loading:false,
    jwt:null,
    findUser:null,
    updateUser:false,
    searchUser:[],
    theme:false,
}

export const authReducer=(state=initialState, action)=>{ 
    switch (action.type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_PROFILE_REQUEST:
        case GET_USER_BY_SEARCH_REQUEST:
        case UPDATE_USER_REQUEST:
        case GET_USER_BY_ID_REQUEST:
        case FOLLOW_USER_REQUEST:
            return {...state, loading:true,error:null}
            

        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {...state, loading: false, jwt:action.payload}

        case GET_USER_PROFILE_SUCCESS:
            return {...state, loading:false, user:action.payload}

        case UPDATE_USER_SUCCESS:
            return {...state, loading:false, user:action.payload,updateUser:true}

        case GET_USER_BY_ID_SUCCESS:
            return {...state, loading:false, findUser:action.payload}

        case FOLLOW_USER_SUCCESS:
            return {...state, loading:false, findUser:action.payload}

        case GET_USER_BY_SEARCH:
            return {...state, loading:false, searchUser:action.payload};

        case LOGOUT:
            return initialState;

        case THEME:
            return {...state,loading:false, theme:!state.theme}

        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case  GET_USER_PROFILE_FAILURE:
        case GET_USER_BY_SEARCH_FAILURE:
        case GET_USER_BY_ID_FAILURE:
        case UPDATE_USER_FAILURE:
        case FOLLOW_USER_FAILURE:
            return {...state, loading:false, error:action.payload}

        default:
            return state;
    }
}