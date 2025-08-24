export type ID = string;
export type CircleType = 'APARTMENT'|'HOTEL'|'OFFICE';
export type UserRole = 'RESIDENT'|'ADMIN'|'SECURITY'|'MAINTENANCE'|'STAFF'|'SUPERADMIN';
export type AmenityKind = 'GENERAL'|'TABLE'|'ROOM';
export type BookingStatus = 'PENDING'|'APPROVED'|'REJECTED'|'CANCELED';
export type IncidentType = 'SECURITY'|'MAINTENANCE'|'OTHER';
export type IncidentStatus = 'OPEN'|'IN_PROGRESS'|'RESOLVED';
export type EventRSVPStatus = 'GOING'|'INTERESTED'|'DECLINED';
export type AnomalyStatus = 'OPEN'|'ACKED'|'RESOLVED';
export type MediaKind = 'PHOTO'|'VIDEO';

export interface Circle { id:ID; name:string; type:CircleType; features?:string[]; policy_json?:any; }
export interface AppUser { id:ID; email:string; display_name:string; avatar_url?:string; }
export interface Membership { id:ID; circle_id:ID; user_id:ID; role:UserRole; unit?:string; verified?:boolean; }

export interface Amenity { id:ID; circle_id:ID; name:string; kind:AmenityKind; hours_json?:any;
  capacity?:number; slot_mins?:number; requires_approval?:boolean; cancel_window_mins?:number; }
export interface Booking { id:ID; circle_id:ID; amenity_id:ID; user_id:ID; start_at:string; end_at:string;
  status:BookingStatus; approved_by?:ID; approved_at?:string; canceled_at?:string; checked_in_at?:string; ics_uid?:string; }
export interface CreateBooking { circle_id:ID; amenity_id:ID; user_id:ID; start_at:string; end_at:string; }

export interface Incident { id:ID; circle_id:ID; reporter_id:ID; type:IncidentType; severity:number;
  description:string; status:IncidentStatus; created_at:string; resolved_at?:string; }
export interface IncidentMedia { id:ID; incident_id:ID; url:string; kind:MediaKind; }

export interface Announcement { id:ID; circle_id:ID; author_id:ID; title:string; body_md:string; pinned:boolean; created_at:string; }
export interface Event { id:ID; circle_id:ID; title:string; description?:string; start_at:string; end_at:string; capacity?:number; }
export interface EventRSVP { id:ID; event_id:ID; user_id:ID; status:EventRSVPStatus; }
export interface Poll { id:ID; circle_id:ID; question:string; multi?:boolean; }
export interface PollOption { id:ID; poll_id:ID; text:string; }
export interface PollWithOptions extends Poll { options:PollOption[]; }

export interface DemandHourly { id:ID; circle_id:ID; amenity_id:ID; hour:string; req:number; approvals:number; cancels:number; no_shows:number; }
export interface ForecastHourly { id:ID; circle_id:ID; amenity_id:ID; hour:string; demand_pred:number; slot_reco?:number; is_surge?:boolean; }
export interface AnomalyAlert { id:ID; circle_id:ID; metric:string; window:string; z:number; status:AnomalyStatus; suggestion?:string; created_at:string; }

export interface AdminBookingFilter { circle_id:ID; amenity_id?:ID; status?:BookingStatus; from?:string; to?:string; }
export interface AdminIncidentFilter { circle_id:ID; status?:IncidentStatus; min_severity?:number; }

export interface FeedResponse {
	posts: Post[];
	next_cursor: string | null;
	lane: 'help' | 'show';
	total: number;
}

export interface Post {
	id: ID;
	author_id: ID;
	circle_id: ID;
	content: string;
	lane: 'help' | 'show';
	kind: 'signal' | 'ask' | 'event' | 'swap' | 'bulletin';
	media_url?: string;
	tags: string[];
	ttl_hours: number;
	created_at: string;
	expires_at: string;
	thanks_count: number;
	reports_count: number;
	author_reputation?: {
		trust_score: number;
		thanks_count: number;
		badges: string[];
	};
}

export interface Reputation {
	user_id: ID;
	circle_id: ID;
	trust_score: number;
	thanks_count: number;
	claims_completed: number;
	badges: string[];
	creator_mode: {
		is_unlocked: boolean;
		criteria: {
			trust_score: number;
			thanks_count: number;
			posts_count: number;
		};
		perks: {
			max_clip_duration: number;
			can_schedule: boolean;
			can_duet: boolean;
		};
	};
}

export interface Report {
	id: ID;
	reporter_id: ID;
	target_type: 'post' | 'comment' | 'user';
	target_id: ID;
	reason: string;
	status: 'queue' | 'actioned' | 'dismissed';
	created_at: string;
}

export interface Block {
	blocker_id: ID;
	blocked_id: ID;
	created_at: string;
}

export interface StageResponse {
	stage_posts: Post[];
	week_start: string;
	next_stage: string;
}

export interface Ask {
	post_id: ID;
	status: 'open' | 'claimed' | 'done' | 'cancelled';
	claimer_id?: ID;
	claimed_at?: string;
	closed_at?: string;
}