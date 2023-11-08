package com.social.twitterclone.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.social.twitterclone.dto.TweetDto;
import com.social.twitterclone.dto.UserDto;
import com.social.twitterclone.model.Tweet;
import com.social.twitterclone.model.User;
import com.social.twitterclone.util.TweetUtil;

public class TweetDtoMapper {
    public static TweetDto toTweetDto(Tweet tweet, User reqUser) {
        UserDto userDto=UserDtoMapper.toUserDto(tweet.getUser());

        boolean isLiked=TweetUtil.isLikedByReqUser(reqUser,tweet);
        boolean isRetweeted=TweetUtil.isRetweetedByReqUser(reqUser, tweet);

        // List<Long>retweetUserId=new ArrayList<>();
        List<String>retweetUserId=new ArrayList<>();

        for(User user:tweet.getRetweetUser()) {
            retweetUserId.add(user.getId());
        }

        TweetDto tweetDto=new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setVideo(tweet.getVideo());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
        tweetDto.setUser(userDto);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUsersId(retweetUserId);
        tweetDto.setReplyTweets(toTweetDtos(tweet.getReplyTweets(), reqUser));


        return tweetDto;
    }

    public static List<TweetDto> toTweetDtos(List<Tweet>tweets, User reqUser) {
        List<TweetDto>tweetDtos=new ArrayList<>();

        for(Tweet tweet:tweets) {
            TweetDto tweetDto=toReplyTweetDto(tweet,reqUser);
            tweetDtos.add(tweetDto);
        }
        return tweetDtos;
    }

    private static TweetDto toReplyTweetDto(Tweet tweet, User reqUser) {
        UserDto userDto=UserDtoMapper.toUserDto(tweet.getUser());

        boolean isLiked=TweetUtil.isLikedByReqUser(reqUser,tweet);
        boolean isRetweeted=TweetUtil.isRetweetedByReqUser(reqUser, tweet);

        // List<Long>retweetUserId=new ArrayList<>();
        List<String>retweetUserId=new ArrayList<>();

        for(User user:tweet.getRetweetUser()) {
            retweetUserId.add(user.getId());
        }
        TweetDto tweetDto=new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setVideo(tweet.getVideo());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getRetweetUser().size());
        tweetDto.setUser(userDto);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUsersId(retweetUserId);


        return tweetDto;
    }
}
