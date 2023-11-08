package com.social.twitterclone.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social.twitterclone.exception.TweetException;
import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.Like;
import com.social.twitterclone.model.Tweet;
import com.social.twitterclone.model.User;
import com.social.twitterclone.repository.LikeRepository;
import com.social.twitterclone.repository.TweetRepository;
import com.social.twitterclone.request.TweetReplyRequest;

@Service
public class TweetServiceImpl implements TweetService{

    @Autowired
    private TweetRepository tweetRepo;

    @Autowired
    private LikeRepository likeRepository;

    @Override
    public Tweet createTweet(Tweet req, User user) throws TweetException, UserException {
        Tweet tweet=new Tweet();

        tweet.setUser(user);
        tweet.setContent(req.getContent());
        tweet.setImage(req.getImage());
        tweet.setVideo(req.getVideo());
        tweet.setCreatedAt(LocalDateTime.now());
        tweet.setTweet(true);
        tweet.setReply(false);

        return tweetRepo.save(tweet);
    }

    @Override
    public List<Tweet> findAllTweet() {
        return tweetRepo.findAllByIsTweetTrueOrderByCreatedAtDesc();
    }

    @Override
    // public Tweet retweet(Long tweetId, User user) throws TweetException, UserException {
        public Tweet retweet(String tweetId, User user) throws TweetException, UserException {
        Tweet tweet=findById(tweetId);
        
        if(tweet.getRetweetUser().contains(user)) {
            tweet.getRetweetUser().remove(user);
        }else {
            tweet.getRetweetUser().add(user);
        }

        return tweetRepo.save(tweet);
    }

    @Override
    // public Tweet findById(Long tweetId) throws TweetException {
        public Tweet findById(String tweetId) throws TweetException {
        Tweet tweet=tweetRepo.findById(tweetId)
        .orElseThrow(()-> new TweetException("Tweet not found with id "+tweetId));

        return tweet;
    }

    @Override
    // public void deleteTweetById(Long tweetId, Long userId) throws TweetException, UserException {
    public void deleteTweetById(String tweetId, String userId) throws TweetException, UserException {
        Tweet tweet=findById(tweetId);

        if(!userId.equals(tweet.getUser().getId())) {
            throw new UserException("You cannot delete tweets created by another user");
        }

        tweetRepo.deleteById(tweetId);

        // tweetRepo.delete(tweet);
    }

    @Override
    // public void removeFromRetweet(Long tweetId, User user) throws TweetException, UserException {
        public void removeFromRetweet(String tweetId, User user) throws TweetException, UserException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'removeFromRetweet'");
    }

    @Override
    public Tweet createdReply(TweetReplyRequest req, User user) throws TweetException, UserException {

        Tweet replyFor=findById(req.getTweetId());

        Tweet tweet=new Tweet();

        tweet.setUser(user);
        tweet.setContent(req.getContent());
        tweet.setImage(req.getImage());
        tweet.setCreatedAt(LocalDateTime.now());
        tweet.setTweet(false);
        tweet.setReply(true);
        tweet.setReplyfor(replyFor);

        Tweet savedReply=tweetRepo.save(tweet);

        // tweet.getReplyTweets().add(savedReply);
        // List<Tweet>replyTweets=replyFor.getReplyTweets();
        // replyTweets.add(savedReply);
        replyFor.getReplyTweets().add(savedReply);
        // replyFor.setReplyTweets(replyTweets);

        // replyFor.setContent("changed content");

        tweetRepo.save(replyFor);

        return replyFor;
        // return finalTweet;
    }

    @Override
    public List<Tweet> getUserTweet(User user) {

        return tweetRepo.findByRetweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Tweet> getLikeTweetContainsUser(User user) {

        List<Like>likes=likeRepository.findByUserLike(user.getId());

        List<Tweet>likeTweets=new ArrayList<>();

        if(likes!=null) {
            likes.forEach(s-> likeTweets.add(s.getTweet()));

            // likes.forEach(s-> System.out.println(s.getTweet().getId()));
        }

        return likeTweets;

        // return tweetRepo.findByLikesUser_id(user.getId());
    }

    @Override
    // public List<Tweet> getUserReplyTweets(User user, Long userId) {
    public List<Tweet> getUserReplyTweets(User user, String userId) {

        return tweetRepo.findByUser_IdAndIsReplyTrueOrderByCreatedAtDesc(userId);
    }
    
}
