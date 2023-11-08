package com.social.twitterclone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.twitterclone.dto.LikeDto;
import com.social.twitterclone.dto.mapper.LikeDtoMapper;
import com.social.twitterclone.exception.TweetException;
import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.Like;
import com.social.twitterclone.model.User;
import com.social.twitterclone.service.LikeService;
import com.social.twitterclone.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {
    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{tweetId}/likes")
    // public ResponseEntity<LikeDto> likeTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
    public ResponseEntity<LikeDto> likeTweet(@PathVariable String tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user=userService.findUserProfileByJwt(jwt);

        Like like=likeService.likeTweet(tweetId, user);

        LikeDto likeDto=LikeDtoMapper.toLikeDto(like, user);

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }

    @GetMapping("/tweet/{tweetId}")
    // public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable String tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{
        User user=userService.findUserProfileByJwt(jwt);

        List<Like> like=likeService.getAllLikes(tweetId);

        List<LikeDto> likeDtos=LikeDtoMapper.toLikeDtos(like, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }
}
