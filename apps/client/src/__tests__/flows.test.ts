import { describe, it, expect } from 'vitest';
import MockApi from '../api/ApiAdapter';
import apiFactory from '../api';

describe('Core flows (MockApi)', () => {
  it('lists circles and users (mock factory by default)', async () => {
    const api = apiFactory;
    const circles = await api.getCircles();
    const users = await api.listUsers();
    expect(circles.length).toBeGreaterThan(0);
    expect(users.length).toBeGreaterThan(0);
  });

  it('creates a booking and returns an ICS link', async () => {
    const api = apiFactory;
    const c = (await api.getCircles())[0];
    const a = (await api.getAmenities(c.id))[0];
    const u = (await api.listUsers())[0];
    const now = new Date(); const start = new Date(now.getTime()+60*60*1000); const end = new Date(start.getTime()+60*60*1000);
    const iso = (d:Date)=>d.toISOString();
    const b = await api.createBooking({ circle_id:c.id, amenity_id:a.id, user_id:u.id, start_at:iso(start), end_at:iso(end) });
    expect(b.id).toBeTruthy();
    const ics = await api.getBookingICS(b.id);
    expect(ics.startsWith('data:text/calendar')).toBe(true);
  });

  it('creates incident', async () => {
    const api = apiFactory;
    const c = (await api.getCircles())[0];
    const u = (await api.listUsers())[0];
    const inc = await api.createIncident({ circle_id:c.id, reporter_id:u.id, type:'SECURITY', severity:3, description:'Test' });
    expect(inc.status).toBe('OPEN');
  });
});
