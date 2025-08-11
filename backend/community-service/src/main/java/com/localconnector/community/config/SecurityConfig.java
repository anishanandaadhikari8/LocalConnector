package com.localconnector.community.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.auth.dev-enabled:true}")
    private boolean devAuthEnabled;

    @Autowired
    private com.localconnector.community.security.JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**", "/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**", "/api/v1/auth/dev-mint").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/health").permitAll()
                .anyRequest().authenticated()
        );

        http.addFilterBefore(jwtAuthFilter, AbstractPreAuthenticatedProcessingFilter.class);
        if (devAuthEnabled) {
            http.addFilterAfter(new DevAuthFilter(), com.localconnector.community.security.JwtAuthFilter.class);
        }

        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    static class DevAuthFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                String userId = request.getHeader("X-User-Id");
                String role = request.getHeader("X-User-Role");
                if (userId == null || userId.isBlank()) {
                    userId = "devUser";
                }
                if (role == null || role.isBlank()) {
                    role = "RESIDENT";
                }
                List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
                UserDetails principal = User.withUsername(userId).password("").authorities(authorities).build();
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(principal, null, authorities));
            }
            filterChain.doFilter(request, response);
        }
    }
}