import type {
  ID, Circle, AppUser, Membership, Amenity, Booking, CreateBooking, BookingStatus,
  Incident, Announcement, Event, EventRSVP, PollWithOptions, ForecastHourly, AnomalyAlert,
  AdminBookingFilter, AdminIncidentFilter
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

  // Minimal implementations mapped to OpenAPI draft
  async getCircles(): Promise<Circle[]> { return this.request('/v1/circles'); }
  async getCircleFeatures(circleId: ID): Promise<string[]> { return this.request(`/v1/circles/${circleId}/features`); }
  async listMembers(circleId: ID): Promise<Membership[]> { return this.request(`/v1/circles/${circleId}/members`); }
  async listUsers(): Promise<AppUser[]> { return this.request('/v1/users'); }

  async getAmenities(circleId: ID): Promise<Amenity[]> { return this.request(`/v1/circles/${circleId}/amenities`); }
  async createBooking(input: CreateBooking): Promise<Booking> { return this.request('/v1/bookings', { method:'POST', body: JSON.stringify(input) }); }
  async listMyBookings(): Promise<Booking[]> { return this.request('/v1/bookings?mine=1'); }
  async adminListBookings(filter: AdminBookingFilter): Promise<Booking[]> {
    const q = new URLSearchParams(filter as any).toString();
    return this.request(`/v1/admin/bookings?${q}`);
  }
  async updateBookingStatus(id: ID, status: BookingStatus) { return this.request(`/v1/bookings/${id}/status`, { method:'POST', body: JSON.stringify({ status }) }); }
  async checkInBooking(id: ID) { return this.request(`/v1/bookings/${id}/checkin`, { method:'POST' }); }
  async getBookingICS(id: ID) { return this.request(`/v1/bookings/${id}/ics`); }

  async createIncident(i: Omit<Incident,'id'|'created_at'|'status'>) { return this.request('/v1/incidents', { method:'POST', body: JSON.stringify(i) }); }
  async getIncidentsMine(): Promise<Incident[]> { return this.request('/v1/incidents?mine=1'); }
  async adminListIncidents(filter: AdminIncidentFilter): Promise<Incident[]> {
    const q = new URLSearchParams(filter as any).toString();
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
}

