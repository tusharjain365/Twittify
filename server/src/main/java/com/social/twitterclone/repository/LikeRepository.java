package com.social.twitterclone.repository;

import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.social.twitterclone.model.Like;

// public interface LikeRepository extends JpaRepository<Like, Long>{
public interface LikeRepository extends MongoRepository<Like,String>{

    // @Query("select l from Like l where l.user.id=:userId and l.tweet.id=:tweetId")
    // @Query("$and : [{'user.id' : '?0'}, {'tweet.id' : '?1'}]")
    @Query("{'user.id' : ?0,  'tweet.id' : ?1}")
    public Like isLikeExist(String userId, String tweetId);
    // public Like isLikeExist(@Param("userId") Long userId, @Param("tweetId") Long tweetId);

    // @Query("{'user' : {'id' : '?0'}}")
    // @Query("select l from Like l where l.user.id=:userId")
    @Query("{'user.id' : ?0}")
    public List<Like> findByUserLike(String userId);

    // @Query("select l from Like l where l.tweet.id=:tweetId")
    @Query("{'tweet.id' : ?0}")
    public List<Like> findByTweetId(String tweetId);
    // public List<Like> findByTweetId(@Param("tweetId") Long tweetId);
    
}
