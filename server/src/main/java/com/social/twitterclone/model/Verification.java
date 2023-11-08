package com.social.twitterclone.model;

import java.time.LocalDateTime;

// import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
public class Verification {
    private boolean status=false;

    private LocalDateTime startedAt;
    private LocalDateTime endsAt;
    private String planType;

}
