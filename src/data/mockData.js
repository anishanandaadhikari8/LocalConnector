// Advanced Connectors Data Model
export const connectors = [
  {
    connectorId: "connector_001",
    type: "Apartment",
    name: "Greenwood Apartments Community",
    description: "Official community space for Greenwood Apartments residents. Manage building announcements, amenities booking, HOA matters, and connect with neighbors.",
    address: "123 Greenwood Ave, Downtown",
    geoRadius: 100, // 100 meters - building specific
    membersCount: 156,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop",
    creatorId: 1,
    memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    rules: "For verified Greenwood Apartments residents only. Respectful communication required. Use appropriate channels for different topics.",
    createdAt: "2024-06-01T00:00:00Z",
    location: "Greenwood Apartments, Downtown",
    tags: ["apartment", "hoa", "community", "building"],
    isPrivate: false,
    joinRequests: [],
    modulesEnabled: ["posts", "chat", "bills", "events", "directory", "safety"]
  },
  {
    connectorId: "connector_002",
    type: "Marketplace", 
    name: "Downtown Local Marketplace",
    description: "Buy, sell, and trade with your verified neighbors. Support local businesses and find unique items in your community.",
    address: "Downtown District",
    geoRadius: 2000, // 2km radius
    membersCount: 324,
    verifiedRequired: false,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    creatorId: 2,
    memberIds: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    rules: "No scams or fraudulent activity. Meet in public places for transactions. Be honest about item conditions.",
    createdAt: "2024-06-15T00:00:00Z",
    location: "Downtown District",
    tags: ["marketplace", "buy", "sell", "trade", "local"],
    isPrivate: false,
    joinRequests: [],
    modulesEnabled: ["posts", "marketplace", "chat", "directory"]
  },
  {
    connectorId: "connector_003",
    type: "Safety",
    name: "Downtown Neighborhood Watch",
    description: "Stay safe and informed with your neighbors. Report incidents, share safety tips, and coordinate community security efforts.",
    address: "Downtown Safety District",
    geoRadius: 1500, // 1.5km radius
    membersCount: 89,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=200&fit=crop",
    creatorId: 3,
    memberIds: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    rules: "Verified residents only. Report actual incidents only. No vigilante behavior. Coordinate with local authorities.",
    createdAt: "2024-06-20T00:00:00Z",
    location: "Downtown Safety District", 
    tags: ["safety", "watch", "security", "alerts", "community"],
    isPrivate: false,
    joinRequests: [],
    modulesEnabled: ["posts", "safety", "chat", "directory", "events"]
  },
  {
    connectorId: "connector_004",
    type: "Event",
    name: "Downtown Event Organizers",
    description: "Plan and organize community events, parties, and gatherings. From block parties to cultural festivals - bring the community together!",
    address: "Downtown Events Center",
    geoRadius: 3000, // 3km radius
    membersCount: 67,
    verifiedRequired: false,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop",
    creatorId: 4,
    memberIds: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    rules: "Be inclusive and welcoming. Respect local noise ordinances. Clean up after events. Coordinate with appropriate authorities for large gatherings.",
    createdAt: "2024-06-25T00:00:00Z",
    location: "Downtown Events District",
    tags: ["events", "parties", "organizing", "community", "festivals"],
    isPrivate: false,
    joinRequests: [],
    modulesEnabled: ["posts", "events", "chat", "directory", "bills"]
  },
  {
    connectorId: "connector_005",
    type: "Roommate", 
    name: "Downtown Roommate Network",
    description: "Find compatible roommates, manage shared expenses, coordinate household tasks, and build great living arrangements with trusted neighbors.",
    address: "Downtown Residential Area",
    geoRadius: 2500, // 2.5km radius
    membersCount: 134,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop",
    creatorId: 5,
    memberIds: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
    rules: "Verified profiles only. Be honest about living habits and expectations. Respect privacy and shared spaces.",
    createdAt: "2024-07-01T00:00:00Z",
    location: "Downtown Residential",
    tags: ["roommate", "housing", "bills", "chores", "living"],
    isPrivate: false,
    joinRequests: [],
    modulesEnabled: ["posts", "chat", "bills", "roommate", "directory", "events"]
  },
  {
    connectorId: "connector_006",
    type: "Dating",
    name: "Verified Downtown Singles",
    description: "Connect with verified local singles in a safe, respectful environment. Build meaningful relationships with people in your neighborhood.",
    address: "Downtown Social District", 
    geoRadius: 5000, // 5km radius
    membersCount: 89,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop",
    creatorId: 6,
    memberIds: [76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    rules: "Verified profiles only. Be respectful and honest. No harassment or inappropriate behavior. Meet in public places initially.",
    createdAt: "2024-07-05T00:00:00Z",
    location: "Downtown Social District",
    tags: ["dating", "singles", "relationships", "verified", "local"],
    isPrivate: false,
    joinRequests: [],
    modulesEnabled: ["posts", "dating", "chat", "directory", "events"]
     }
];

// Connector-specific posts
export const connectorPosts = [
  // Roommate Connector Posts
  {
    postId: "post_001",
    connectorId: "connector_001",
    type: "Bill",
    author: {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Electricity Bill for July: $120",
    amount: 120,
    splitBetweenMembers: ["user1", "user2", "user3"],
    dueDate: "2025-07-15",
    status: "pending",
    createdAt: "2024-12-01T10:00:00Z",
    likes: 0,
    comments: 3
  },
  {
    postId: "post_002",
    connectorId: "connector_001",
    type: "Chore",
    author: {
      id: 2,
      name: "Mike Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Kitchen cleaning - my turn this week",
    choreType: "cleaning",
    assignedTo: "user2",
    dueDate: "2025-07-07",
    status: "completed",
    createdAt: "2024-12-01T14:30:00Z",
    likes: 2,
    comments: 1
  },
  {
    postId: "post_003",
    connectorId: "connector_001",
    type: "Event",
    author: {
      id: 3,
      name: "Sarah Green",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Roommate dinner this Friday at 7 PM",
    eventDate: "2025-07-05T19:00:00Z",
    location: "Our apartment",
    attendees: ["user1", "user2", "user3"],
    createdAt: "2024-12-01T16:00:00Z",
    likes: 4,
    comments: 2
  },

  // Dating Connector Posts
  {
    postId: "post_004",
    connectorId: "connector_002",
    type: "Event",
    author: {
      id: 13,
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Singles Meetup at Central Cafe, July 15, 6 PM",
    eventDate: "2025-07-15T18:00:00Z",
    location: "Central Cafe, Downtown",
    rsvp: { attending: 8, maybe: 3, declined: 1 },
    createdAt: "2024-12-03T12:00:00Z",
    likes: 12,
    comments: 5
  },
  {
    postId: "post_005",
    connectorId: "connector_002",
    type: "Profile",
    author: {
      id: 14,
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Looking for someone who loves hiking and coffee ☕️🏔️",
    interests: ["hiking", "coffee", "reading", "travel"],
    age: 28,
    location: "Downtown",
    createdAt: "2024-12-02T15:30:00Z",
    likes: 15,
    comments: 3
  },

  // Business Connector Posts
  {
    postId: "post_006",
    connectorId: "connector_003",
    type: "Promotion",
    author: {
      id: 56,
      name: "Tech Startup Co.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "20% off for local businesses this month! DM for details.",
    promotionType: "discount",
    discount: "20%",
    validUntil: "2025-07-31",
    createdAt: "2024-12-01T09:00:00Z",
    likes: 8,
    comments: 4
  },
  {
    postId: "post_007",
    connectorId: "connector_003",
    type: "Collaboration",
    author: {
      id: 57,
      name: "Design Studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Looking for a web developer to collaborate on a project",
    projectType: "web development",
    budget: "$2000-5000",
    timeline: "2-3 months",
    createdAt: "2024-12-02T11:00:00Z",
    likes: 5,
    comments: 7
  },

  // Secret Connector Posts
  {
    postId: "post_008",
    connectorId: "connector_004",
    type: "Message",
    author: {
      id: 84,
      name: "Anonymous User",
      avatar: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=face",
      verified: false
    },
    content: "Having a tough time with work stress. Anyone else feeling overwhelmed?",
    isEncrypted: true,
    selfDestruct: "2025-07-02T10:00:00Z",
    createdAt: "2024-12-01T10:00:00Z",
    likes: 3,
    comments: 2
  },

  // Pet Connector Posts
  {
    postId: "post_009",
    connectorId: "connector_005",
    type: "LostPet",
    author: {
      id: 101,
      name: "Pet Owner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Lost: Golden Retriever named Max near Central Park",
    petType: "dog",
    petName: "Max",
    breed: "Golden Retriever",
    lastSeen: "Central Park",
    contact: "+1 (555) 123-4567",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    createdAt: "2024-12-01T08:00:00Z",
    likes: 12,
    comments: 8
  },
  {
    postId: "post_010",
    connectorId: "connector_005",
    type: "Event",
    author: {
      id: 102,
      name: "Dog Park Organizer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    content: "Pet playdate this Sunday at 2 PM! All pets welcome",
    eventDate: "2025-07-07T14:00:00Z",
    location: "Downtown Dog Park",
    attendees: ["user101", "user102", "user103"],
    createdAt: "2024-12-01T16:30:00Z",
    likes: 18,
    comments: 6
  }
];

// User's posts for ProfileScreen
export const userPosts = [
  {
    id: 1,
    postId: "user_post_001",
    title: "Looking for a reliable roommate for my 2BR apartment",
    content: "I have a spacious 2-bedroom apartment in downtown and I'm looking for a clean, respectful roommate to share it with.",
    category: "Roommate",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-12-01T10:00:00Z",
    likes: 12,
    comments: 5,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    location: "Downtown",
    price: 800
  },
  {
    id: 2,
    postId: "user_post_002",
    title: "Coffee meetup this weekend",
    content: "Anyone interested in a coffee meetup at the new café downtown? Great place to work and chat!",
    category: "Social",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-11-28T14:30:00Z",
    likes: 8,
    comments: 3,
    location: "Downtown Café",
    price: 0
  },
  {
    id: 3,
    postId: "user_post_003",
    title: "Selling my bike - excellent condition",
    content: "Moving out and need to sell my Trek mountain bike. Great condition, barely used.",
    category: "Buy/Sell",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-11-25T09:15:00Z",
    likes: 15,
    comments: 7,
    image: "https://images.unsplash.com/photo-1558618047-fbd31c928e3a?w=400&h=300&fit=crop",
    location: "Downtown",
    price: 450
  },
  {
    id: 4,
    postId: "user_post_004",
    title: "Community garden volunteers needed",
    content: "We're organizing a community garden project and need volunteers to help with setup and maintenance.",
    category: "Volunteer",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-11-22T16:45:00Z",
    likes: 22,
    comments: 12,
    location: "Community Park",
    price: null
  },
  {
    id: 5,
    postId: "user_post_005",
    title: "Lost cat - please help!",
    content: "My cat Whiskers went missing yesterday evening. Orange tabby, very friendly. Please contact me if you see him!",
    category: "Lost & Found",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-11-20T07:30:00Z",
    likes: 35,
    comments: 18,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    location: "Elm Street area",
    price: null
  },
  {
    id: 6,
    postId: "user_post_006",
    title: "Free coding workshop this Saturday",
    content: "I'm hosting a free beginner-friendly coding workshop at the community center. Bring your laptop!",
    category: "Events",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-11-18T12:00:00Z",
    likes: 28,
    comments: 9,
    location: "Community Center",
    price: 0
  }
];

// Enhanced posts data for HomeScreen (including user posts and connector posts)
export const posts = [
  // User's personal posts
  ...userPosts,
  
  // Sample neighborhood posts with consistent structure
  {
    id: 101,
    postId: "neighborhood_001",
    title: "Free piano lessons available",
    content: "I'm offering free piano lessons for beginners. 10 years of experience teaching. Contact me if interested!",
    category: "General",
    author: {
      id: 102,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-12-02T09:30:00Z",
    createdAt: "2024-12-02T09:30:00Z",
    likes: 18,
    comments: 7,
    location: "Downtown Music Studio",
    price: 0
  },
  {
    id: 102,
    postId: "neighborhood_002", 
    title: "Lost dog - Golden Retriever",
    content: "My dog Buddy went missing this morning. He's a friendly Golden Retriever, 3 years old. Please call if you see him!",
    category: "Lost & Found",
    author: {
      id: 103,
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-12-02T08:15:00Z", 
    createdAt: "2024-12-02T08:15:00Z",
    likes: 45,
    comments: 23,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    location: "Oak Street area",
    price: null
  },
  {
    id: 103,
    postId: "neighborhood_003",
    title: "Garage sale this weekend!",
    content: "Cleaning out the attic! Furniture, books, electronics, and more. Everything must go!",
    category: "Buy/Sell",
    author: {
      id: 104,
      name: "Lisa Martinez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-12-01T17:45:00Z",
    createdAt: "2024-12-01T17:45:00Z", 
    likes: 12,
    comments: 4,
    location: "456 Elm Street",
    price: null
  },
  {
    id: 104,
    postId: "neighborhood_004",
    title: "Neighborhood watch meeting",
    content: "Monthly neighborhood watch meeting this Thursday at 7 PM. Discussing recent security updates and community initiatives.",
    category: "Alerts",
    author: {
      id: 105,
      name: "Robert Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-12-01T14:20:00Z",
    createdAt: "2024-12-01T14:20:00Z",
    likes: 8,
    comments: 2,
    location: "Community Center",
    price: null
  },
  {
    id: 105,
    postId: "neighborhood_005",
    title: "Fresh vegetables for sale",
    content: "Homegrown organic vegetables from my garden. Tomatoes, lettuce, carrots, and herbs available.",
    category: "Buy/Sell",
    author: {
      id: 106,
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-12-01T11:30:00Z",
    createdAt: "2024-12-01T11:30:00Z",
    likes: 25,
    comments: 8,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    location: "Garden Lane",
    price: 15
  },
  {
    id: 106,
    postId: "neighborhood_006",
    title: "Block party planning meeting",
    content: "Let's plan an amazing block party for next month! Ideas welcome for food, music, and activities for kids.",
    category: "Events", 
    author: {
      id: 107,
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    timestamp: "2024-11-30T16:00:00Z",
    createdAt: "2024-11-30T16:00:00Z",
    likes: 32,
    comments: 15,
    location: "Maple Street",
    price: null
  }
];

// Legacy data for backward compatibility
export const communities = connectors;

export const categories = [
  { id: "all", name: "All", icon: "home" },
  { id: "connectors", name: "Connectors", icon: "account-group" },
  { id: "alerts", name: "Alerts", icon: "warning" },
  { id: "marketplace", name: "Marketplace", icon: "shopping-cart" }
];

export const connectorTypes = [
  { id: "apartment", name: "Apartment/HOA", icon: "home-city", color: "#059669" },
  { id: "marketplace", name: "Local Marketplace", icon: "shopping", color: "#dc2626" },
  { id: "safety", name: "Neighborhood Watch", icon: "shield-alert", color: "#2563eb" },
  { id: "event", name: "Event Organizing", icon: "calendar-star", color: "#7c3aed" },
  { id: "roommate", name: "Roommate", icon: "home-group", color: "#ea580c" },
  { id: "dating", name: "Dating (Verified)", icon: "heart-multiple", color: "#16a34a" }
];

export const currentUser = {
  id: 1,
  name: "John Doe",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  neighborhood: "Downtown",
  bio: "Tech enthusiast. Coffee lover. Neighborhood watch volunteer.",
  posts: [1, 6],
  neighbors: 120,
  neighborsCount: 248, // Add this for ProfileScreen
  joinedDate: "2024-06-15",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  verified: true,
  reputation: 95,
  joinedConnectors: ["connector_001", "connector_003", "connector_005"],
  interests: ["technology", "coffee", "community", "fitness"],
  age: 32,
  location: "Downtown"
};

export const notifications = [
  {
    id: 201,
    text: "New bill posted in Greenwood Apartments Roommates",
    type: "connector_bill",
    read: false,
    timestamp: "2025-07-01T10:30:00Z",
    connectorId: "connector_001",
    postId: "post_001",
    user: {
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 202,
    text: "Emma Davis liked your profile in Singles in Downtown",
    type: "connector_like",
    read: false,
    timestamp: "2025-07-01T14:20:00Z",
    connectorId: "connector_002",
    user: {
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 203,
    text: "New collaboration opportunity in Downtown Business Network",
    type: "connector_post",
    read: true,
    timestamp: "2025-07-01T13:15:00Z",
    connectorId: "connector_003",
    postId: "post_007",
    user: {
      name: "Design Studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: 204,
    text: "Pet playdate scheduled for this Sunday",
    type: "connector_event",
    read: true,
    timestamp: "2025-07-01T12:00:00Z",
    connectorId: "connector_005",
    postId: "post_010",
    user: {
      name: "Dog Park Organizer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    }
  }
];

export const popularTags = [
  "roommates", "bills", "chores", "dating", "singles", "business", "networking",
  "pets", "animals", "fitness", "health", "food", "restaurants", "volunteer",
  "community", "events", "collaboration", "support", "anonymous"
];

export const trendingHashtags = [
  "RoommateLife", "BillSplitting", "DatingApp", "BusinessNetwork", "PetLovers",
  "FitnessBuddies", "Foodies", "VolunteerWork", "CommunityService", "AnonymousSupport"
];

export const comments = [
  {
    id: 1,
    postId: "post_001",
    user: {
      id: 2,
      name: "Mike Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    text: "I'll pay my share by Friday!",
    timestamp: "2025-07-01T16:00:00Z",
    likes: 1
  },
  {
    id: 2,
    postId: "post_004",
    user: {
      id: 15,
      name: "Lisa Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    text: "I'll be there! Looking forward to meeting everyone",
    timestamp: "2025-07-03T14:30:00Z",
    likes: 2
  }
];

export const neighborhoods = [
  "Downtown",
  "Oak Street",
  "Maple Street", 
  "Pine Street",
  "Elm Street",
  "Greenwood Park",
  "Central Park",
  "Garden Lane"
];

export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    neighborhood: "Downtown",
    verified: true,
    reputation: 95
  },
  {
    id: 2,
    name: "Emily Smith",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    neighborhood: "Oak Street",
    verified: true,
    reputation: 87
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    neighborhood: "Elm Street",
    verified: true,
    reputation: 92
  }
]; 

// Mock admin configuration for connectors
// Mock Events Data
export const events = [
  {
    eventId: "event_001",
    title: "Downtown Food Festival",
    description: "Join us for a day of delicious local cuisine and community bonding!",
    date: "2025-07-15T18:00:00Z",
    location: "Downtown Square",
    attendeeCount: 45,
    maxAttendees: 100,
    organizer: {
      id: 1,
      name: "Downtown Foodies",
      avatar: "https://images.unsplash.com/photo-1504674900240-9a9049b7d63d?w=100&h=100&fit=crop"
    },
    connectorId: "connector_007",
    category: "Food",
    image: "https://images.unsplash.com/photo-1504674900240-9a9049b7d63d?w=400&h=200&fit=crop",
    tags: ["food", "festival", "community", "downtown"]
  },
  {
    eventId: "event_002",
    title: "Pet Playdate in the Park",
    description: "Bring your furry friends for a fun afternoon of play and socialization!",
    date: "2025-07-20T14:00:00Z",
    location: "Central Park",
    attendeeCount: 23,
    maxAttendees: 50,
    organizer: {
      id: 5,
      name: "Pet Lovers Group",
      avatar: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=100&h=100&fit=crop"
    },
    connectorId: "connector_005",
    category: "Pets",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=200&fit=crop",
    tags: ["pets", "playdate", "park", "socialization"]
  },
  {
    eventId: "event_003",
    title: "Business Networking Mixer",
    description: "Connect with local entrepreneurs and business professionals!",
    date: "2025-07-25T19:00:00Z",
    location: "Downtown Business Center",
    attendeeCount: 18,
    maxAttendees: 40,
    organizer: {
      id: 3,
      name: "Business Network",
      avatar: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=100&fit=crop"
    },
    connectorId: "connector_003",
    category: "Business",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop",
    tags: ["business", "networking", "entrepreneurs", "professional"]
  }
];

// Mock Conversations Data
export const conversations = [
  {
    conversationId: "conv_001",
    participants: [1, 2],
    lastMessage: {
      id: "msg_001",
      text: "Hey! Are you going to the food festival this weekend?",
      senderId: 2,
      timestamp: "2025-07-01T15:30:00Z"
    },
    unreadCount: 1,
    updatedAt: "2025-07-01T15:30:00Z"
  },
  {
    conversationId: "conv_002",
    participants: [1, 3],
    lastMessage: {
      id: "msg_002",
      text: "Thanks for the business advice yesterday!",
      senderId: 1,
      timestamp: "2025-07-01T14:20:00Z"
    },
    unreadCount: 0,
    updatedAt: "2025-07-01T14:20:00Z"
  }
];

// Mock data for all 9 modules

// Bills data for bill splitting module
export const bills = [
  {
    id: "bill_001",
    connectorId: "connector_001",
    title: "Monthly Electricity Bill",
    description: "Building electricity bill for November 2024",
    totalAmount: 1200,
    category: "utilities",
    dueDate: "2024-12-15",
    status: "pending",
    createdBy: {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    createdAt: "2024-12-01T09:00:00Z",
    splits: [
      { userId: 1, name: "Alice Johnson", amount: 120, status: "paid", paidAt: "2024-12-01T15:30:00Z" },
      { userId: 2, name: "Bob Smith", amount: 120, status: "pending" },
      { userId: 3, name: "Carol Davis", amount: 120, status: "pending" },
      { userId: 4, name: "David Wilson", amount: 120, status: "paid", paidAt: "2024-12-02T10:15:00Z" }
    ]
  },
  {
    id: "bill_002", 
    connectorId: "connector_005",
    title: "Shared Groceries",
    description: "Weekly grocery shopping for the house",
    totalAmount: 180,
    category: "groceries",
    dueDate: "2024-12-10",
    status: "partial",
    createdBy: {
      id: 5,
      name: "Emma Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    createdAt: "2024-12-02T14:00:00Z",
    splits: [
      { userId: 5, name: "Emma Garcia", amount: 60, status: "paid", paidAt: "2024-12-02T14:00:00Z" },
      { userId: 6, name: "Frank Miller", amount: 60, status: "paid", paidAt: "2024-12-02T16:20:00Z" },
      { userId: 7, name: "Grace Lee", amount: 60, status: "pending" }
    ]
  }
];

// Safety alerts for safety module
export const safetyAlerts = [
  {
    id: "alert_001",
    connectorId: "connector_003", 
    type: "incident",
    severity: "medium",
    title: "Package Theft Reported",
    description: "Several packages reported stolen from apartment lobbies in the area. Please be cautious and consider having packages delivered to your workplace.",
    location: "Downtown Apartment District",
    coordinates: { latitude: 47.6062, longitude: -122.3321 },
    reportedBy: {
      id: 31,
      name: "Safety Coordinator",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    reportedAt: "2024-12-01T08:30:00Z",
    verified: true,
    affectedArea: 500, // meters radius
    tips: ["Use secure package lockers", "Have packages delivered to workplace", "Ask neighbors to collect packages when away"]
  },
  {
    id: "alert_002",
    connectorId: "connector_003",
    type: "warning", 
    severity: "low",
    title: "Construction Zone Safety",
    description: "Major construction on Pine Street causing pedestrian detours. Use caution when walking in the area, especially at night.",
    location: "Pine Street & 3rd Ave",
    coordinates: { latitude: 47.6105, longitude: -122.3355 },
    reportedBy: {
      id: 32,
      name: "Community Watch",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    reportedAt: "2024-11-28T16:45:00Z",
    verified: true,
    affectedArea: 200,
    tips: ["Use alternative routes", "Wear reflective clothing at night", "Stay on designated pedestrian paths"]
  }
];

// Member directory data
export const memberDirectory = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    unit: "2A",
    verified: true,
    reputation: 95,
    joinedDate: "2024-06-01",
    role: "admin",
    connectorId: "connector_001",
    bio: "Building manager and long-time resident",
    skills: ["property management", "maintenance", "community organizing"]
  },
  {
    id: 2,
    name: "Bob Smith", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    unit: "4B",
    verified: true,
    reputation: 87,
    joinedDate: "2024-06-15",
    role: "resident",
    connectorId: "connector_001",
    bio: "Software engineer, love tech and coffee",
    skills: ["programming", "tech support", "troubleshooting"]
  },
  {
    id: 3,
    name: "Carol Davis",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", 
    unit: "1C",
    verified: true,
    reputation: 92,
    joinedDate: "2024-07-01",
    role: "resident",
    connectorId: "connector_001",
    bio: "Teacher and community volunteer",
    skills: ["education", "event planning", "volunteer coordination"]
  }
];

// Roommate tools data
export const roommateData = {
  chores: [
    {
      id: "chore_001",
      connectorId: "connector_005",
      title: "Kitchen Cleaning",
      description: "Deep clean kitchen including stove, counters, and floor",
      assignedTo: 5,
      assignedName: "Emma Garcia",
      dueDate: "2024-12-07",
      status: "pending",
      frequency: "weekly",
      estimatedTime: "1 hour"
    },
    {
      id: "chore_002", 
      connectorId: "connector_005",
      title: "Bathroom Cleaning",
      description: "Clean bathroom including shower, toilet, and mirrors",
      assignedTo: 6,
      assignedName: "Frank Miller", 
      dueDate: "2024-12-05",
      status: "completed",
      completedAt: "2024-12-05T14:30:00Z",
      frequency: "weekly",
      estimatedTime: "45 minutes"
    }
  ],
  sharedCalendar: [
    {
      id: "cal_001",
      title: "House Meeting",
      description: "Monthly house meeting to discuss shared expenses and chores",
      date: "2024-12-15T19:00:00Z",
      type: "meeting",
      connectorId: "connector_005"
    },
    {
      id: "cal_002",
      title: "Grocery Shopping Day",
      description: "Weekly shared grocery shopping trip",
      date: "2024-12-08T10:00:00Z", 
      type: "activity",
      connectorId: "connector_005"
    }
  ]
};

// Dating features data
export const datingProfiles = [
  {
    id: 76,
    name: "Sarah Chen",
    age: 28,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop"
    ],
    bio: "Love hiking, coffee, and exploring the city. Looking for someone genuine to share adventures with!",
    interests: ["hiking", "coffee", "photography", "travel", "books"],
    profession: "Graphic Designer",
    education: "Art Institute",
    distance: "0.8 miles away",
    verified: true,
    connectorId: "connector_006",
    lastActive: "2 hours ago"
  },
  {
    id: 77,
    name: "Michael Rodriguez",
    age: 31,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop"
    ],
    bio: "Fitness enthusiast and foodie. Always up for trying new restaurants or outdoor activities!",
    interests: ["fitness", "cooking", "rock climbing", "wine", "music"],
    profession: "Marketing Manager", 
    education: "University of Washington",
    distance: "1.2 miles away",
    verified: true,
    connectorId: "connector_006",
    lastActive: "1 day ago"
  }
];

export const connectorAdminConfig = {
  // Configuration for all 6 connector types with their enabled modules
  'connector_001': { // Apartment
    enabledModules: ['posts', 'chat', 'bills', 'events', 'directory', 'safety'],
    moduleOrder: ['posts', 'directory', 'bills', 'events', 'safety', 'chat']
  },
  'connector_002': { // Marketplace
    enabledModules: ['posts', 'marketplace', 'chat', 'directory'],
    moduleOrder: ['marketplace', 'posts', 'chat', 'directory']
  },
  'connector_003': { // Safety
    enabledModules: ['posts', 'safety', 'chat', 'directory', 'events'],
    moduleOrder: ['safety', 'posts', 'events', 'directory', 'chat']
  },
  'connector_004': { // Event
    enabledModules: ['posts', 'events', 'chat', 'directory', 'bills'],
    moduleOrder: ['events', 'posts', 'directory', 'chat', 'bills']
  },
  'connector_005': { // Roommate
    enabledModules: ['posts', 'chat', 'bills', 'roommate', 'directory', 'events'],
    moduleOrder: ['roommate', 'bills', 'posts', 'events', 'directory', 'chat']
  },
  'connector_006': { // Dating
    enabledModules: ['posts', 'dating', 'chat', 'directory', 'events'],
    moduleOrder: ['dating', 'posts', 'events', 'directory', 'chat']
  }
}; 