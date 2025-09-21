package com.studentmanagementsystem.controller.authController;

import com.studentmanagementsystem.config.jwtconfig.CustomUserDetailsService;
import com.studentmanagementsystem.config.jwtconfig.JwtUtil;
import com.studentmanagementsystem.model.auth.Role;
import com.studentmanagementsystem.model.auth.User;
import com.studentmanagementsystem.repository.authService.RoleRepository;
import com.studentmanagementsystem.repository.authService.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomUserDetailsService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req, HttpServletResponse response) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(
                    req.get("username"), req.get("password")));
            UserDetails user = userService.loadUserByUsername(req.get("username"));

            User ForUserId = userRepository.findByUsername(req.get("username"))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            String token = jwtUtil.generateToken(user, ForUserId.getUserId());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> req) {
        try {

            // Username already generated
            if (userRepository.findByUserId(req.get("userid")).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Credentials already generated for " + req.get("userid"));
            }

            // Check if username already exists
            if (userRepository.findByUsername(req.get("username")).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
            }

            // Encrypt password using BCrypt
            String hashedPassword = passwordEncoder.encode(req.get("password"));

            // Create new user
            User user = new User();
            user.setUserId(req.get("userid"));
            user.setUsername(req.get("username"));
            user.setPassword(hashedPassword);

            // Assign default role (e.g., "ROLE_USER")
            Role role = roleRepository.findByName(req.get("user_role"))
                    .orElseThrow(() -> new RuntimeException("Default role not found"));
            user.setRoles(List.of(role));

            // Save user
            userRepository.save(user);

            UserDetails reguser = userService.loadUserByUsername(req.get("username"));
            String token = jwtUtil.generateToken(reguser, user.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }

    @PostMapping("/changepassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> req) {
        try {
            // Get the logged-in user
            User user = userRepository.findByUsername(req.get("username"))
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if the old password matches
            if (!passwordEncoder.matches(req.get("oldPassword"), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect old password");
            }

            // Encrypt the new password
            String hashedNewPassword = passwordEncoder.encode(req.get("newPassword"));

            // Update the password
            user.setPassword(hashedNewPassword);
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("Password updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error changing password");
        }
    }

    @PostMapping("/unblock")
    public ResponseEntity<?> unBlockUser(@RequestBody Map<String, String> req) {
        try {
            // Get the logged-in user
            User user = userRepository.findByUserId(req.get("userid"))
                    .orElseThrow(() -> new RuntimeException("User not found"));


            // Update the password
            user.setAcc_blockstatus(Boolean.parseBoolean(req.get("acc_blockstatus")));
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("User unblock successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error changing password");
        }
    }

    @PostMapping("/temppassword")
    public ResponseEntity<?> tempPasswordChange(@RequestBody Map<String, String> req) {
        try {
            // Get the logged-in user
            User user = userRepository.findByUserId(req.get("userid"))
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Encrypt the new password
            String hashedNewPassword = passwordEncoder.encode(req.get("tempPassword"));

            // Update the password
            user.setPassword(hashedNewPassword);
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("Temp password generated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error changing password");
        }
    }

    @GetMapping("/validaterole")
    public ResponseEntity<?> roleChecker(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            System.out.println("From validator token: " + authHeader);
            String role = null;
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                role = jwtUtil.extractRoles(token);
                return ResponseEntity.ok(Map.of("role", role));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ROLE_INVALID");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in role");
        }
    }
}
