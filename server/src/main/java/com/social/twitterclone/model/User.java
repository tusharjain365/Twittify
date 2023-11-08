package com.social.twitterclone.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Embedded;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.ManyToMany;
// import jakarta.persistence.OneToMany;
import lombok.Data;

// @Entity
@Document
@Data // used to generate main functions like getters setters constructors tostring methods etc
public class User {

    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;
    private String id;

    private String email;
    private String password;
    private String fullName;
    private String location;
    private String website;
    private String image;
    private String mobile;
    private String birthDate;
    private String backgroundImage;
    private String bio;
    private boolean req_user; // at time of authorization to check if user obtained by token and user trying to access is same or not
    private boolean login_with_google;

    @JsonIgnore 
    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @DBRef
    private List<Tweet>tweet=new ArrayList<>();

    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @DBRef
    private List<Like>likes=new ArrayList<>();

    // @Embedded // all the fields of verification table will become fields of user table
    private Verification verification; // is the user has made payment for verification

    // @ManyToMany
    // @DBRef
    // List<User>followers=new ArrayList<>();
    
    @JsonIgnore
    List<String>followers=new ArrayList<>();

    // @ManyToMany
    // @DBRef
    // List<User>following=new ArrayList<>();
    
    @JsonIgnore
    List<String> following=new ArrayList<>();
}
