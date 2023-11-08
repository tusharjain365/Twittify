package com.social.twitterclone.request;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TweetReplyRequest {
    
    private String content;

    private String image;

    // private Long tweetId;
    private String tweetId;

    private LocalDateTime createdAt;
}
