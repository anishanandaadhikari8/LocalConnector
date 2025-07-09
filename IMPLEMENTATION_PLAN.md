# NeighborConnect Backend Implementation Plan
## Phase 1: Core Services Implementation

---

## 🎯 Phase 1 Objectives
- Set up the foundational Java microservices architecture
- Implement User Service with authentication
- Implement Connector Service for community management
- Set up API Gateway and service discovery
- Establish database infrastructure

---

## 📋 Implementation Timeline: Weeks 1-4

### Week 1: Infrastructure Setup
**Days 1-2: Development Environment**
- Set up Java 17, Maven, Docker, Kubernetes
- Configure IDE (IntelliJ IDEA/VS Code)
- Set up Git repository structure
- Create Docker Compose for local development

**Days 3-4: Database Setup**
- Install and configure PostgreSQL
- Create database schema
- Set up Redis for caching
- Configure database connections

**Days 5-7: Base Project Structure**
- Create Spring Boot parent project
- Set up common dependencies and configurations
- Create shared libraries (DTOs, utilities)
- Set up API Gateway foundation

### Week 2: User Service Implementation
**Days 1-3: Core User Management**
- User registration and login
- JWT token generation and validation
- Password encryption and validation
- User profile management

**Days 4-5: Authentication & Authorization**
- Spring Security configuration
- Role-based access control
- API endpoint protection
- Session management

**Days 6-7: User Service Testing**
- Unit tests for all components
- Integration tests
- API documentation (Swagger)
- Performance testing

### Week 3: Connector Service Implementation
**Days 1-3: Connector Management**
- Connector creation and CRUD operations
- Member management (join/leave)
- Connector settings and configuration
- Connector discovery and search

**Days 4-5: Advanced Features**
- Connector permissions and roles
- Connector analytics
- Connector recommendations
- Connector moderation tools

**Days 6-7: Connector Service Testing**
- Unit and integration tests
- API documentation
- Performance optimization
- Security testing

### Week 4: Integration & Deployment
**Days 1-3: Service Integration**
- API Gateway configuration
- Service discovery (Eureka)
- Load balancing setup
- Inter-service communication

**Days 4-5: Monitoring & Observability**
- Logging configuration (ELK Stack)
- Metrics collection (Prometheus)
- Health checks and monitoring
- Error handling and recovery

**Days 6-7: Deployment & Testing**
- Docker containerization
- Kubernetes deployment
- End-to-end testing
- Performance benchmarking

---

## 🛠️ Technology Stack

### Backend Framework
- **Spring Boot 3.x** - Main framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database access
- **Spring Cloud** - Microservices features
- **Spring WebFlux** - Reactive programming (for chat)

### Database & Caching
- **PostgreSQL 15** - Primary database
- **Redis 7** - Caching and sessions
- **Flyway** - Database migrations
- **Hibernate** - ORM

### API & Communication
- **Spring Cloud Gateway** - API Gateway
- **Eureka** - Service discovery
- **gRPC** - Java-Python communication
- **RabbitMQ** - Message queuing

### Security
- **JWT** - Token-based authentication
- **BCrypt** - Password hashing
- **Spring Security** - Security framework
- **CORS** - Cross-origin resource sharing

### Testing
- **JUnit 5** - Unit testing
- **TestContainers** - Integration testing
- **Mockito** - Mocking framework
- **Postman** - API testing

### Monitoring
- **Prometheus** - Metrics collection
- **Grafana** - Visualization
- **ELK Stack** - Logging
- **Actuator** - Health checks

---

## 📁 Project Structure

```
neighborconnect-backend/
├── api-gateway/                    # API Gateway Service
├── user-service/                   # User Management Service
├── connector-service/              # Connector Management Service
├── shared-lib/                     # Shared DTOs and utilities
├── docker-compose.yml             # Local development setup
├── kubernetes/                     # K8s deployment configs
├── scripts/                        # Deployment scripts
└── docs/                          # Documentation
```

