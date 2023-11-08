import { api, API_BASE_URL } from "../../config/api"
import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_REQUEST, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_SUCCESS, GET_USERS_TWEET_FAILURE, GET_USERS_TWEET_REQUEST, GET_USERS_TWEET_SUCCESS, GET_USER_REPLY_FAILURE, GET_USER_REPLY_REQUEST, GET_USER_REPLY_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_REQUEST, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_REQUEST, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_REQUEST, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_REQUEST, TWEET_DELETE_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_REQUEST, USER_LIKE_TWEET_SUCCESS } from "./ActionType";

export const getAllTweets=()=> async (dispatch)=>{
    try {

        dispatch({type:GET_ALL_TWEETS_REQUEST});

        const {data}=await api.get("/api/tweets/",{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        });
    
        dispatch({type:GET_ALL_TWEETS_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:GET_ALL_TWEETS_FAILURE, payload:error.message});
    }
}

export const getUsersTweets=(userId)=> async (dispatch)=>{
    try {

        dispatch({type:GET_USERS_TWEET_REQUEST});

        const {data}=await api.get(`/api/tweets/user/${userId}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        });

        dispatch({type:GET_USERS_TWEET_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:GET_USERS_TWEET_FAILURE, payload:error.message});
    }
}

export const findTweetsByLikesContainsUser=(userId)=> async (dispatch)=>{
    try {

        dispatch({type:USER_LIKE_TWEET_REQUEST});

        const {data}=await api.get(`/api/tweets/user/${userId}/likes`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        });
        
        dispatch({type:USER_LIKE_TWEET_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:USER_LIKE_TWEET_FAILURE, payload:error.message});
    }
}

export const findTweetById=(tweetId)=> async (dispatch)=>{
    try {

        dispatch({type:FIND_TWEET_BY_ID_REQUEST});
        const {data}=await api.get(`/api/tweets/${tweetId}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        });
        
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:FIND_TWEET_BY_ID_FAILURE, payload:error.message});
    }
}

export const createTweet=(tweetData)=> async (dispatch)=>{
    try {

        dispatch({type:TWEET_CREATE_REQUEST});

        const {data}=await api.post("/api/tweets/create", tweetData,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });
        dispatch({type:TWEET_CREATE_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:TWEET_CREATE_FAILURE, payload:error.message});
    }
}

export const createTweetReply=(tweetData)=> async (dispatch)=>{
    try {

        dispatch({type:REPLY_TWEET_REQUEST});

        const {data}=await api.post("/api/tweets/reply", tweetData,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });
        
        dispatch({type:REPLY_TWEET_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:REPLY_TWEET_FAILURE, payload:error.message});
    }
}

export const createReTweetReply=(tweetId)=> async (dispatch)=>{
    try {

        dispatch({type:RETWEET_REQUEST});

        const {data}=await api.put(`/api/tweets/${tweetId}/retweet`,{},{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });
        
        dispatch({type:RETWEET_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:RETWEET_FAILURE, payload:error.message});
    }
}

export const likeTweet=(tweetId)=> async (dispatch)=>{
    try {

        dispatch({type:LIKE_TWEET_REQUEST});

        const {data}=await api.post(`${API_BASE_URL}/api/${tweetId}/likes`,{},{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });

        dispatch({type:LIKE_TWEET_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:LIKE_TWEET_FAILURE, payload:error.message});
    }
}

export const deleteTweet=(tweetId)=> async (dispatch)=>{
    try {

        dispatch({type:TWEET_DELETE_REQUEST});

        const {data}=await api.delete(`/api/tweets/${tweetId}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });
        
        dispatch({type:TWEET_DELETE_SUCCESS, payload:tweetId});
    } catch (error) {
        dispatch({type:TWEET_DELETE_FAILURE, payload:error.message});
    }
}

export const getUserReplyTweets=(userId)=> async (dispatch)=>{
    try {

        dispatch({type:GET_USER_REPLY_REQUEST});

        const {data}=await api.get(`${API_BASE_URL}/api/tweets/user/${userId}/reply`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type":"application/json"
            }
        });

        dispatch({type:GET_USER_REPLY_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:GET_USER_REPLY_FAILURE, payload:error.message});
    }
}

