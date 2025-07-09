// Advanced Connectors Data Model
export const connectors = [
  {
    connectorId: "connector_001",
    type: "Roommate",
    name: "Greenwood Apartments Roommates",
    description: "Shared bills and chores scheduling for Greenwood Apartments residents. Connect with your roommates, split bills easily, and coordinate household tasks.",
    locationRadius: "500m",
    membersCount: 12,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop",
    creatorId: 1,
    memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    rules: "Be respectful, pay bills on time, communicate about chores. No spam or inappropriate content.",
    createdAt: "2024-06-01T00:00:00Z",
    location: "Greenwood Apartments, Downtown",
    tags: ["roommates", "bills", "chores", "apartment"],
    isPrivate: false,
    joinRequests: []
  },
  {
    connectorId: "connector_002",
    type: "Dating",
    name: "Singles in Downtown",
    description: "Meet nearby verified singles in the Downtown area. Safe, respectful dating community with AI-powered compatibility matching.",
    locationRadius: "1km",
    membersCount: 43,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop",
    creatorId: 2,
    memberIds: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
    rules: "Be respectful and honest. No harassment or inappropriate behavior. Verified profiles only.",
    createdAt: "2024-06-15T00:00:00Z",
    location: "Downtown District",
    tags: ["dating", "singles", "relationships", "social"],
    isPrivate: false,
    joinRequests: []
  },
  {
    connectorId: "connector_003",
    type: "Business",
    name: "Downtown Business Network",
    description: "Connect with local businesses, share promotions, and collaborate on projects. Perfect for entrepreneurs and small business owners.",
    locationRadius: "2km",
    membersCount: 28,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop",
    creatorId: 3,
    memberIds: [56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
    rules: "Professional conduct only. No spam advertising. Share valuable business insights and opportunities.",
    createdAt: "2024-07-01T00:00:00Z",
    location: "Downtown Business District",
    tags: ["business", "networking", "entrepreneurs", "collaboration"],
    isPrivate: false,
    joinRequests: []
  },
  {
    connectorId: "connector_004",
    type: "Secret",
    name: "Anonymous Support Group",
    description: "A safe space for anonymous support and confidential discussions. All messages are encrypted and self-destruct after 24 hours.",
    locationRadius: "5km",
    membersCount: 15,
    verifiedRequired: false,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    creatorId: 4,
    memberIds: [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98],
    rules: "Complete anonymity. No screenshots. Messages auto-delete. Be supportive and kind.",
    createdAt: "2024-07-10T00:00:00Z",
    location: "Confidential",
    tags: ["support", "anonymous", "confidential", "help"],
    isPrivate: true,
    joinRequests: [99, 100]
  },
  {
    connectorId: "connector_005",
    type: "Pets",
    name: "Downtown Pet Lovers",
    description: "Connect with fellow pet owners, share pet photos, organize playdates, and help with lost/found pets.",
    locationRadius: "1.5km",
    membersCount: 35,
    verifiedRequired: false,
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=200&fit=crop",
    creatorId: 5,
    memberIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135],
    rules: "Pet-friendly content only. No animal cruelty. Help with lost pets when possible.",
    createdAt: "2024-06-20T00:00:00Z",
    location: "Downtown Pet Park",
    tags: ["pets", "animals", "playdates", "lost-found"],
    isPrivate: false,
    joinRequests: []
  },
  {
    connectorId: "connector_006",
    type: "Fitness",
    name: "Downtown Fitness Buddies",
    description: "Find workout partners, share fitness tips, and motivate each other to stay healthy and active.",
    locationRadius: "1km",
    membersCount: 22,
    verifiedRequired: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
    creatorId: 6,
    memberIds: [136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157],
    rules: "Positive fitness motivation only. No body shaming. Share helpful tips and encouragement.",
    createdAt: "2024-07-05T00:00:00Z",
    location: "Downtown Gym & Parks",
    tags: ["fitness", "workout", "health", "motivation"],
    isPrivate: false,
    joinRequests: []
  },
  {
    connectorId: "connector_007",
    type: "Food",
    name: "Downtown Foodies",
    description: "Discover local restaurants, share food photos, organize potlucks, and find dining companions.",
    locationRadius: "1.5km",
    membersCount: 31,
    verifiedRequired: false,
    image: "https://images.unsplash.com/photo-1504674900240-9a9049b7d63d?w=400&h=200&fit=crop",
    creatorId: 7,
    memberIds: [158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188],
    rules: "Food-related content only. Be respectful of dietary preferences. No food waste.",
    createdAt: "2024-06-25T00:00:00Z",
    location: "Downtown Restaurants",
    tags: ["food", "restaurants", "cooking", "dining"],
    isPrivate: false,
    joinRequests: []
  },
  {
    connectorId: "connector_008",
    type: "Volunteer",
    name: "Downtown Volunteers",
    description: "Find volunteer opportunities, organize community service events, and make a positive impact together.",
    locationRadius: "3km",
    membersCount: 18,
    verifiedRequired: true,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop",
    creatorId: 8,
    memberIds: [189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206],
    rules: "Community service focus. No political content. Be helpful and supportive.",
    createdAt: "2024-07-12T00:00:00Z",
    location: "Downtown Community Center",
    tags: ["volunteer", "community", "service", "helping"],
    isPrivate: false,
    joinRequests: []
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
  { id: "roommate", name: "Roommate", icon: "home-group", color: "#059669" },
  { id: "dating", name: "Dating", icon: "heart", color: "#dc2626" },
  { id: "business", name: "Business", icon: "briefcase", color: "#2563eb" },
  { id: "secret", name: "Secret", icon: "lock", color: "#7c3aed" },
  { id: "pets", name: "Pets", icon: "paw", color: "#ea580c" },
  { id: "fitness", name: "Fitness", icon: "dumbbell", color: "#16a34a" },
  { id: "food", name: "Food", icon: "food", color: "#ca8a04" },
  { id: "volunteer", name: "Volunteer", icon: "hand-heart", color: "#0891b2" }
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

export const connectorAdminConfig = {
  // connectorId: { enabledModules: [moduleName], moduleOrder: [moduleName] }
  '1': {
    enabledModules: ['posts', 'events', 'chat'],
    moduleOrder: ['posts', 'events', 'chat']
  },
  '2': {
    enabledModules: ['posts', 'marketplace', 'reviews'],
    moduleOrder: ['posts', 'marketplace', 'reviews']
  },
  '3': {
    enabledModules: ['posts', 'stories', 'reels', 'events'],
    moduleOrder: ['posts', 'stories', 'reels', 'events']
  },
  // Add more as needed
}; 