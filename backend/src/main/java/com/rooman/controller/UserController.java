package com.rooman.controller;

import com.rooman.model.User;
import com.rooman.model.UserResponse;
import com.rooman.security.JwtAuthenticationFilter;
import com.rooman.security.JwtUtil;
import com.rooman.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Boolean>> login(
            @RequestBody Map<String, String> credentials,
            HttpServletResponse response) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false));
        }

        boolean success = userService.login(email, password);
        if (success) {
            String token = jwtUtil.generateToken(email);
            JwtAuthenticationFilter.addTokenCookie(response, token);
            return ResponseEntity.ok(Map.of("success", true));
        }

        return ResponseEntity.ok(Map.of("success", false));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        JwtAuthenticationFilter.removeTokenCookie(response);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> currentUser() {
        var authentication = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(401).build();
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof User user) {
            return ResponseEntity.ok(new UserResponse(user.getId(), user.getEmail()));
        }
        return ResponseEntity.status(401).build();
    }
}