### User Service Structure
```
user-service/
├── src/main/java/com/neighborconnect/userservice/
│   ├── UserServiceApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── DatabaseConfig.java
│   │   └── RedisConfig.java
│   ├── controller/
│   │   ├── UserController.java
│   │   ├── AuthController.java
│   │   └── ProfileController.java
│   ├── service/
│   │   ├── UserService.java
│   │   ├── AuthService.java
│   │   ├── EmailService.java
│   │   └── ValidationService.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   └── UserSessionRepository.java
│   ├── model/
│   │   ├── User.java
│   │   ├── UserProfile.java
│   │   └── UserSession.java
│   ├── dto/
│   │   ├── UserRegistrationDto.java
│   │   ├── UserLoginDto.java
│   │   ├── UserProfileDto.java
│   │   └── ApiResponse.java
│   ├── exception/
│   │   ├── UserNotFoundException.java
│   │   ├── InvalidCredentialsException.java
│   │   └── GlobalExceptionHandler.java
│   └── util/
│       ├── JwtUtil.java
│       ├── PasswordUtil.java
│       └── ValidationUtil.java
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── db/migration/
├── src/test/java/
└── pom.xml
```

### Connector Service Structure
```
connector-service/
├── src/main/java/com/neighborconnect/connectorservice/
│   ├── ConnectorServiceApplication.java
│   ├── config/
│   │   ├── DatabaseConfig.java
│   │   └── RedisConfig.java
│   ├── controller/
│   │   ├── ConnectorController.java
│   │   ├── MemberController.java
│   │   └── SearchController.java
│   ├── service/
│   │   ├── ConnectorService.java
│   │   ├── MemberService.java
│   │   ├── SearchService.java
│   │   └── NotificationService.java
│   ├── repository/
│   │   ├── ConnectorRepository.java
│   │   ├── ConnectorMemberRepository.java
│   │   └── ConnectorSettingsRepository.java
│   ├── model/
│   │   ├── Connector.java
│   │   ├── ConnectorMember.java
│   │   └── ConnectorSettings.java
│   ├── dto/
│   │   ├── ConnectorDto.java
│   │   ├── CreateConnectorDto.java
│   │   ├── MemberDto.java
│   │   └── SearchDto.java
│   ├── exception/
│   │   ├── ConnectorNotFoundException.java
│   │   ├── MemberAlreadyExistsException.java
│   │   └── GlobalExceptionHandler.java
│   └── event/
│       ├── ConnectorCreatedEvent.java
│       ├── MemberJoinedEvent.java
│       └── EventPublisher.java
├── src/main/resources/
│   ├── application.yml
│   └── db/migration/
├── src/test/java/
└── pom.xml
```

---

## 🔧 Implementation Details

### 1. User Service Implementation

#### User Entity
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String passwordHash;
    
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(name = "avatar_url")
    private String avatarUrl;
    
    private String neighborhood;
    private String city;
    private String state;
    private String country;
    
    @Column(name = "postal_code")
    private String postalCode;
    
    private String phone;
    
    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean verified = false;
    
    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer reputation = 0;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    
    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive = true;
    
    // Constructors, getters, setters
}
```

#### User Controller
```java
@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {
    
    private final UserService userService;
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> registerUser(
            @Valid @RequestBody UserRegistrationDto registrationDto) {
        UserDto user = userService.registerUser(registrationDto);
        return ResponseEntity.ok(ApiResponse.success(user, "User registered successfully"));
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(
            @Valid @RequestBody UserLoginDto loginDto) {
        LoginResponseDto response = authService.login(loginDto);
        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }
    
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserProfileDto>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        UserProfileDto profile = userService.getUserProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }
    
    @PutMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UpdateProfileDto updateDto) {
        UserProfileDto profile = userService.updateProfile(userDetails.getUsername(), updateDto);
        return ResponseEntity.ok(ApiResponse.success(profile, "Profile updated successfully"));
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<UserDto>>> searchUsers(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<UserDto> users = userService.searchUsers(query, page, size);
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}
```

#### User Service
```java
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final RedisTemplate<String, Object> redisTemplate;
    
    public UserDto registerUser(UserRegistrationDto registrationDto) {
        // Validate email uniqueness
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }
        
        // Validate username uniqueness
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new UsernameAlreadyExistsException("Username already taken");
        }
        
        // Create user entity
        User user = new User();
        user.setEmail(registrationDto.getEmail());
        user.setUsername(registrationDto.getUsername());
        user.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        User savedUser = userRepository.save(user);
        
        // Send verification email
        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getId());
        
        return UserMapper.toDto(savedUser);
    }
    
    public UserProfileDto getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        return UserMapper.toProfileDto(user);
    }
    
    public UserProfileDto updateProfile(String username, UpdateProfileDto updateDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        // Update fields
        if (updateDto.getFirstName() != null) {
            user.setFirstName(updateDto.getFirstName());
        }
        if (updateDto.getLastName() != null) {
            user.setLastName(updateDto.getLastName());
        }
        if (updateDto.getNeighborhood() != null) {
            user.setNeighborhood(updateDto.getNeighborhood());
        }
        if (updateDto.getCity() != null) {
            user.setCity(updateDto.getCity());
        }
        if (updateDto.getPhone() != null) {
            user.setPhone(updateDto.getPhone());
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        User updatedUser = userRepository.save(user);
        
        return UserMapper.toProfileDto(updatedUser);
    }
    
    public Page<UserDto> searchUsers(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("username"));
        Page<User> users = userRepository.findByUsernameContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                query, query, query, pageable);
        
        return users.map(UserMapper::toDto);
    }
}
```

### 2. Connector Service Implementation

#### Connector Entity
```java
@Entity
@Table(name = "connectors")
public class Connector {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private String category;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "created_by", nullable = false)
    private UUID createdBy;
    
    @Column(name = "is_public", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isPublic = true;
    
    @Column(name = "member_count", columnDefinition = "INTEGER DEFAULT 0")
    private Integer memberCount = 0;
    
    @Column(name = "post_count", columnDefinition = "INTEGER DEFAULT 0")
    private Integer postCount = 0;
    
    @Column(columnDefinition = "TEXT")
    private String rules;
    
    @Column(columnDefinition = "JSONB")
    private String settings;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive = true;
    
    // Constructors, getters, setters
}
```

#### Connector Controller
```java
@RestController
@RequestMapping("/api/v1/connectors")
@Validated
public class ConnectorController {
    
