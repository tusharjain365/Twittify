package com.social.twitterclone.service;

import java.util.List;

import com.social.twitterclone.exception.TweetException;
import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.Tweet;
import com.social.twitterclone.model.User;
import com.social.twitterclone.request.TweetReplyRequest;

public interface TweetService {
    
    public Tweet createTweet(Tweet req, User user)throws TweetException, UserException;

    public List<Tweet> findAllTweet();

    // public Tweet retweet(Long tweetId, User user) throws TweetException, UserException;
    public Tweet retweet(String tweetId, User user) throws TweetException, UserException;

    // public Tweet findById(Long tweetId) throws TweetException;
    public Tweet findById(String tweetId) throws TweetException;

    // public void deleteTweetById(Long tweetId, Long userId) throws TweetException, UserException;
    public void deleteTweetById(String tweetId, String userId) throws TweetException, UserException;


    // public void removeFromRetweet(Long tweetId, User user) throws TweetException, UserException;
    public void removeFromRetweet(String tweetId, User user) throws TweetException, UserException;

    public Tweet createdReply(TweetReplyRequest req, User user)throws TweetException, UserException;

    public List<Tweet> getUserTweet(User user);

    public List<Tweet> getLikeTweetContainsUser(User user);

    // public List<Tweet> getUserReplyTweets(User user, Long userId);
    public List<Tweet> getUserReplyTweets(User user, String userId);

}
