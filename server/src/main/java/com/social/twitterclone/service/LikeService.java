package com.social.twitterclone.service;

import java.util.List;

import com.social.twitterclone.exception.TweetException;
import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.Like;
import com.social.twitterclone.model.User;

public interface LikeService{

    // public Like likeTweet(Long tweetId, User user) throws UserException, TweetException;
    public Like likeTweet(String tweetId, User user) throws UserException, TweetException;

    // public List<Like> getAllLikes(Long tweetId)throws TweetException;
    public List<Like> getAllLikes(String tweetId)throws TweetException;
    
}
