export type ID = string;

export type CircleType = 'APARTMENT' | 'HOTEL' | 'OFFICE';
export type UserRole = 'RESIDENT' | 'ADMIN' | 'SECURITY' | 'MAINTENANCE' | 'STAFF' | 'SUPERADMIN';
export type AmenityKind = 'GENERAL' | 'TABLE' | 'ROOM';
export type BookingStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
export type IncidentType = 'SECURITY' | 'MAINTENANCE' | 'OTHER';
export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
export type EventRSVPStatus = 'GOING' | 'INTERESTED' | 'DECLINED';
export type AnomalyStatus = 'OPEN' | 'ACKED' | 'RESOLVED';
export type MediaKind = 'PHOTO' | 'VIDEO';

export interface Circle {
  id: ID;
  name: string;
  type: CircleType;
  radius_miles?: number;
  policy_json?: string;
  features: string[];
}

export interface AppUser {
  id: ID;
  email: string;
  display_name: string;
  avatar_url?: string;
}

export interface Membership {
  id: ID;
  circle_id: ID;
  user_id: ID;
  role: UserRole;
  unit?: string;
  verified: boolean;
}

export interface Amenity {
  id: ID;
  circle_id: ID;
  name: string;
  kind: AmenityKind;
  hours_json: string;
  capacity: number;
  slot_mins: number;
  requires_approval: boolean;
  cancel_window_mins: number;
}

export interface Booking {
  id: ID;
  circle_id: ID;
  amenity_id: ID;
  user_id: ID;
  start_at: string;
  end_at: string;
  status: BookingStatus;
  approved_by?: ID;
  approved_at?: string;
  canceled_at?: string;
  checked_in_at?: string;
  ics_uid?: string;
}

export interface Incident {
  id: ID;
  circle_id: ID;
  reporter_id: ID;
  type: IncidentType;
  severity: number;
  description: string;
  status: IncidentStatus;
  created_at: string;
  resolved_at?: string;
  anonymous_to_neighbors?: boolean;
}

export interface IncidentMedia {
  id: ID;
  incident_id: ID;
  url: string;
  kind: MediaKind;
}

export interface Announcement {
  id: ID;
  circle_id: ID;
  author_id: ID;
  title: string;
  body_md: string;
  pinned: boolean;
  created_at: string;
}

export interface Event {
  id: ID;
  circle_id: ID;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  capacity: number;
}

export interface EventRSVP {
  id: ID;
  event_id: ID;
  user_id: ID;
  status: EventRSVPStatus;
}

export interface Poll {
  id: ID;
  circle_id: ID;
  question: string;
  multi: boolean;
}

export interface PollOption {
  id: ID;
  poll_id: ID;
  text: string;
}

export interface PollVote {
  id: ID;
  poll_id: ID;
  option_id: ID;
  user_id: ID;
}

export interface DemandHourly {
  id: ID;
  circle_id: ID;
  amenity_id: ID;
  hour: string;
  req: number;
  approvals: number;
  cancels: number;
  no_shows: number;
}

export interface ForecastHourly {
  id: ID;
  circle_id: ID;
  amenity_id: ID;
  hour: string;
  demand_pred: number;
  slot_reco: number;
  is_surge: boolean;
}

export interface AnomalyAlert {
  id: ID;
  circle_id: ID;
  metric: string;
  window: string;
  z: number;
  status: AnomalyStatus;
  suggestion: string;
  created_at: string;
}

// Hotel-specific types
export interface MenuItem {
  id: ID;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export interface OrderHeader {
  id: ID;
  circle_id: ID;
  user_id: ID;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  total_amount: number;
  created_at: string;
}

export interface OrderLine {
  id: ID;
  order_id: ID;
  menu_item_id: ID;
  quantity: number;
  unit_price: number;
}

export interface Promotion {
  id: ID;
  circle_id: ID;
  title: string;
  description: string;
  discount_percent: number;
  valid_from: string;
  valid_until: string;
  max_uses: number;
  current_uses: number;
}

// Office-specific types
export interface VisitorPass {
  id: ID;
  circle_id: ID;
  visitor_name: string;
  host_user_id: ID;
  purpose: string;
  valid_from: string;
  valid_until: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

// API request/response types
export interface CreateBooking {
  amenity_id: ID;
  start_at: string;
  end_at: string;
}

export interface CreateIncident {
  type: IncidentType;
  severity: number;
  description: string;
  anonymous_to_neighbors?: boolean;
  media_urls?: string[];
}

export interface CreateAnnouncement {
  title: string;
  body_md: string;
  pinned?: boolean;
}

export interface CreateEvent {
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  capacity: number;
}

export interface CreatePoll {
  question: string;
  multi: boolean;
  options: string[];
}

export interface AdminBookingFilter {
  date_from?: string;
  date_to?: string;
  amenity_id?: ID;
  status?: BookingStatus;
  user_id?: ID;
}

export interface AdminIncidentFilter {
  status?: IncidentStatus;
  type?: IncidentType;
  severity?: number;
  date_from?: string;
  date_to?: string;
}

export interface KpiSummary {
  bookings_this_week: number;
  avg_approval_time_minutes: number;
  incident_mttr_hours: number;
  check_in_rate_percent: number;
  open_alerts: number;
}

export interface ApplyPolicy {
  amenity_id: ID;
  slot_duration_minutes: number;
  start_hour: number;
  end_hour: number;
  days: number;
}

// Extended types with relationships
export interface PollWithOptions extends Poll {
  options: PollOption[];
  votes: PollVote[];
  total_votes: number;
}

export interface EventWithRSVPs extends Event {
  rsvps: EventRSVP[];
  going_count: number;
  interested_count: number;
  declined_count: number;
}

export interface BookingWithDetails extends Booking {
  amenity: Amenity;
  user: AppUser;
  approved_by_user?: AppUser;
}

export interface IncidentWithDetails extends Incident {
  reporter: AppUser;
  media: IncidentMedia[];
  circle: Circle;
}

export interface AmenityWithBookings extends Amenity {
  bookings: Booking[];
  current_capacity: number;
}