    private final ConnectorService connectorService;
    private final MemberService memberService;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<ConnectorDto>> createConnector(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateConnectorDto createDto) {
        ConnectorDto connector = connectorService.createConnector(userDetails.getUsername(), createDto);
        return ResponseEntity.ok(ApiResponse.success(connector, "Connector created successfully"));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ConnectorDto>>> getConnectors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        Page<ConnectorDto> connectors = connectorService.getConnectors(page, size, category, search);
        return ResponseEntity.ok(ApiResponse.success(connectors));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ConnectorDto>> getConnector(@PathVariable UUID id) {
        ConnectorDto connector = connectorService.getConnector(id);
        return ResponseEntity.ok(ApiResponse.success(connector));
    }
    
    @PostMapping("/{id}/join")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<Void>> joinConnector(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        memberService.joinConnector(userDetails.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success(null, "Joined connector successfully"));
    }
    
    @DeleteMapping("/{id}/leave")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<Void>> leaveConnector(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id) {
        memberService.leaveConnector(userDetails.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success(null, "Left connector successfully"));
    }
    
    @GetMapping("/{id}/members")
    public ResponseEntity<ApiResponse<Page<MemberDto>>> getConnectorMembers(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<MemberDto> members = memberService.getConnectorMembers(id, page, size);
        return ResponseEntity.ok(ApiResponse.success(members));
    }
}
```

### 3. API Gateway Configuration

#### Gateway Routes
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/v1/users/**
          filters:
            - name: CircuitBreaker
              args:
                name: user-service-circuit-breaker
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
        
        - id: connector-service
          uri: lb://connector-service
          predicates:
            - Path=/api/v1/connectors/**
          filters:
            - name: CircuitBreaker
              args:
                name: connector-service-circuit-breaker
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
        
        - id: auth-service
          uri: lb://user-service
          predicates:
            - Path=/api/v1/auth/**
          filters:
            - name: CircuitBreaker
              args:
                name: auth-service-circuit-breaker
```

#### Security Configuration
```java
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .csrf().disable()
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .authorizeExchange()
                .pathMatchers("/api/v1/users/register", "/api/v1/users/login").permitAll()
                .pathMatchers("/api/v1/connectors").permitAll()
                .pathMatchers("/api/v1/connectors/{id}").permitAll()
                .anyExchange().authenticated()
            .and()
            .addFilterAt(jwtAuthenticationFilter(), SecurityWebFiltersOrder.AUTHENTICATION);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

---

## 🧪 Testing Strategy

### Unit Tests
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private EmailService emailService;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void registerUser_Success() {
        // Given
        UserRegistrationDto dto = new UserRegistrationDto();
        dto.setEmail("test@example.com");
        dto.setUsername("testuser");
        dto.setPassword("password123");
        dto.setFirstName("John");
        dto.setLastName("Doe");
        
        when(userRepository.existsByEmail(dto.getEmail())).thenReturn(false);
        when(userRepository.existsByUsername(dto.getUsername())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        
        // When
        UserDto result = userService.registerUser(dto);
        
        // Then
        assertNotNull(result);
        assertEquals(dto.getEmail(), result.getEmail());
        assertEquals(dto.getUsername(), result.getUsername());
        verify(emailService).sendVerificationEmail(dto.getEmail(), any(UUID.class));
    }
    
    @Test
    void registerUser_EmailAlreadyExists_ThrowsException() {
        // Given
        UserRegistrationDto dto = new UserRegistrationDto();
        dto.setEmail("existing@example.com");
        
        when(userRepository.existsByEmail(dto.getEmail())).thenReturn(true);
        
        // When & Then
        assertThrows(EmailAlreadyExistsException.class, () -> userService.registerUser(dto));
    }
}
```

### Integration Tests
```java
@SpringBootTest
@Testcontainers
class UserControllerIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
    
    @Container
    static GenericContainer<?> redis = new GenericContainer<>("redis:7")
            .withExposedPorts(6379);
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void registerUser_ValidData_ReturnsSuccess() {
        // Given
        UserRegistrationDto dto = new UserRegistrationDto();
        dto.setEmail("test@example.com");
        dto.setUsername("testuser");
        dto.setPassword("password123");
        dto.setFirstName("John");
        dto.setLastName("Doe");
        
        // When
        ResponseEntity<ApiResponse<UserDto>> response = restTemplate.postForEntity(
                "/api/v1/users/register",
                dto,
                new ParameterizedTypeReference<ApiResponse<UserDto>>() {}
        );
        
        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
    }
}
```

---

## 🚀 Deployment Configuration

### Docker Compose (Local Development)
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: neighborconnect
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: dev
    depends_on:
      - postgres
      - redis

