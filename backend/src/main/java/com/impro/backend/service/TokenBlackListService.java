package com.impro.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TokenBlackListService {

    private final StringRedisTemplate redisTemplate;

    @Value("${application.security.jwt.expiration}")
    private long timeToLive;
    public void blacklistToken(String token, long expirationTimeInMillis){
        if(timeToLive > 0){
            redisTemplate.opsForValue().set(token, "blacklisted", expirationTimeInMillis, TimeUnit.MILLISECONDS);
        }
    }

    public boolean isTokenBlacklisted(String token){
        
        return Boolean.TRUE.equals(redisTemplate.hasKey(token));
    }
}
