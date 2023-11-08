package com.social.twitterclone.repository;

import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.social.twitterclone.model.Tweet;
import com.social.twitterclone.model.User;

// public interface TweetRepository extends JpaRepository<Tweet, Long> {
public interface TweetRepository extends MongoRepository<Tweet, String> {

    public List<Tweet> findAllByIsTweetTrueOrderByCreatedAtDesc();

    // public List<Tweet> findByRetweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc(User user, Long userId);
    public List<Tweet> findByRetweetUserContainsOrUser_IdAndIsTweetTrueOrderByCreatedAtDesc(User user, String userId);


    // public List<Tweet> findByUserOrUser_IdAndIsReplyTrueOrderByCreatedAtDesc(User user,Long userId);
    public List<Tweet> findByUser_IdAndIsReplyTrueOrderByCreatedAtDesc(String userId);

    public List<Tweet> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("select t from Tweet t JOIN t.likes l where l.user.id=:userId")
    // @Query("")
    public List<Tweet>findByLikesUser_id(String userId);
    // public List<Tweet>findByLikesUser_id(Long userId);

    // @Query("$pull : {'replyTweets' : {'id' : '?1'}}")
    // public List<Tweet> getReplyTweet(String tweetId, String replyTweetId);

    
}
