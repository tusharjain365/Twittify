import axios from "axios"
import { api, API_BASE_URL } from "../../config/api";
import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, GET_USER_BY_SEARCH, GET_USER_BY_SEARCH_FAILURE, GET_USER_BY_SEARCH_REQUEST, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, THEME, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType";

export const loginUser=(loginData)=>async(dispatch)=>{
    try {

        dispatch({type:LOGIN_USER_REQUEST});

        const {data}=await axios.post(`${API_BASE_URL}/auth/signin`, loginData);

        if(data.jwt) {
            localStorage.setItem("jwt",data.jwt);
        }

        dispatch({type:LOGIN_USER_SUCCESS, payload:data.jwt});
    } catch (error) {
        console.log("error "+error);
        dispatch({type:LOGIN_USER_FAILURE, payload:error.message})
    }
}

export const registerUser=(registerData)=>async(dispatch)=>{
    try {

        dispatch({type:REGISTER_USER_REQUEST});
        const {data}=await axios.post(`${API_BASE_URL}/auth/signup`, registerData);

        if(data.jwt) {
            localStorage.setItem("jwt",data.jwt);
        }

        dispatch({type:REGISTER_USER_SUCCESS, payload:data.jwt});
    } catch (error) {
        console.log("error "+error);
        dispatch({type:REGISTER_USER_FAILURE, payload:error.message})
    }
}

export const getUserProfile=(jwt)=>async(dispatch)=>{
    try {

        dispatch({type:GET_USER_PROFILE_REQUEST});

        const {data}=await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers:{
                "Authorization":`Bearer ${jwt}`
            }
        });

        dispatch({type:GET_USER_PROFILE_SUCCESS, payload:data});
    } catch (error) {
        console.log("error "+error);
        dispatch({type:GET_USER_PROFILE_FAILURE, payload:error.message})
    }
}

export const getUserById=(userId)=>async(dispatch)=>{
    try {
        dispatch({type:GET_USER_BY_ID_REQUEST});

        const {data}=await api.get(`/api/users/${userId}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        });

        dispatch({type:GET_USER_BY_ID_SUCCESS, payload:data});
    } catch (error) {
        console.log("error "+error);
        dispatch({type:GET_USER_BY_ID_FAILURE, payload:error.message})
    }
}


export const updateUser=(reqData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_USER_REQUEST});

        const {data}=await api.put(`/api/users/update`,reqData,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });
        dispatch({type:UPDATE_USER_SUCCESS, payload:data});
    } catch (error) {
        console.log("error "+error);
        dispatch({type:UPDATE_USER_FAILURE, payload:error.message})
    }
}

export const followUserAction=(userId)=>async(dispatch)=>{
    try {
        dispatch({type:FOLLOW_USER_REQUEST});
        const {data}=await api.put(`/api/users/${userId}/follow`,{},{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });

        dispatch({type:FOLLOW_USER_SUCCESS, payload:data});
    } catch (error) {
        console.log("error "+error);
        dispatch({type:FOLLOW_USER_FAILURE, payload:error.message})
    }
}

export const getUserBySearch=(query)=>async(dispatch)=>{
    try {
        dispatch({type:GET_USER_BY_SEARCH_REQUEST});
        const {data}=await api.get(`/api/users/search?query=${query}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });
        dispatch({type:GET_USER_BY_SEARCH,payload:data});
    } catch (error) {
        dispatch({type:GET_USER_BY_SEARCH_FAILURE, payload:error.message})
    }
}

export const logout=()=>async(dispatch)=>{
    localStorage.removeItem("jwt");

    dispatch({type:LOGOUT,payload:null});
}

export const changeTheme=()=>(dispatch)=> {
    dispatch({type:THEME,payload:null});
}

