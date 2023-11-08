package com.social.twitterclone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
import lombok.Data;

// @Entity
@Document("likes")
@Data
// @Table(name = "likes")
public class Like {
    
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;
    private String id;

    // @ManyToOne
    @DBRef
    private User user;

    // @ManyToOne
    @DBRef
    private Tweet tweet;
}
