package com.social.twitterclone.service;

import java.util.List;

import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.User;

public interface UserService {
    
    // public User findUserById(Long userId) throws UserException;
    public User findUserById(String userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

    // public User updateUser(Long userId, User user) throws UserException;
    public User updateUser(String userId, User user) throws UserException;


    // public User followUser(Long userId, User user)throws UserException;
    public User followUser(String userId, User user)throws UserException;

    public List<User> searchUser(String query);

}
