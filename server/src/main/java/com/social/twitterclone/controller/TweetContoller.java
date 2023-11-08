package com.social.twitterclone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.twitterclone.dto.TweetDto;
import com.social.twitterclone.dto.mapper.TweetDtoMapper;
import com.social.twitterclone.exception.TweetException;
import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.Tweet;
import com.social.twitterclone.model.User;
import com.social.twitterclone.request.TweetReplyRequest;
import com.social.twitterclone.response.ApiResponse;
import com.social.twitterclone.service.TweetService;
import com.social.twitterclone.service.UserService;

@RestController
@RequestMapping("/api/tweets")
public class TweetContoller {
    
    @Autowired
    private UserService userService;

    @Autowired
    private TweetService tweetService;

    @PostMapping("/create")
    public ResponseEntity<TweetDto>createTweet(@RequestBody Tweet req, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user=userService.findUserProfileByJwt(jwt);
        Tweet tweet=tweetService.createTweet(req, user);

        TweetDto tweetDto=TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<TweetDto>(tweetDto,HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyRequest req,@RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user=userService.findUserProfileByJwt(jwt);
        Tweet tweet=tweetService.createdReply(req, user);

        TweetDto tweetDto=TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<TweetDto>(tweetDto, HttpStatus.CREATED);
    }

    @PutMapping("/{tweetId}/retweet")
    // public ResponseEntity<TweetDto> retweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt)throws UserException, TweetException {
    public ResponseEntity<TweetDto> retweet(@PathVariable String tweetId, @RequestHeader("Authorization") String jwt)throws UserException, TweetException {
        User user=userService.findUserProfileByJwt(jwt);

        Tweet tweet=tweetService.retweet(tweetId, user);

        TweetDto tweetDto=TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<TweetDto>(tweetDto, HttpStatus.OK);
    }

    @GetMapping("/{tweetId}")
    // public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId, @RequestHeader("Authorization")String jwt) throws UserException, TweetException{
        public ResponseEntity<TweetDto> findTweetById(@PathVariable String tweetId, @RequestHeader("Authorization")String jwt) throws UserException, TweetException{
        User user=userService.findUserProfileByJwt(jwt);
        Tweet tweet=tweetService.findById(tweetId);

        TweetDto tweetDto=TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<TweetDto>(tweetDto, HttpStatus.OK);
    }

    @DeleteMapping("/{tweetId}")
    // public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        public ResponseEntity<ApiResponse> deleteTweet(@PathVariable String tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user=userService.findUserProfileByJwt(jwt);
        tweetService.deleteTweetById(tweetId, user.getId());

        ApiResponse apiResponse=new ApiResponse();

        apiResponse.setMessage("Tweet has been deleted");
        apiResponse.setStatus(true);

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets(@RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user=userService.findUserProfileByJwt(jwt);
        List<Tweet>tweets=tweetService.findAllTweet();

        List<TweetDto>tweetDtos=TweetDtoMapper.toTweetDtos(tweets, user);
        
        return new ResponseEntity<>(tweetDtos,HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    // public ResponseEntity<List<TweetDto>> getUsersAllTweets(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        public ResponseEntity<List<TweetDto>> getUsersAllTweets(@PathVariable String userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User reqUser=userService.findUserProfileByJwt(jwt);

        User user=userService.findUserById(userId);

        List<Tweet>tweets=tweetService.getUserTweet(user);

        List<TweetDto>tweetDtos=TweetDtoMapper.toTweetDtos(tweets, user);
        
        return new ResponseEntity<>(tweetDtos,HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    // public ResponseEntity<List<TweetDto>> findTweetsByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        public ResponseEntity<List<TweetDto>> findTweetsByLikesContainsUser(@PathVariable String userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User reqUser=userService.findUserProfileByJwt(jwt);

        User user=userService.findUserById(userId);

        List<Tweet>tweets=tweetService.getLikeTweetContainsUser(user);

        List<TweetDto>tweetDtos=TweetDtoMapper.toTweetDtos(tweets, user);
        
        return new ResponseEntity<>(tweetDtos,HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/reply")
    // public ResponseEntity<List<TweetDto>> findUserReplyTweets(@PathVariable Long userId, @RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
        public ResponseEntity<List<TweetDto>> findUserReplyTweets(@PathVariable String userId, @RequestHeader ("Authorization") String jwt) throws UserException, TweetException{
        User user=userService.findUserProfileByJwt(jwt);

        User reqUser=userService.findUserById(userId);

        List<Tweet>tweets=tweetService.getUserReplyTweets(reqUser, userId);

        List<TweetDto>tweetDtos=TweetDtoMapper.toTweetDtos(tweets, reqUser);

        return new ResponseEntity<>(tweetDtos,HttpStatus.OK);
    }
}

