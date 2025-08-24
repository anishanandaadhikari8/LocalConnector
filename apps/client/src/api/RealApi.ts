import type {
  ID, Circle, AppUser, Membership, Amenity, Booking, CreateBooking, BookingStatus,
  Incident, Announcement, Event, EventRSVP, PollWithOptions, ForecastHourly, AnomalyAlert,
  AdminBookingFilter, AdminIncidentFilter, FeedResponse, Post, Reputation, Report, Block, StageResponse
} from './types';

export default class RealApi {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  setToken(token?: string) { this.token = token; }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(this.baseUrl + path, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...(init.headers || {}),
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (res.status === 204) return undefined as unknown as T;
    return res.json() as Promise<T>;
  }

  // Dev login: verify, set token, return user by email
  async loginDev(email: string, role: string, circleId: ID): Promise<{ token: string; user: AppUser }> {
    const { token } = await this.request<{ token: string }>(`/v1/auth/verify`, {
      method: 'POST',
      body: JSON.stringify({ channel: 'email', value: email, code: '000000' })
    });
    this.setToken(token);
    const users = await this.listUsers();
    const user = users.find(u => u.email === email) || ({ id: 'dev', email, display_name: 'Dev User' } as AppUser);
    return { token, user };
  }

  // Minimal implementations mapped to OpenAPI draft
  async getCircles(): Promise<Circle[]> { return this.request('/v1/circles'); }
  async getCircleFeatures(circleId: ID): Promise<string[]> { return this.request(`/v1/circles/${circleId}/features`); }
  async listMembers(circleId: ID): Promise<Membership[]> { return this.request(`/v1/circles/${circleId}/members`); }
  async listUsers(): Promise<AppUser[]> { return this.request('/v1/users'); }
  async createUser(email: string, display_name: string): Promise<AppUser> { 
    return this.request('/v1/users', { method:'POST', body: JSON.stringify({ email, display_name }) }); 
  }
  async inviteMember(circleId: ID, email: string) { return this.request(`/v1/circles/${circleId}/invite`, { method:'POST', body: JSON.stringify({ email }) }); }
  async updateMemberVerification(memberId: ID, verified: boolean) { return this.request(`/v1/members/${memberId}/verify`, { method:'POST', body: JSON.stringify({ verified }) }); }
  async createCircle(name: string, type: string) { return this.request('/v1/circles', { method:'POST', body: JSON.stringify({ name, type }) }); }
  async joinCircle(circleId: ID, role?: string) { return this.request(`/v1/circles/${circleId}/join`, { method:'POST', body: JSON.stringify({ role }) }); }
  async getUserCircles() { return this.request('/v1/users/me/circles'); }
  async verifyUser() { return this.request('/v1/users/verify', { method:'POST', body: JSON.stringify({}) }); }

  // KYC / Now-cell
  async verifyKyc(): Promise<{ status:string; token:string }> { return this.request('/v1/verify', { method:'POST', body: JSON.stringify({}) }); }
  async getNowCell(): Promise<{ cell_id:string }> { return this.request('/v1/now-cell', { method:'POST', body: JSON.stringify({}) }); }

  // Feed
  async getFeed(circleId: ID, lane: 'help' | 'show' = 'help', after?: string, limit: number = 30): Promise<FeedResponse> { 
		const params = new URLSearchParams({ circleId, lane, limit: limit.toString() });
		if (after) params.append('after', after);
		return this.request(`/v1/feed?${params}`); 
	}

	async createPost(circleId: ID, content: string, lane: 'help' | 'show', kind: string = 'signal', mediaUrl?: string, tags: string[] = [], ttlHours: number = 24): Promise<Post> {
		return this.request('/v1/posts', { 
			method: 'POST', 
			body: JSON.stringify({ 
				circle_id: circleId, 
				content, 
				lane, 
				kind, 
				media_url: mediaUrl, 
				tags, 
				ttl_hours: ttlHours 
			}) 
		});
	}

	async reactToPost(postId: ID, type: 'thank' | 'help'): Promise<{ success: boolean; thanks_count: number }> {
		return this.request(`/v1/posts/${postId}/react`, { 
			method: 'POST', 
			body: JSON.stringify({ type }) 
		});
	}

  // Signals
  async listSignals(cellId: ID, opts: { mine?: boolean; after?: string|null; limit?: number } = {}) {
    const q = new URLSearchParams();
    if (opts.mine) q.set('mine', '1');
    if (opts.after) q.set('after', opts.after);
    if (opts.limit) q.set('limit', String(opts.limit));
    const qs = q.toString();
    return this.request(`/v1/cells/${cellId}/signals${qs ? `?${qs}` : ''}`);
  }
  async createSignal(cellId: ID, data: { kind: 'signal'|'swap'|'alert'|'info'; caption: string; tags?: string[]; expiresInHours?: number; media_url?: string|null }) {
    return this.request(`/v1/cells/${cellId}/signals`, { method:'POST', body: JSON.stringify(data) });
  }

  // Swaps explicit helpers
  async createSwap(cellId: ID, data: { caption: string; tags?: string[] }) { return this.request(`/v1/cells/${cellId}/swaps`, { method:'POST', body: JSON.stringify(data) }); }

  // Asks
  async createAsk(cellId: ID, data: { title: string; body?: string; tags?: string[] }) { return this.request(`/v1/cells/${cellId}/asks`, { method:'POST', body: JSON.stringify(data) }); }
  async claimAsk(askId: ID): Promise<Ask> {
		return this.request(`/v1/asks/${askId}/claim`, { method: 'POST' });
	}
  async thankAsk(askId: ID): Promise<Ask> {
		return this.request(`/v1/asks/${askId}/thank`, { method: 'POST' });
	}

