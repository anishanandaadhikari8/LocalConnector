// Use 10.0.2.2 for Android emulators to reach host machine localhost
const DEFAULT_API = (() => {
  // Detect Android emulator via React Native Platform if available at runtime
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Platform } = require('react-native');
    if (Platform?.OS === 'android') {
      return 'http://10.0.2.2:8082/api/v1';
    }
  } catch {}
  return 'http://localhost:8082/api/v1';
})();

const API = process.env.EXPO_PUBLIC_API_URL || DEFAULT_API;

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type RequestOptions = { method?: HttpMethod; body?: Record<string, unknown> | undefined; token?: string };
export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  const res = await fetch(`${API}${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as unknown;
    throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status, data: err });
  }
  return (await res.json()) as T;
}

export const api = {
  devMint: (payload: { userId: number; name: string; role: string; unit?: string }) =>
    request<{ token: string }>(`/auth/devMint`, { method: 'POST', body: payload }),

  listAmenities: (token: string) => request(`/amenities`, { token }),
  createAmenity: (token: string, body: Record<string, unknown>) =>
    request(`/amenities`, { method: 'POST', token, body }),

  listMyBookings: (token: string) => request(`/bookings/mine`, { token }),
  listAllBookings: (token: string) => request(`/bookings`, { token }),
  createBooking: (token: string, body: { amenityId: number; startAt: string; endAt: string }) =>
    request(`/bookings`, { method: 'POST', token, body }),
  setBookingStatus: (token: string, id: number, status: string) =>
    request(`/bookings/${id}/status`, { method: 'PATCH', token, body: { status } }),

  listIncidents: (token: string) => request(`/incidents`, { token }),
  reportIncident: (token: string, body: Record<string, unknown>) =>
    request(`/incidents`, { method: 'POST', token, body }),
  setIncidentStatus: (token: string, id: number, status: string) =>
    request(`/incidents/${id}/status`, { method: 'PATCH', token, body: { status } }),

  listAnnouncements: (token: string) => request(`/announcements`, { token }),
  createAnnouncement: (token: string, body: Record<string, unknown>) =>
    request(`/announcements`, { method: 'POST', token, body }),
  pinAnnouncement: (token: string, id: number, pinned: boolean) =>
    request(`/announcements/${id}/pin`, { method: 'PATCH', token, body: { pinned } }),
};


