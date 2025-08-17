import { ID, AppUser, Circle, Membership, Amenity, Booking, Incident, Announcement, Event, Poll, PollOption, AnomalyAlert, MenuItem } from './types';

// @ts-ignore - JSON fixtures
import circles from '@/fixtures/circles.json';
// @ts-ignore
import users from '@/fixtures/users.json';
// @ts-ignore
import memberships from '@/fixtures/memberships.json';
// @ts-ignore
import amenities from '@/fixtures/amenities.json';
// @ts-ignore
import bookings from '@/fixtures/bookings.json';
// @ts-ignore
import incidents from '@/fixtures/incidents.json';
// @ts-ignore
import announcements from '@/fixtures/announcements.json';
// @ts-ignore
import events from '@/fixtures/events.json';
// @ts-ignore
import polls from '@/fixtures/polls.json';
// @ts-ignore
import poll_options from '@/fixtures/poll_options.json';
// @ts-ignore
import anomaly_alerts from '@/fixtures/anomaly_alerts.json';
// (hotel UI stubs present)
import menu_items from '@/fixtures/menu_items.json';

export interface ApiAdapter {
  // Auth
  loginDev(email: string, role: string, circleId: string): Promise<{ token: string; user: AppUser }>;
  
  // Circles
  getCircles(): Promise<Circle[]>;
  getCircleFeatures(circleId: ID): Promise<string[]>;
  
  // Users & Members
  listUsers(): Promise<AppUser[]>;
  getUserById(id: ID): Promise<AppUser | undefined>;
  listMembers(circleId: ID): Promise<Membership[]>;
  
  // Amenities & Bookings
  getAmenities(circleId: ID): Promise<Amenity[]>;
  createBooking(booking: Omit<Booking, 'id'>): Promise<Booking>;
  getBookings(circleId: ID): Promise<Booking[]>;
  getMyBookings(userId: ID): Promise<Booking[]>;
  updateBookingStatus(bookingId: ID, status: string, approvedBy?: ID): Promise<Booking>;
  checkIn(bookingId: ID): Promise<Booking>;
  
  // Incidents
  createIncident(incident: Omit<Incident, 'id'>): Promise<Incident>;
  getIncidents(circleId: ID): Promise<Incident[]>;
  getMyIncidents(userId: ID): Promise<Incident[]>;
  updateIncidentStatus(incidentId: ID, status: string): Promise<Incident>;
  
  // Communications
  getAnnouncements(circleId: ID): Promise<Announcement[]>;
  createAnnouncement(announcement: Omit<Announcement, 'id'>): Promise<Announcement>;
  getEvents(circleId: ID): Promise<Event[]>;
  createEvent(event: Omit<Event, 'id'>): Promise<Event>;
  getPolls(circleId: ID): Promise<Poll[]>;
  createPoll(poll: Omit<Poll, 'id'>): Promise<Poll>;
  
  // Analytics
  getDemandHourly(circleId: ID, amenityId: ID): Promise<any[]>;
  getForecastHourly(circleId: ID, amenityId: ID): Promise<any[]>;
  getAnomalyAlerts(circleId: ID): Promise<AnomalyAlert[]>;
  acknowledgeAnomaly(alertId: ID): Promise<AnomalyAlert>;
  applyPolicy(policy: any): Promise<void>;
}

export class MockApi implements ApiAdapter {
  private data: any = {};
  private delayMs = 200;

  constructor() {
    this.loadFromStorage();
    if (!this.data || Object.keys(this.data).length === 0) {
      this.data = {
        circles, users, memberships, amenities, bookings, incidents,
        announcements, events, polls, poll_options, anomaly_alerts, menu_items
      };
      this.saveToStorage();
    }
  }

