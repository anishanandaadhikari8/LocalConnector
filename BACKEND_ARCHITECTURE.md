# NeighborConnect Backend Architecture
## Java + Python Hybrid Architecture

---

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React Native Web)              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ HTTP/WebSocket
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                    API GATEWAY (Spring Cloud Gateway)           │
│  • Authentication & Authorization                               │
│  • Rate Limiting                                                │
│  • Request Routing                                              │
│  • Load Balancing                                               │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ Internal Communication
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                    JAVA MICROSERVICES                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   USER      │  │ CONNECTOR   │  │   POST      │             │
│  │  SERVICE    │  │  SERVICE    │  │  SERVICE    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   EVENT     │  │ MARKETPLACE │  │   CHAT      │             │
│  │  SERVICE    │  │  SERVICE    │  │  SERVICE    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  NOTIFICATION│  │   REVIEW    │  │   MEDIA     │             │
│  │   SERVICE   │  │  SERVICE    │  │  SERVICE    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ gRPC/REST API
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                    PYTHON AI/ML SERVICES                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ RECOMMENDATION│  │  CONTENT    │  │   IMAGE     │             │
│  │   ENGINE    │  │  ANALYSIS    │  │  PROCESSING  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  COMMUNITY  │  │  SENTIMENT   │  │   VIDEO     │             │
│  │  MATCHING   │  │  ANALYSIS    │  │  PROCESSING  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ Database Connections
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                        DATA LAYER                               │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  POSTGRESQL │  │   REDIS     │  │   MONGODB   │             │
│  │ (Primary DB)│  │ (Cache/Queue)│  │ (Media Meta)│             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   ELASTIC   │  │   MINIO     │  │   RABBITMQ  │             │
│  │   SEARCH    │  │ (File Store)│  │ (Message Q) │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema Design

### PostgreSQL (Primary Database)

#### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    neighborhood VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    phone VARCHAR(20),
    verified BOOLEAN DEFAULT FALSE,
    reputation INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Connectors Table
