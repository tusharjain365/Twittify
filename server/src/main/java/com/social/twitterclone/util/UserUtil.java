package com.social.twitterclone.util;

import com.social.twitterclone.model.User;

public class UserUtil {
    public static final boolean isReqUser(String reqUserId, String userId) {
        return reqUserId==userId;
    }

    public static final boolean isFollowedByReqUser(User reqUser, User user) {
        // return reqUser.getFollowing().contains(user);
        // return false;

        String userId=user.getId();

        return reqUser.getFollowing().contains(userId);
    }
}
