package com.social.twitterclone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.twitterclone.config.JwtProvider;
import com.social.twitterclone.exception.UserException;
import com.social.twitterclone.model.User;
import com.social.twitterclone.model.Verification;
import com.social.twitterclone.repository.UserRepository;
import com.social.twitterclone.response.AuthResponse;
import com.social.twitterclone.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {

        String email=user.getEmail();
        String password=user.getPassword();
        String fullName=user.getFullName();
        String birthDate=user.getBirthDate();

        User isEmailExist=userRepo.findByEmail(email);

        if(isEmailExist!=null) {
            throw new UserException("user already present with this account");
        }

        User createdUser=new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFullName(fullName);
        createdUser.setBirthDate(birthDate);
        createdUser.setVerification(new Verification());

        User saveUser=userRepo.save(createdUser);

        Authentication authentication=new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse res=new AuthResponse(token,true);

        return new ResponseEntity<AuthResponse>(res,HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse>signin(@RequestBody User user) {
        String email=user.getEmail();
        String password=user.getPassword();

        Authentication authentication=authenticate(email,password);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse res=new AuthResponse(token,true);

        return new ResponseEntity<AuthResponse>(res,HttpStatus.ACCEPTED);
    }

    public Authentication authenticate(String email, String password) {
        
        UserDetails userDetails=userDetailsService.loadUserByUsername(email);

        if(userDetails==null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
