package com.social.twitterclone.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeDeleteEvent;
import org.springframework.stereotype.Component;

import com.social.twitterclone.model.Like;
import com.social.twitterclone.model.Tweet;
import com.social.twitterclone.repository.LikeRepository;
import com.social.twitterclone.repository.TweetRepository;

@Component
public class DeleteTweetEventListener extends AbstractMongoEventListener<Tweet> {

    @Autowired
    private TweetRepository tweetRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Override
    public void onBeforeDelete(BeforeDeleteEvent<Tweet> event) {

        String tweetId=String.valueOf(event.getDocument().get("_id"));

       List<Tweet>replyTweets=tweetRepository.findById(tweetId).get().getReplyTweets();

       List<Like>likeTweets=likeRepository.findByTweetId(tweetId);

       if(likeTweets!=null) {
        likeTweets.forEach(s->likeRepository.deleteById(s.getId()));
       }

       if(replyTweets!=null) {
           replyTweets.forEach(s->tweetRepository.deleteById(s.getId()));
        } 
    }
    
}
