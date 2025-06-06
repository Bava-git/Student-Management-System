package com.studentmanagementsystem.config;

import com.studentmanagementsystem.config.jwtconfig.CustomUserDetailsService;
import com.studentmanagementsystem.config.jwtconfig.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    // Security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user/register", "/user/unblock", "/user/temppassword").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/student/search/**", "/teacher/search/**", "/school/examschedule")
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT")
                        .requestMatchers("/user/changepassword").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT")
                        .requestMatchers("/teacher/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers("/student/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers("/studentreport/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT")
                        .requestMatchers("/school/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_TEACHER")
                        .requestMatchers("/user/login").permitAll()
                        .anyRequest().authenticated()

                )
                .sessionManagement(section -> section.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
