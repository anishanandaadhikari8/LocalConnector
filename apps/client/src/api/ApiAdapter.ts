import type {
  ID, Circle, AppUser, Membership, Amenity, Booking, CreateBooking, BookingStatus,
  Incident, Announcement, Event, EventRSVP, Poll, PollWithOptions,
  DemandHourly, ForecastHourly, AnomalyAlert, AdminBookingFilter, AdminIncidentFilter
} from './types';

import circles from '../fixtures/circles.json';
import users from '../fixtures/users.json';
import memberships from '../fixtures/memberships.json';
import amenities from '../fixtures/amenities.json';
import bookings from '../fixtures/bookings.json';
import incidents from '../fixtures/incidents.json';
import announcements from '../fixtures/announcements.json';
import events from '../fixtures/events.json';
import polls from '../fixtures/polls.json';
import poll_options from '../fixtures/poll_options.json';
import anomaly_alerts from '../fixtures/anomaly_alerts.json';

let demand_hourly: DemandHourly[] = [];
let forecast_hourly: ForecastHourly[] = [];

type Store = {
  circles: Circle[]; users: AppUser[]; memberships: Membership[]; amenities: Amenity[];
  bookings: Booking[]; incidents: Incident[]; announcements: Announcement[];
  events: Event[]; polls: Poll[]; poll_options: any[]; poll_votes: any[]; anomaly_alerts: AnomalyAlert[];
  demand_hourly: DemandHourly[]; forecast_hourly: ForecastHourly[];
};

export default class MockApi {
  private storageKey = 'nc_mock';
  private data: Store;

  constructor() {
    const stored = this.load();
    this.data = stored || {
      circles, users, memberships, amenities, bookings, incidents,
      announcements, events, polls, poll_options, poll_votes: [], anomaly_alerts,
      demand_hourly, forecast_hourly
    } as unknown as Store;
    if (!stored) this.save();
  }

  private load(): Store | null { try { const v = localStorage.getItem(this.storageKey); return v ? JSON.parse(v) : null; } catch { return null; } }
  private save() { try { localStorage.setItem(this.storageKey, JSON.stringify(this.data)); } catch {} }
  private async delay(ms=200){ await new Promise(r=>setTimeout(r,ms)); }

  async loginDev(email: string, role: string, circleId: ID) {
    await this.delay(); const user = this.data.users.find(u=>u.email===email);
    if (!user) throw new Error('User not found');
    const token = btoa(JSON.stringify({ sub: email, role, circleId })); return { token, user };
  }

  async getCircles(): Promise<Circle[]> { await this.delay(); return this.data.circles; }
  async getCircleFeatures(circleId: ID): Promise<string[]> { await this.delay(); return this.data.circles.find(c=>c.id===circleId)?.features || []; }
  async listMembers(circleId: ID): Promise<Membership[]> { await this.delay(); return this.data.memberships.filter(m=>m.circle_id===circleId); }
  async listUsers(): Promise<AppUser[]> { await this.delay(); return this.data.users; }

  async getAmenities(circleId: ID): Promise<Amenity[]> { await this.delay(); return this.data.amenities.filter(a=>a.circle_id===circleId); }