  // Moderation
  async report(context_type: string, context_id: ID, reason?: string) { return this.request('/v1/report', { method:'POST', body: JSON.stringify({ context_type, context_id, reason }) }); }
  async reportContent(targetType: 'post' | 'comment' | 'user', targetId: ID, reason: string): Promise<Report> {
		return this.request('/v1/report', { 
			method: 'POST', 
			body: JSON.stringify({ target_type: targetType, target_id: targetId, reason }) 
		});
	}
  async block(user_id: ID) { return this.request('/v1/block', { method:'POST', body: JSON.stringify({ user_id }) }); }
  async blockUser(userId: ID): Promise<Block> {
		return this.request('/v1/block', { 
			method: 'POST', 
			body: JSON.stringify({ user_id: userId }) 
		});
	}

  async getAmenities(circleId: ID): Promise<Amenity[]> { return this.request(`/v1/circles/${circleId}/amenities`); }
  async createBooking(input: CreateBooking): Promise<Booking> { return this.request('/v1/bookings', { method:'POST', body: JSON.stringify(input) }); }
  async listMyBookings(): Promise<Booking[]> { return this.request('/v1/bookings?mine=1'); }
  async adminListBookings(filter: AdminBookingFilter): Promise<Booking[]> {
    const q = new URLSearchParams(filter).toString();
    return this.request(`/v1/admin/bookings?${q}`);
  }
  async updateBookingStatus(id: ID, status: BookingStatus) { return this.request(`/v1/bookings/${id}/status`, { method:'POST', body: JSON.stringify({ status }) }); }
  async checkInBooking(id: ID) { return this.request(`/v1/bookings/${id}/checkin`, { method:'POST' }); }
  async getBookingICS(id: ID) { return this.request(`/v1/bookings/${id}/ics`); }
  async cancelBooking(id: ID) { return this.request(`/v1/bookings/${id}/cancel`, { method:'POST' }); }

  async createIncident(i: Omit<Incident,'id'|'created_at'|'status'>) { return this.request('/v1/incidents', { method:'POST', body: JSON.stringify(i) }); }
  async getIncidentsMine(): Promise<Incident[]> { return this.request('/v1/incidents?mine=1'); }
  async adminListIncidents(filter: AdminIncidentFilter): Promise<Incident[]> {
    const q = new URLSearchParams(filter).toString();
    return this.request(`/v1/admin/incidents?${q}`);
  }

  async listAnnouncements(circleId: ID): Promise<Announcement[]> { return this.request(`/v1/circles/${circleId}/announcements`); }
  async listEvents(circleId: ID): Promise<Event[]> { return this.request(`/v1/circles/${circleId}/events`); }
  async rsvpEvent(eventId: ID, status: 'GOING'|'INTERESTED'|'DECLINED'): Promise<EventRSVP> {
    return this.request(`/v1/events/${eventId}/rsvp`, { method:'POST', body: JSON.stringify({ status }) });
  }
  async listPolls(circleId: ID): Promise<PollWithOptions[]> { return this.request(`/v1/circles/${circleId}/polls`); }
  async getPollVotes(pollId: ID) { return this.request(`/v1/polls/${pollId}/votes`); }
  async votePoll(pollId: ID, optionId: ID, userId: ID) { return this.request(`/v1/polls/${pollId}/vote`, { method:'POST', body: JSON.stringify({ optionId, userId }) }); }

  async createAnnouncement(circleId: ID, title: string, body_md: string, pinned=false) { return this.request(`/v1/circles/${circleId}/announcements`, { method:'POST', body: JSON.stringify({ title, body_md, pinned }) }); }
  async createEvent(circleId: ID, title: string, start_at: string, end_at: string, description?: string) { return this.request(`/v1/circles/${circleId}/events`, { method:'POST', body: JSON.stringify({ title, start_at, end_at, description }) }); }
  async createPoll(circleId: ID, question: string, options: string[], multi=false) { return this.request(`/v1/circles/${circleId}/polls`, { method:'POST', body: JSON.stringify({ question, options, multi }) }); }

  async getKpis(circleId: ID) { return this.request(`/v1/analytics/circles/${circleId}/kpis`); }
  async getForecast(circleId: ID, amenityId?: ID): Promise<ForecastHourly[]> { const q = amenityId?`?amenity_id=${amenityId}`:''; return this.request(`/v1/forecast/circles/${circleId}${q}`); }
  async getAnomalies(circleId: ID): Promise<AnomalyAlert[]> { return this.request(`/v1/analytics/circles/${circleId}/anomalies`); }
  async acknowledgeAnomaly(id: ID) { return this.request(`/v1/anomalies/${id}/ack`, { method:'POST' }); }
  async applyPolicy(args:any) { return this.request('/v1/policies/apply', { method:'POST', body: JSON.stringify(args) }); }

	async getReputation(circleId: ID): Promise<Reputation> {
		return this.request(`/v1/circles/${circleId}/reputation`);
	}

	async getStage(circleId: ID): Promise<StageResponse> {
		return this.request(`/v1/circles/${circleId}/stage`);
	}

	async cleanupTTL(): Promise<{ cleaned_posts: number; remaining_posts: number }> {
		return this.request('/v1/admin/cleanup-ttl', { method: 'POST' });
	}
}

