import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_REQUEST, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_SUCCESS, GET_USERS_TWEET_FAILURE, GET_USERS_TWEET_REQUEST, GET_USERS_TWEET_SUCCESS, GET_USER_REPLY_FAILURE, GET_USER_REPLY_REQUEST, GET_USER_REPLY_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_REQUEST, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_REQUEST, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_REQUEST, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_REQUEST, TWEET_DELETE_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_REQUEST, USER_LIKE_TWEET_SUCCESS } from "./ActionType";

const initialState={
    loading:false,
    error:null,
    tweet:null,
    tweets:[],
    likedTweets:[],
    like:null,
    retweet:null,
    delete:false,
    replyTweets:[]
}

export const tweetReducer=(state=initialState, action)=>{
    switch (action.type) {
        case TWEET_CREATE_REQUEST:
        case TWEET_DELETE_REQUEST:
        case GET_ALL_TWEETS_REQUEST:
        case GET_USERS_TWEET_REQUEST:
        case USER_LIKE_TWEET_REQUEST:
        case LIKE_TWEET_REQUEST:
        case FIND_TWEET_BY_ID_REQUEST:
        case REPLY_TWEET_REQUEST:
        case RETWEET_REQUEST:
        case GET_USER_REPLY_REQUEST:
            return {...state, loading:true, error:null}

        case TWEET_CREATE_FAILURE:
        case TWEET_DELETE_FAILURE:
        case GET_ALL_TWEETS_FAILURE:
        case GET_USERS_TWEET_FAILURE:
        case USER_LIKE_TWEET_FAILURE:
        case LIKE_TWEET_FAILURE:
        case FIND_TWEET_BY_ID_FAILURE:
        case REPLY_TWEET_FAILURE:
        case RETWEET_FAILURE:
        case GET_USER_REPLY_FAILURE:
            return {...state, loading:false, error:action.payload};
        
        case TWEET_CREATE_SUCCESS:
            return {...state, loading:false,error:null,tweets:[action.payload,...state.tweets]};
        
        case GET_ALL_TWEETS_SUCCESS:
        case GET_USERS_TWEET_SUCCESS:
            return {...state, loading:false, error:null, tweets:action.payload};

        case USER_LIKE_TWEET_SUCCESS:
            return {...state, loading:false,error:null,likedTweets:action.payload};

        case LIKE_TWEET_SUCCESS:
            return {...state, loading:false,error:null,like:action.payload};

        case TWEET_DELETE_SUCCESS:
            return {...state, loading:false,error:null,delete:!state.delete, tweets:[state.tweets.filter((tweet)=>tweet.id!==action.payload)]};

        case RETWEET_SUCCESS:
            return {...state, loading:false,error:null,retweet:action.payload};

        case FIND_TWEET_BY_ID_SUCCESS:
        case REPLY_TWEET_SUCCESS:
            return {...state, loading:false,error:null,tweet:action.payload};

        case GET_USER_REPLY_SUCCESS:
            return {...state,loading:false,error:null,replyTweets:action.payload};
    
        default:
            return state;
    }
}