  async createBooking(input: CreateBooking): Promise<Booking> {
    await this.delay();
    const overlaps = this.data.bookings.some(b =>
      b.circle_id===input.circle_id && b.amenity_id===input.amenity_id &&
      ['PENDING','APPROVED'].includes(b.status) &&
      !(b.end_at <= input.start_at || b.start_at >= input.end_at)
    );
    const requiresApproval = this.data.amenities.find(a=>a.id===input.amenity_id)?.requires_approval ?? true;
    const booking: Booking = {
      id: String(Date.now()), circle_id: input.circle_id, amenity_id: input.amenity_id, user_id: input.user_id,
      start_at: input.start_at, end_at: input.end_at,
      status: requiresApproval ? 'PENDING' : (overlaps ? 'PENDING' : 'APPROVED'),
    };
    this.data.bookings.push(booking); this.save(); return booking;
  }
  async listMyBookings(): Promise<Booking[]> { await this.delay(); return this.data.bookings; }
  async adminListBookings(filter: AdminBookingFilter): Promise<Booking[]> {
    await this.delay();
    return this.data.bookings.filter(b =>
      b.circle_id===filter.circle_id &&
      (!filter.amenity_id || b.amenity_id===filter.amenity_id) &&
      (!filter.status || b.status===filter.status)
    );
  }
  async updateBookingStatus(id: ID, status: BookingStatus) {
    await this.delay(); const b=this.data.bookings.find(x=>x.id===id); if(!b) throw new Error('Booking not found');
    b.status=status; if(status==='APPROVED') b.approved_at=new Date().toISOString(); this.save(); return b;
  }
  async checkInBooking(id: ID) { await this.delay(); const b=this.data.bookings.find(x=>x.id===id); if(!b) throw new Error('Not found'); b.checked_in_at=new Date().toISOString(); this.save(); return b; }
  async getBookingICS(id: ID) {
    await this.delay(); const b=this.data.bookings.find(x=>x.id===id); if(!b) throw new Error('Not found');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${b.id}
DTSTART:${b.start_at.replace(/[-:]/g,'').replace('.000','').replace('Z','Z')}
DTEND:${b.end_at.replace(/[-:]/g,'').replace('.000','').replace('Z','Z')}
SUMMARY:Amenity Booking
END:VEVENT
END:VCALENDAR`;
    return 'data:text/calendar;charset=utf8,' + encodeURIComponent(ics);
  }

  async createIncident(i: Omit<Incident,'id'|'created_at'|'status'>) {
    await this.delay(); const inc: Incident={...i,id:String(Date.now()),created_at:new Date().toISOString(),status:'OPEN'};
    this.data.incidents.push(inc); this.save(); return inc;
  }
  async getIncidentsMine(): Promise<Incident[]> { await this.delay(); return this.data.incidents; }
  async adminListIncidents(_f: AdminIncidentFilter): Promise<Incident[]> { await this.delay(); return this.data.incidents; }

  async listAnnouncements(circleId: ID): Promise<Announcement[]> { await this.delay(); return this.data.announcements.filter(a=>a.circle_id===circleId); }
  async listEvents(circleId: ID): Promise<Event[]> { await this.delay(); return this.data.events.filter(e=>e.circle_id===circleId); }
  async rsvpEvent(eventId: ID, status: 'GOING'|'INTERESTED'|'DECLINED'): Promise<EventRSVP> {
    await this.delay(); return { id:String(Date.now()), event_id:eventId, user_id:'dev', status };
  }
  async listPolls(circleId: ID): Promise<PollWithOptions[]> {
    await this.delay();
    const optsByPoll = (pollId:ID)=>this.data.poll_options.filter((o:any)=>o.poll_id===pollId);
    return this.data.polls.filter(p=>p.circle_id===circleId).map(p=>({ ...p, options: optsByPoll(p.id) }));
  }

  async getPollVotes(pollId: ID) {
    await this.delay();
    return this.data.poll_votes.filter(v => v.poll_id === pollId);
  }
  async votePoll(pollId: ID, optionId: ID, userId: ID) {
    await this.delay();
    // single-choice: remove existing vote for this user+poll
    this.data.poll_votes = this.data.poll_votes.filter(v => !(v.poll_id === pollId && v.user_id === userId));
    this.data.poll_votes.push({ id: String(Date.now()), poll_id: pollId, option_id: optionId, user_id: userId });
    this.save();
  }

  // Comms create APIs (mock)
  async createAnnouncement(circleId: ID, title: string, body_md: string, pinned=false) {
    await this.delay();
    const a: Announcement = { id:String(Date.now()), circle_id:circleId, author_id:'dev', title, body_md, pinned, created_at:new Date().toISOString() };
    this.data.announcements.unshift(a); this.save(); return a;
  }
  async createEvent(circleId: ID, title: string, start_at: string, end_at: string, description?: string) {
    await this.delay();
    const e: Event = { id:String(Date.now()), circle_id:circleId, title, start_at, end_at, description } as Event;
    this.data.events.unshift(e); this.save(); return e;
  }
  async createPoll(circleId: ID, question: string, options: string[], multi=false) {
    await this.delay();
    const p: Poll = { id:String(Date.now()), circle_id:circleId, question, multi };
    this.data.polls.unshift(p);
    options.forEach((text) => this.data.poll_options.push({ id:String(Date.now()+Math.random()), poll_id:p.id, text }));
    this.save();
    return p;
  }

  async getKpis(_circleId: ID) { await this.delay(); return [
    { label:'Bookings/week', value:'128' }, { label:'Avg approval time', value:'2.1h' },
    { label:'Incident MTTR', value:'5.4h' }, { label:'% check-ins', value:'72%' },
  ]; }
  async getForecast(_circleId: ID, _amenityId?: ID): Promise<ForecastHourly[]> { await this.delay(); return this.data.forecast_hourly; }
  async getAnomalies(_circleId: ID): Promise<AnomalyAlert[]> { await this.delay(); return this.data.anomaly_alerts; }
  async acknowledgeAnomaly(_id: ID) { await this.delay(); }
  async applyPolicy(_args:any) { await this.delay(); }
}