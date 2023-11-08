package com.social.twitterclone.repository;

import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.social.twitterclone.model.User;

// public interface UserRepository extends JpaRepository<User,Long>{
public interface UserRepository extends MongoRepository<User,String>{
    
    public User findByEmail(String email);

    // @Query("select distinct u from User u where u.fullName like%:query% or u.email like%:query%")
    // @Query("select distinct u from User u where u.fullName like CONCAT('%',:query,'%') or u.email like CONCAT('%',:query,'%')")
    // public List<User> searchUser(@Param("query") String query);

    
    // @Query("{'name' : {'$regex' : ?0}}")
    // @Query("$or:[{'fullName':{$regex: ^?0, '$options':'i'}},{'email':{$regex: ^?0, '$options':'i'}}]")
    @Query("{'fullName' : {'$regex' : '^?0', '$options' : 'i'}}")
    public List<User> searchUser(String query);

    public List<User> findByFullNameOrEmailIgnoreCase(String name, String email);

    // public User findById(Long userId);
}
