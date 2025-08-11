export type Amenity = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  openTime?: string;
  closeTime?: string;
  requiresApproval: boolean;
};

export type Booking = {
  id: number;
  amenity: Amenity;
  userId: number;
  startAt: string;
  endAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
};

export type Incident = {
  id: number;
  reporterUserId: number;
  type: string;
  description: string;
  locationHint?: string;
  reportedAt: string;
  severity?: number;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
};

export type Announcement = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  createdByUserId: number;
  pinned: boolean;
};