```sql
CREATE TABLE connectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    created_by UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT TRUE,
    member_count INTEGER DEFAULT 0,
    post_count INTEGER DEFAULT 0,
    rules TEXT,
    settings JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Connector_Members Table
```sql
CREATE TABLE connector_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connector_id UUID REFERENCES connectors(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- member, moderator, admin
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(connector_id, user_id)
);
```

#### Posts Table
```sql
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connector_id UUID REFERENCES connectors(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    title VARCHAR(200),
    image_url VARCHAR(500),
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Comments Table
```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_id UUID REFERENCES comments(id),
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Events Table
```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connector_id UUID REFERENCES connectors(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(500),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    max_attendees INTEGER,
    attendee_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Event_Attendees Table
```sql
CREATE TABLE event_attendees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'attending', -- attending, maybe, declined
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);
```

#### Marketplace_Items Table
```sql
CREATE TABLE marketplace_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connector_id UUID REFERENCES connectors(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    condition VARCHAR(50),
    images JSONB,
    status VARCHAR(20) DEFAULT 'available', -- available, sold, reserved
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Reviews Table
```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connector_id UUID REFERENCES connectors(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### MongoDB (Media Metadata)

#### Stories Collection
```javascript
{
  _id: ObjectId,
  connectorId: UUID,
  authorId: UUID,
  title: String,
  content: String,
  mediaUrl: String,
  thumbnailUrl: String,
  views: Number,
  duration: Number, // hours
  createdAt: Date,
  expiresAt: Date,
  isActive: Boolean
}
```

#### Reels Collection
```javascript
{
  _id: ObjectId,
  connectorId: UUID,
  authorId: UUID,
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  duration: String, // "0:45"
  views: Number,
  likes: Number,
  createdAt: Date,
  isActive: Boolean
}
```

### Redis (Cache & Real-time)

#### User Sessions
```
user:session:{userId} -> {sessionData, lastActivity}
```

#### Connector Data
```
connector:{connectorId}:members -> Set of member IDs
connector:{connectorId}:posts -> List of recent post IDs
connector:{connectorId}:events -> List of upcoming event IDs
```

#### Real-time Notifications
```
user:{userId}:notifications -> List of unread notifications
user:{userId}:online -> Boolean (for chat presence)
```

---

## 🔧 Java Microservices Architecture

### 1. User Service
**Port:** 8081
**Responsibilities:**
- User registration, authentication, profile management
- JWT token generation and validation
- User search and discovery
- Reputation system

**Key Endpoints:**
```
POST   /api/v1/users/register
POST   /api/v1/users/login
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
GET    /api/v1/users/search
POST   /api/v1/users/verify-email
```

### 2. Connector Service
**Port:** 8082
**Responsibilities:**
- Connector creation and management
- Member management (join/leave)
- Connector configuration and settings
- Connector discovery and search

**Key Endpoints:**
```
POST   /api/v1/connectors
GET    /api/v1/connectors
GET    /api/v1/connectors/{id}
PUT    /api/v1/connectors/{id}
POST   /api/v1/connectors/{id}/join
DELETE /api/v1/connectors/{id}/leave
GET    /api/v1/connectors/search
```

### 3. Post Service
**Port:** 8083
**Responsibilities:**
- Post creation, editing, deletion
- Comment management
- Like/unlike functionality
- Post feed generation

**Key Endpoints:**
```
POST   /api/v1/posts
GET    /api/v1/posts/connector/{connectorId}
GET    /api/v1/posts/{id}
PUT    /api/v1/posts/{id}
DELETE /api/v1/posts/{id}
POST   /api/v1/posts/{id}/like
POST   /api/v1/posts/{id}/comments
```

### 4. Event Service
**Port:** 8084
**Responsibilities:**
- Event creation and management
- RSVP functionality
- Event discovery and search
- Event reminders

**Key Endpoints:**
```
POST   /api/v1/events
GET    /api/v1/events/connector/{connectorId}
GET    /api/v1/events/{id}
PUT    /api/v1/events/{id}
DELETE /api/v1/events/{id}
POST   /api/v1/events/{id}/rsvp
GET    /api/v1/events/{id}/attendees
```

### 5. Marketplace Service
**Port:** 8085
**Responsibilities:**
- Product listing management
- Buy/sell transactions
- Category management
- Search and filtering

**Key Endpoints:**
```
POST   /api/v1/marketplace/items
GET    /api/v1/marketplace/items
GET    /api/v1/marketplace/items/{id}
PUT    /api/v1/marketplace/items/{id}
DELETE /api/v1/marketplace/items/{id}
POST   /api/v1/marketplace/items/{id}/buy
GET    /api/v1/marketplace/categories
```

### 6. Chat Service
**Port:** 8086
**Responsibilities:**
- Direct messaging
- Group chat management
- Message history
- Real-time messaging (WebSocket)

**Key Endpoints:**
```
GET    /api/v1/chat/conversations
GET    /api/v1/chat/conversations/{id}/messages
POST   /api/v1/chat/conversations/{id}/messages
WS     /ws/chat/{conversationId}
```

### 7. Notification Service
**Port:** 8087
**Responsibilities:**
- Push notifications
- Email notifications
- In-app notifications
- Notification preferences

**Key Endpoints:**
```
GET    /api/v1/notifications
POST   /api/v1/notifications/mark-read
PUT    /api/v1/notifications/preferences
POST   /api/v1/notifications/send
```

### 8. Review Service
**Port:** 8088
**Responsibilities:**
- Review creation and management
- Rating system
- Review moderation
- Review analytics

**Key Endpoints:**
```
POST   /api/v1/reviews
GET    /api/v1/reviews/connector/{connectorId}
PUT    /api/v1/reviews/{id}
DELETE /api/v1/reviews/{id}
POST   /api/v1/reviews/{id}/helpful
GET    /api/v1/reviews/analytics/{connectorId}
```

### 9. Media Service
**Port:** 8089
**Responsibilities:**
- File upload and storage
- Image/video processing
- Media metadata management
- CDN integration

**Key Endpoints:**
```
POST   /api/v1/media/upload
GET    /api/v1/media/{id}
DELETE /api/v1/media/{id}
POST   /api/v1/media/process
```

---

## 🤖 Python AI/ML Services Architecture

### 1. Recommendation Engine
**Port:** 5001
**Responsibilities:**
- Content recommendation for posts
- Connector suggestions for users
- Event recommendations
- Marketplace item recommendations

**Technologies:**
- TensorFlow/PyTorch
- Collaborative filtering
- Content-based filtering
- Matrix factorization

**Key Endpoints:**
```
POST   /api/v1/recommendations/content
POST   /api/v1/recommendations/connectors
POST   /api/v1/recommendations/events
POST   /api/v1/recommendations/marketplace
```

### 2. Content Analysis Service
**Port:** 5002
**Responsibilities:**
- Sentiment analysis for posts/comments
- Content moderation
- Spam detection
- Topic modeling

**Technologies:**
- NLTK/SpaCy
- BERT/RoBERTa
- Text classification
- Named Entity Recognition

**Key Endpoints:**
```
POST   /api/v1/analysis/sentiment
POST   /api/v1/analysis/moderate
POST   /api/v1/analysis/topics
POST   /api/v1/analysis/spam-detection
```

### 3. Community Matching Service
**Port:** 5003
**Responsibilities:**
- User-to-user matching
- Community compatibility scoring
- Interest-based recommendations
- Geographic proximity analysis

**Technologies:**
- Scikit-learn
- Graph algorithms
- Clustering algorithms
- Geographic data processing

**Key Endpoints:**
```
POST   /api/v1/matching/users
POST   /api/v1/matching/communities
POST   /api/v1/matching/interests
POST   /api/v1/matching/proximity
```

### 4. Image Processing Service
**Port:** 5004
**Responsibilities:**
- Image optimization and compression
- Thumbnail generation
- Face detection and blurring
- Image classification

**Technologies:**
- OpenCV
- Pillow
- TensorFlow/Keras
- Image recognition models

**Key Endpoints:**
```
POST   /api/v1/images/optimize
POST   /api/v1/images/thumbnail
POST   /api/v1/images/detect-faces
POST   /api/v1/images/classify
```

### 5. Video Processing Service
**Port:** 5005
**Responsibilities:**
- Video compression and optimization
- Thumbnail extraction
- Video analysis
- Content moderation for videos

**Technologies:**
- FFmpeg
- OpenCV
- Video analysis models
- Content detection

**Key Endpoints:**
```
POST   /api/v1/videos/process
POST   /api/v1/videos/extract-thumbnail
POST   /api/v1/videos/analyze
POST   /api/v1/videos/moderate
```

---

## 🔄 Service Communication

### Java Services Communication
- **Synchronous:** REST APIs for direct service calls
- **Asynchronous:** RabbitMQ for event-driven communication
- **Service Discovery:** Eureka/Consul
- **Load Balancing:** Spring Cloud LoadBalancer

### Java-Python Communication
- **Synchronous:** gRPC for high-performance calls
- **Asynchronous:** RabbitMQ for event streaming
- **API Gateway:** Routes AI/ML requests to Python services

### Event-Driven Architecture
```java
// Example: Post created event
@EventListener
public void handlePostCreated(PostCreatedEvent event) {
    // Send to content analysis service
    contentAnalysisService.analyze(event.getPost());
    
    // Send to recommendation engine
    recommendationService.updateRecommendations(event.getUserId());
    
    // Send notifications
    notificationService.notifyConnectorMembers(event.getConnectorId());
}
```

---

## 🔐 Security Architecture

### Authentication & Authorization
- **JWT Tokens:** For API authentication
- **OAuth 2.0:** For third-party integrations
- **Role-Based Access Control (RBAC):** For connector permissions
- **API Rate Limiting:** Per user and per endpoint

### Data Security
- **Encryption at Rest:** Database encryption
- **Encryption in Transit:** TLS/SSL for all communications
- **Data Masking:** Sensitive data protection
- **Audit Logging:** All user actions logged

### Privacy Compliance
- **GDPR Compliance:** Data protection and user rights
- **Data Retention Policies:** Automatic data cleanup
- **User Consent Management:** Granular permission control

---

## 📊 Monitoring & Observability

### Logging
- **Centralized Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Structured Logging:** JSON format for easy parsing
- **Log Levels:** DEBUG, INFO, WARN, ERROR

### Metrics
- **Application Metrics:** Prometheus + Grafana
- **Business Metrics:** Custom dashboards
- **Performance Monitoring:** Response times, throughput

### Tracing
- **Distributed Tracing:** Jaeger/Zipkin
- **Request Correlation:** Track requests across services
- **Performance Analysis:** Identify bottlenecks

---

## 🚀 Deployment Architecture

### Container Orchestration
- **Kubernetes:** For container management
- **Docker:** For containerization
- **Helm:** For deployment charts

### Infrastructure
- **Cloud Provider:** AWS/Azure/GCP
- **Auto Scaling:** Based on load
- **Load Balancing:** Multiple instances
- **CDN:** For static assets and media

### CI/CD Pipeline
- **GitHub Actions:** Automated testing and deployment
- **Docker Registry:** Container image storage
- **Kubernetes Deployment:** Rolling updates
- **Blue-Green Deployment:** Zero-downtime updates

---

## 📈 Scalability Considerations

### Horizontal Scaling
- **Stateless Services:** Easy to scale horizontally
- **Database Sharding:** For large datasets
- **Caching Strategy:** Redis for frequently accessed data
- **CDN:** For global content delivery

### Performance Optimization
- **Database Indexing:** Optimized queries
- **Connection Pooling:** Efficient database connections
- **Caching Layers:** Multiple cache levels
- **Async Processing:** Non-blocking operations

---

## 🔄 Migration Strategy

### Phase 1: Core Services (Weeks 1-4)
1. User Service
2. Connector Service
3. Basic API Gateway
4. Database setup

### Phase 2: Content Services (Weeks 5-8)
1. Post Service
2. Event Service
3. Review Service
4. Media Service

### Phase 3: Advanced Features (Weeks 9-12)
1. Marketplace Service
2. Chat Service
3. Notification Service
4. Basic AI integration

### Phase 4: AI/ML Integration (Weeks 13-16)
1. Recommendation Engine
2. Content Analysis
3. Community Matching
4. Advanced AI features

---

## 💰 Cost Optimization

### Infrastructure Costs
- **Auto Scaling:** Pay only for what you use
- **Reserved Instances:** For predictable workloads
- **Spot Instances:** For non-critical workloads
- **Multi-region:** For global users

### Development Costs
- **Open Source:** Use existing solutions
- **Cloud Services:** Leverage managed services
- **Efficient Algorithms:** Optimize AI/ML models
- **Caching:** Reduce compute costs

---

This architecture provides a scalable, maintainable, and feature-rich backend for NeighborConnect, with clear separation of concerns between Java business logic and Python AI/ML capabilities. 