  user-service:
    build: ./user-service
    ports:
      - "8081:8081"
    environment:
      SPRING_PROFILES_ACTIVE: dev
    depends_on:
      - postgres
      - redis

  connector-service:
    build: ./connector-service
    ports:
      - "8082:8082"
    environment:
      SPRING_PROFILES_ACTIVE: dev
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: neighborconnect/user-service:latest
        ports:
        - containerPort: 8081
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db_host
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8081
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8081
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 📊 Monitoring & Observability

### Application Metrics
```java
@Component
public class UserMetrics {
    
    private final MeterRegistry meterRegistry;
    private final Counter userRegistrationCounter;
    private final Timer loginTimer;
    
    public UserMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.userRegistrationCounter = Counter.builder("user.registrations")
                .description("Number of user registrations")
                .register(meterRegistry);
        this.loginTimer = Timer.builder("user.login.duration")
                .description("Time taken for user login")
                .register(meterRegistry);
    }
    
    public void incrementUserRegistration() {
        userRegistrationCounter.increment();
    }
    
    public Timer.Sample startLoginTimer() {
        return Timer.start(meterRegistry);
    }
}
```

### Health Checks
```java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    
    private final DataSource dataSource;
    
    @Override
    public Health health() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(1000)) {
                return Health.up()
                        .withDetail("database", "PostgreSQL")
                        .withDetail("status", "Connected")
                        .build();
            } else {
                return Health.down()
                        .withDetail("database", "PostgreSQL")
                        .withDetail("status", "Connection failed")
                        .build();
            }
        } catch (SQLException e) {
            return Health.down()
                    .withDetail("database", "PostgreSQL")
                    .withDetail("error", e.getMessage())
                    .build();
        }
    }
}
```

---

## 🔄 Next Steps After Phase 1

1. **Performance Testing**: Load testing with realistic user scenarios
2. **Security Audit**: Penetration testing and vulnerability assessment
3. **Documentation**: API documentation and developer guides
4. **Monitoring Setup**: Production monitoring and alerting
5. **Backup Strategy**: Database backup and disaster recovery
6. **CI/CD Pipeline**: Automated testing and deployment

This implementation plan provides a solid foundation for the NeighborConnect backend, with clear milestones, comprehensive testing, and production-ready deployment configurations. 