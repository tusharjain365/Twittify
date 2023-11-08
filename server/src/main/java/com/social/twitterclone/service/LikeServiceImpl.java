package com.social.twitterclone.service;

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

@Service
public class LikeServiceImpl implements LikeService{

    @Autowired
    private LikeRepository likeRepo;

    @Autowired
    private TweetService tweetService;

    @Autowired
    private TweetRepository tweetRepo;

    @Override
    // public Like likeTweet(Long tweetId, User user) throws UserException, TweetException {
        public Like likeTweet(String tweetId, User user) throws UserException, TweetException {
        Like isLikeExist=likeRepo.isLikeExist(user.getId(), tweetId);

        if(isLikeExist!=null) {
            // likeRepo.deleteById(tweetId);

            likeRepo.delete(isLikeExist);

            return isLikeExist;
        }

        Tweet tweet=tweetService.findById(tweetId);

        Like like=new Like();
        like.setTweet(tweet);
        like.setUser(user);

        Like savedLike=likeRepo.save(like);

        tweet.getLikes().add(savedLike);

        tweetRepo.save(tweet);
        
        return savedLike;
    }

    @Override
    // public List<Like> getAllLikes(Long tweetId) throws TweetException {
        public List<Like> getAllLikes(String tweetId) throws TweetException {
        Tweet tweet=tweetService.findById(tweetId);

        List<Like>likes=likeRepo.findByTweetId(tweet.getId());
        
        return likes;
    }

    
    
}
