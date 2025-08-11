const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8082/api/v1';
const FEATURES = (process.env.EXPO_PUBLIC_FEATURE_FLAGS || '').split(',').map(f => f.trim().toLowerCase());

function authHeaders(role, userId) {
  return {
    'Content-Type': 'application/json',
    'X-User-Id': userId || 'alice',
    'X-User-Role': role || 'RESIDENT',
  };
}

export const featureFlags = {
  has: (key) => FEATURES.includes(key.toLowerCase())
};

export const circlesApi = {
  create: (payload) => fetch(`${API_BASE}/circles`, { method: 'POST', headers: authHeaders('ADMIN','superadmin'), body: JSON.stringify(payload)}).then(r=>r.json()),
  mine: () => fetch(`${API_BASE}/circles/mine`, { headers: authHeaders()}).then(r=>r.json()),
  get: (id) => fetch(`${API_BASE}/circles/${id}`, { headers: authHeaders()}).then(r=>r.json()),
  setFeature: (id, featureKey, enabled) => fetch(`${API_BASE}/circles/${id}/features`, { method:'POST', headers: authHeaders('ADMIN'), body: JSON.stringify({ featureKey, enabled })}).then(r=>r.json()),
  addChild: (id, payload) => fetch(`${API_BASE}/circles/${id}/children`, { method:'POST', headers: authHeaders('ADMIN'), body: JSON.stringify(payload)}).then(r=>r.json()),
  proposeEdge: (payload) => fetch(`${API_BASE}/circles/edges`, { method:'POST', headers: authHeaders('ADMIN'), body: JSON.stringify(payload)}).then(r=>r.json()),
  updateEdge: (id, payload) => fetch(`${API_BASE}/circles/edges/${id}`, { method:'PATCH', headers: authHeaders('ADMIN'), body: JSON.stringify(payload)}).then(r=>r.json()),
  addMember: (id, payload) => fetch(`${API_BASE}/circles/${id}/members`, { method:'POST', headers: authHeaders('ADMIN'), body: JSON.stringify(payload)}).then(r=>r.json()),
  listMembers: (id) => fetch(`${API_BASE}/circles/${id}/members`, { headers: authHeaders('ADMIN')}).then(r=>r.json()),
};

export const taskboardApi = {
  createPost: (payload) => fetch(`${API_BASE}/task-posts`, { method:'POST', headers: authHeaders(), body: JSON.stringify(payload)}).then(r=>r.json()),
  listPosts: (circleId, type, status) => {
    const params = new URLSearchParams({ circleId: String(circleId) });
    if (type) params.append('type', type);
    if (status) params.append('status', status);
    return fetch(`${API_BASE}/task-posts?${params.toString()}`, { headers: authHeaders()}).then(r=>r.json());
  },
  createOffer: (postId, payload) => fetch(`${API_BASE}/task-posts/${postId}/offers`, { method:'POST', headers: authHeaders(), body: JSON.stringify(payload)}).then(r=>r.json()),
  updateOffer: (offerId, payload) => fetch(`${API_BASE}/task-offers/${offerId}`, { method:'PATCH', headers: authHeaders(), body: JSON.stringify(payload)}).then(r=>r.json()),
  completePost: (postId) => fetch(`${API_BASE}/task-posts/${postId}/complete`, { method:'POST', headers: authHeaders()}).then(r=>r.json()),
};

export const ordersApi = {
  listMenu: (circleId) => fetch(`${API_BASE}/menu-items?circleId=${circleId}`, { headers: authHeaders()}).then(r=>r.json()),
  addMenu: (payload) => fetch(`${API_BASE}/menu-items`, { method:'POST', headers: authHeaders('ADMIN'), body: JSON.stringify(payload)}).then(r=>r.json()),
  placeOrder: (payload) => fetch(`${API_BASE}/orders`, { method:'POST', headers: authHeaders(), body: JSON.stringify(payload)}).then(r=>r.json()),
  updateOrder: (id, payload) => fetch(`${API_BASE}/orders/${id}`, { method:'PATCH', headers: authHeaders('STAFF'), body: JSON.stringify(payload)}).then(r=>r.json()),
};

export const promosApi = {
  list: (circleId) => fetch(`${API_BASE}/promos?circleId=${circleId}`, { headers: authHeaders()}).then(r=>r.json()),
  create: (payload) => fetch(`${API_BASE}/promos`, { method:'POST', headers: authHeaders('ADMIN'), body: JSON.stringify(payload)}).then(r=>r.json()),
  claim: (id) => fetch(`${API_BASE}/promos/${id}/claim`, { method:'POST', headers: authHeaders()}).then(r=>r.json()),
};

export const analyticsApi = {
  forecast: (amenityId, days=14) => fetch(`${API_BASE}/analytics/amenities/${amenityId}/forecast?days=${days}`, { headers: authHeaders('ADMIN')}).then(r=>r.json()),
  triage: (incidentId) => fetch(`${API_BASE}/analytics/incidents/${incidentId}/triage`, { headers: authHeaders('ADMIN')}).then(r=>r.json()),
  risk: (amenityId) => fetch(`${API_BASE}/analytics/maintenance/risk?amenityId=${amenityId}`, { headers: authHeaders('ADMIN')}).then(r=>r.json()),
  anomalies: (metric, circleId, from, to) => fetch(`${API_BASE}/analytics/anomalies?metric=${metric}&circleId=${circleId}&from=${from}&to=${to}`, { headers: authHeaders('ADMIN')}).then(r=>r.json()),
  ackAnomaly: (id) => fetch(`${API_BASE}/analytics/anomalies/${id}/ack`, { method:'POST', headers: authHeaders('ADMIN')}).then(r=>r.json()),
  summary: () => fetch(`${API_BASE}/analytics/summary/dashboard`, { headers: authHeaders('ADMIN')}).then(r=>r.json()),
};