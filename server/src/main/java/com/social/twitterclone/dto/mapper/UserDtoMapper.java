package com.social.twitterclone.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.social.twitterclone.dto.UserDto;
import com.social.twitterclone.model.User;

public class UserDtoMapper {
    public static UserDto toUserDto(User user) {
        UserDto userDto=new UserDto();
        
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setImage(user.getImage());
        userDto.setBackgroundImage(user.getBackgroundImage());
        userDto.setMobile(user.getMobile());
        userDto.setBio(user.getBio());
        userDto.setWebsite(user.getWebsite());
        userDto.setLocation(user.getLocation());
        userDto.setBirthDate(user.getBirthDate());
        // userDto.setFollowers(toDtos(user.getFollowers()));
        // userDto.setFollowing(toDtos(user.getFollowing()));

        userDto.setFollowers(user.getFollowers());
        userDto.setFollowing(user.getFollowing());


        userDto.setLogin_with_google(user.isLogin_with_google());
        // userDto.setVerified(false);

        return userDto;
    }

    public static List<UserDto> toDtos(List<User> followers) {
        List<UserDto>userdtos=new ArrayList<>();

        for(User user:followers) {
            UserDto userDto=new UserDto();
            userDto.setId(user.getId());
            userDto.setFullName(user.getFullName());
            userDto.setEmail(user.getEmail());
            userDto.setImage(user.getImage());

            userdtos.add(userDto);
        }

        return userdtos;
    }
}
