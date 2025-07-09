package com.neighborconnect.userservice.service;

import com.neighborconnect.userservice.model.User;
import com.neighborconnect.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Profile({"dev", "test"})
public class DataInitializationService implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            log.info("Initializing database with mock users...");
            createMockUsers();
            log.info("Mock users created successfully!");
        } else {
            log.info("Database already contains users, skipping initialization");
        }
    }
    
    private void createMockUsers() {
        List<User> mockUsers = Arrays.asList(
                createUser(
                        "john.doe@example.com",
                        "johndoe",
                        "John",
                        "Doe",
                        "Downtown",
                        "Seattle",
                        "WA",
                        "98101",
                        true,
                        85
                ),
                createUser(
                        "jane.smith@example.com",
                        "janesmith",
                        "Jane",
                        "Smith",
                        "Capitol Hill",
                        "Seattle",
                        "WA",
                        "98102",
                        true,
                        92
                ),
                createUser(
                        "mike.johnson@example.com",
                        "mikejohnson",
                        "Mike",
                        "Johnson",
                        "Belltown",
                        "Seattle",
                        "WA",
                        "98121",
                        true,
                        78
                ),
                createUser(
                        "sarah.wilson@example.com",
                        "sarahwilson",
                        "Sarah",
                        "Wilson",
                        "Queen Anne",
                        "Seattle",
                        "WA",
                        "98109",
                        false,
                        45
                ),
                createUser(
                        "david.brown@example.com",
                        "davidbrown",
                        "David",
                        "Brown",
                        "Fremont",
                        "Seattle",
                        "WA",
                        "98103",
                        true,
                        67
                ),
                createUser(
                        "lisa.davis@example.com",
                        "lisadavis",
                        "Lisa",
                        "Davis",
                        "Ballard",
                        "Seattle",
                        "WA",
                        "98107",
                        true,
                        89
                ),
                createUser(
                        "tom.anderson@example.com",
                        "tomanderson",
                        "Tom",
                        "Anderson",
                        "Georgetown",
                        "Seattle",
                        "WA",
                        "98108",
                        false,
                        34
                ),
                createUser(
                        "emma.garcia@example.com",
                        "emmagarcia",
                        "Emma",
                        "Garcia",
                        "Wallingford",
                        "Seattle",
                        "WA",
                        "98103",
                        true,
                        71
                ),
                createUser(
                        "alex.rodriguez@example.com",
                        "alexrodriguez",
                        "Alex",
                        "Rodriguez",
                        "University District",
                        "Seattle",
                        "WA",
                        "98105",
                        true,
                        55
                ),
                createUser(
                        "admin@neighborconnect.com",
                        "admin",
                        "Admin",
                        "User",
                        "Downtown",
                        "Seattle",
                        "WA",
                        "98101",
                        true,
                        100
                )
        );
        
        userRepository.saveAll(mockUsers);
        log.info("Created {} mock users", mockUsers.size());
    }
    
    private User createUser(String email, String username, String firstName, String lastName,
                           String neighborhood, String city, String state, String postalCode,
                           boolean verified, int reputation) {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPasswordHash(passwordEncoder.encode("password123")); // Default password for all mock users
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setNeighborhood(neighborhood);
        user.setCity(city);
        user.setState(state);
        user.setCountry("USA");
        user.setPostalCode(postalCode);
        user.setVerified(verified);
        user.setEmailVerified(true);
        user.setReputation(reputation);
        user.setIsActive(true);
        user.setLastLogin(LocalDateTime.now().minusDays((long) (Math.random() * 30)));
        
        // Set avatar URLs
        user.setAvatarUrl(generateAvatarUrl(firstName, lastName));
        
        return user;
    }
    
    private String generateAvatarUrl(String firstName, String lastName) {
        // Using a service like UI Avatars or similar for consistent avatars
        return String.format("https://ui-avatars.com/api/?name=%s+%s&size=200&background=random", 
                firstName, lastName);
    }
}