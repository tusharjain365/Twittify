package com.social.twitterclone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social.twitterclone.config.JwtProvider;
import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.User;
import com.social.twitterclone.repository.UserRepository;
import com.social.twitterclone.util.UserUtil;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    // public User findUserById(Long userId) throws UserException {
    public User findUserById(String userId) throws UserException {
        User user=userRepo.findById(userId).orElseThrow(()-> new UserException("User is not found with id "+userId));

        // if(user==null) {
        //     throw new UserException("User not found with id "+userId);
        // }

        // System.out.println(user.getId());
        
        return user;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email=jwtProvider.getEmailFromToken(jwt);

        User user=userRepo.findByEmail(email);

        if(user==null) {
            throw new UserException("user not found with email "+email);
        }

        return user;
    }

    @Override
    // public User updateUser(Long userId, User req) throws UserException {
    public User updateUser(String userId, User req) throws UserException {
        User user=findUserById(userId);

        if(req.getFullName()!=null) {
            user.setFullName(req.getFullName());
        }

        if(req.getImage()!=null) {
            user.setImage(req.getImage());
        }

        if(req.getBackgroundImage()!=null) {
            user.setImage(req.getBackgroundImage());
        }

        if(req.getBirthDate()!=null) {
            user.setBirthDate(req.getBirthDate());
        }

        if(req.getLocation()!=null) {
            user.setLocation(req.getLocation());
        }

        if(req.getBio()!=null) {
            user.setBio(req.getBio());
        }

        if(req.getWebsite()!=null) {
            user.setWebsite(req.getWebsite());
        }

        return userRepo.save(user);
    }

    @Override
    // public User followUser(Long userId, User user) throws UserException {
    public User followUser(String userId, User user) throws UserException {
        User followToUser=findUserById(userId);
        String reqUserId=user.getId();

        if(user.getFollowing()!=null&&followToUser.getFollowers()!=null) {

            
            // boolean x1=UserUtil.isFollowedByReqUser(user, followToUser);
            // boolean x2=UserUtil.followerContainsReqUser(followToUser, user);
            // if(!x1||!x2) {
            //     user.getFollowing().add(followToUser);
            //     followToUser.getFollowers().add(user);
            // }else {
            //     userRepo.deleteFromFollowing(user.getId(), userId);
            //     userRepo.deleteFromFollower(userId, user.getId());
            // }

            if(user.getFollowing().contains(userId)&&followToUser.getFollowers().contains(reqUserId)) {
                user.getFollowing().remove(userId);
                followToUser.getFollowers().remove(reqUserId);
            }else {
                user.getFollowing().add(userId);
                followToUser.getFollowers().add(reqUserId);
            }

        }

        // if(user.getFollowing().contains(followToUser)&& followToUser.getFollowers().contains(user)) {
        //     user.getFollowing().remove(followToUser);
        //     followToUser.getFollowers().remove(user);
        // }

        userRepo.save(user);
        userRepo.save(followToUser);

        return followToUser;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepo.searchUser(query);

        // return userRepo.findByFullNameOrEmailIgnoreCase(query, query);
    }
    
}
