package com.social.twitterclone.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.ManyToMany;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToMany;
import lombok.Data;

// @Entity
@Document
@Data
public class Tweet {

    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;
    private String id;

    // @ManyToOne
    private User user;

    private String content;
    private String image;
    private String video;

    // @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
    @DocumentReference
    List<Like>likes=new ArrayList<>();

    // @OneToMany
    // @DBRef
    @DocumentReference
    List<Tweet>replyTweets=new ArrayList<>();

    // @ManyToMany
    @DBRef
    List<User>retweetUser=new ArrayList<>();

    // @ManyToOne
    private Tweet replyfor;

    private boolean isReply;
    private boolean isTweet;

    private LocalDateTime createdAt;
}