  private async delay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.delayMs));
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('mockApiData');
      if (stored) {
        this.data = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('mockApiData', JSON.stringify(this.data));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  // Auth
  async loginDev(email: string, role: string, circleId: string): Promise<{ token: string; user: AppUser }> {
    await this.delay();
    const user = this.data.users.find((u: AppUser) => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      token: `mock_token_${Date.now()}`,
      user
    };
  }

  // Circles
  async getCircles(): Promise<Circle[]> {
    await this.delay();
    return this.data.circles || [];
  }

  async getCircleFeatures(circleId: ID): Promise<string[]> {
    await this.delay();
    const circle = this.data.circles.find((c: Circle) => c.id === circleId);
    return circle?.features || [];
  }

  // Users & Members
  async listUsers(): Promise<AppUser[]> {
    await this.delay();
    return this.data.users || [];
  }

  async getUserById(id: ID): Promise<AppUser | undefined> {
    await this.delay();
    return (this.data.users || []).find((u: AppUser) => u.id === id);
  }

  async listMembers(circleId: ID): Promise<Membership[]> {
    await this.delay();
    return (this.data.memberships || []).filter((m: Membership) => m.circle_id === circleId);
  }

  // Amenities & Bookings
  async getAmenities(circleId: ID): Promise<Amenity[]> {
    await this.delay();
    return (this.data.amenities || []).filter((a: Amenity) => a.circle_id === circleId);
  }

  async createBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
    await this.delay();
    const newBooking: Booking = {
      ...booking,
      id: `booking_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.data.bookings = this.data.bookings || [];
    this.data.bookings.push(newBooking);
    this.saveToStorage();
    return newBooking;
  }

  async getBookings(circleId: ID): Promise<Booking[]> {
    await this.delay();
    return (this.data.bookings || []).filter((b: Booking) => b.circle_id === circleId);
  }

  async getMyBookings(userId: ID): Promise<Booking[]> {
    await this.delay();
    return (this.data.bookings || []).filter((b: Booking) => b.user_id === userId);
  }

  async updateBookingStatus(bookingId: ID, status: string, approvedBy?: ID): Promise<Booking> {
    await this.delay();
    const booking = this.data.bookings.find((b: Booking) => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    booking.status = status;
    if (approvedBy) {
      booking.approved_by = approvedBy;
      booking.approved_at = new Date().toISOString();
    }
    this.saveToStorage();
    return booking;
  }

  async checkIn(bookingId: ID): Promise<Booking> {
    await this.delay();
    const booking = this.data.bookings.find((b: Booking) => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    booking.checked_in_at = new Date().toISOString();
    this.saveToStorage();
    return booking;
  }

  // Incidents
  async createIncident(incident: Omit<Incident, 'id'>): Promise<Incident> {
    await this.delay();
    const newIncident: Incident = {
      ...incident,
      id: `incident_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.data.incidents = this.data.incidents || [];
    this.data.incidents.push(newIncident);
    this.saveToStorage();
    return newIncident;
  }

  async getIncidents(circleId: ID): Promise<Incident[]> {
    await this.delay();
    return (this.data.incidents || []).filter((i: Incident) => i.circle_id === circleId);
  }

  async getMyIncidents(userId: ID): Promise<Incident[]> {
    await this.delay();
    return (this.data.incidents || []).filter((i: Incident) => i.reporter_id === userId);
  }

  async updateIncidentStatus(incidentId: ID, status: string): Promise<Incident> {
    await this.delay();
    const incident = this.data.incidents.find((i: Incident) => i.id === incidentId);
    if (!incident) {
      throw new Error('Incident not found');
    }
    incident.status = status;
    if (status === 'RESOLVED') {
      incident.resolved_at = new Date().toISOString();
    }
    this.saveToStorage();
    return incident;
  }

  // Communications
  async getAnnouncements(circleId: ID): Promise<Announcement[]> {
    await this.delay();
    return (this.data.announcements || []).filter((a: Announcement) => a.circle_id === circleId);
  }

  async createAnnouncement(announcement: Omit<Announcement, 'id'>): Promise<Announcement> {
    await this.delay();
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `announcement_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.data.announcements = this.data.announcements || [];
    this.data.announcements.push(newAnnouncement);
    this.saveToStorage();
    return newAnnouncement;
  }

  async getEvents(circleId: ID): Promise<Event[]> {
    await this.delay();
    return (this.data.events || []).filter((e: Event) => e.circle_id === circleId);
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    await this.delay();
    const newEvent: Event = {
      ...event,
      id: `event_${Date.now()}`
    };
    this.data.events = this.data.events || [];
    this.data.events.push(newEvent);
    this.saveToStorage();
    return newEvent;
  }

  async getPolls(circleId: ID): Promise<Poll[]> {
    await this.delay();
    return (this.data.polls || []).filter((p: Poll) => p.circle_id === circleId);
  }

  async createPoll(poll: Omit<Poll, 'id'>): Promise<Poll> {
    await this.delay();
    const newPoll: Poll = {
      ...poll,
      id: `poll_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.data.polls = this.data.polls || [];
    this.data.polls.push(newPoll);
    this.saveToStorage();
    return newPoll;
  }

  // Analytics
  async getDemandHourly(circleId: ID, amenityId: ID): Promise<any[]> {
    await this.delay();
    return [];
  }

  async getForecastHourly(circleId: ID, amenityId: ID): Promise<any[]> {
    await this.delay();
    return [];
  }

  async getAnomalyAlerts(circleId: ID): Promise<AnomalyAlert[]> {
    await this.delay();
    return (this.data.anomaly_alerts || []).filter((a: AnomalyAlert) => a.circle_id === circleId);
  }

  async acknowledgeAnomaly(alertId: ID): Promise<AnomalyAlert> {
    await this.delay();
    const alert = this.data.anomaly_alerts.find((a: AnomalyAlert) => a.id === alertId);
    if (!alert) {
      throw new Error('Alert not found');
    }
    alert.status = 'ACKED';
    this.saveToStorage();
    return alert;
  }

  async applyPolicy(policy: any): Promise<void> {
    await this.delay();
    // Mock implementation
    console.log('Applying policy:', policy);
  }
}

export default MockApi;

