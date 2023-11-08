package com.social.twitterclone.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.social.twitterclone.dto.LikeDto;
import com.social.twitterclone.dto.TweetDto;
import com.social.twitterclone.dto.UserDto;
import com.social.twitterclone.model.Like;
import com.social.twitterclone.model.User;

public class LikeDtoMapper {
    public static LikeDto toLikeDto(Like like, User reqUser) {
        UserDto user=UserDtoMapper.toUserDto(like.getUser());

        TweetDto tweet=TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

        LikeDto likeDto=new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setUser(user);
        likeDto.setTweet(tweet);
        
        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like>likes, User reqUser) {
        List<LikeDto>likeDtos=new ArrayList<>();

        for(Like like:likes) {
            UserDto user=UserDtoMapper.toUserDto(like.getUser());
            TweetDto tweet=TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

            LikeDto likeDto=new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setUser(user);
            likeDto.setTweet(tweet);

            likeDtos.add(likeDto);
        }

        return likeDtos;
    }
}
