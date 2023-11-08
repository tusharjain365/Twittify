package com.social.twitterclone.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class UserDto {
    // private Long id;
    private String id;
    
    private String fullName;

    private String email;

    private String image;

    private String backgroundImage;

    private String bio;

    private String website;

    private String location;

    private String mobile;

    private String birthDate;

    private boolean req_user;

    private boolean login_with_google;

    // private List<UserDto>followers=new ArrayList<>();

    // private List<UserDto>following=new ArrayList<>();

    private List<String>followers=new ArrayList<>();

    private List<String> following=new ArrayList<>();

    private boolean followed;

    private boolean isVerified;
}
