package com.social.twitterclone.dto;

import lombok.Data;

@Data
public class LikeDto {
    // private Long id;
    private String id;

    private UserDto user;

    private TweetDto tweet;
}
