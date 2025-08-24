const http = require('http');
const url = require('url');

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Enhanced data store with reputation and social features
const store = {
	users: [],
	circles: [],
	memberships: [],
	posts: [], // Enhanced posts with lanes and TTL
	asks: [],
	events: [],
	bookings: [],
	incidents: [],
	reputation: [], // New: per-circle reputation
	reports: [], // New: moderation reports
	blocks: [], // New: user blocks
	signals: [],
	tasks: [],
	bulletins: [],
	events: [],
	event_rsvps: [],
	reports: [],
	blocks: [],
	circles: [],
	users: [],
	memberships: [],
	polls: [],
	poll_options: [],
	poll_votes: [],
	anomalies: [],
	forecast: [],
	kpis: [
		{ label: 'Bookings/week', value: '128' },
		{ label: 'Avg approval time', value: '2.1h' },
		{ label: 'Incident MTTR', value: '5.4h' },
		{ label: '% check-ins', value: '72%' },
	],
	amenities: [],
	bookings: [],
	incidents: [],
	threads: [],
	thread_messages: [],
	nowcell_switches: {},
};

function json(res, code, data) {
	res.writeHead(code, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	});
	res.end(JSON.stringify(data));
}

function noContent(res) {
	res.writeHead(204, {
		'Access-Control-Allow-Origin': '*',
	});
	res.end();
}

function badRequest(res, message) {
	json(res, 400, { error: message || 'Bad Request' });
}

function notFound(res) {
	json(res, 404, { error: 'Not found' });
}

function forbidden(res, message) { json(res, 403, { error: message || 'Forbidden' }); }
function tooMany(res, message) { json(res, 429, { error: message || 'Too Many Requests' }); }
function isAdminForCircle(userId, circleId) {
	const m = store.memberships.find((x)=> x.user_id===userId && x.circle_id===circleId);
	if (!m) return false; return m.role && m.role !== 'RESIDENT';
}

function parseBody(req) {
	return new Promise((resolve) => {
		let body = '';
		req.on('data', (chunk) => (body += chunk));
		req.on('end', () => {
			try {
				resolve(body ? JSON.parse(body) : {});
			} catch {
				resolve({});
			}
		});
	});
}

function parseAuth(req) {
	const auth = req.headers['authorization'] || '';
	if (auth.startsWith('Bearer ')) {
		const token = auth.slice(7);
		return { userId: token === 'dev-token' ? 'dev' : 'dev' };
	}
	return { userId: 'dev' };
}

function ensureSeed() {
	if (store.circles.length === 0) {
		store.circles = [
			{ id: 'apt-1', name: 'Maple Apartments', type: 'APARTMENT', created_at: new Date().toISOString() },
			{ id: 'hotel-1', name: 'Sunset Hotel', type: 'HOTEL', created_at: new Date().toISOString() },
			{ id: 'office-1', name: 'Cedar Offices', type: 'OFFICE', created_at: new Date().toISOString() },
			{ id: 'org-1', name: 'Cobalt Corp', type: 'OFFICE', created_at: new Date().toISOString() },
		];
	}
	if (store.users.length === 0) {
		store.users = [
			{ id: 'u1', email: 'alice@apt.test', display_name: 'Alice Resident' },
			{ id: 'u2', email: 'bob@apt.test', display_name: 'Bob Admin' },
			{ id: 'u3', email: 'carol@hotel.test', display_name: 'Carol Staff' },
			{ id: 'u4', email: 'dave@cobalt.test', display_name: 'Dave Employee' },
		];
	}
	if (store.memberships.length === 0) {
		store.memberships = [
			{ id: 'm1', circle_id: 'apt-1', user_id: 'u1', role: 'RESIDENT', verified: true },
			{ id: 'm2', circle_id: 'apt-1', user_id: 'u2', role: 'ADMIN', verified: true },
			{ id: 'm3', circle_id: 'hotel-1', user_id: 'u3', role: 'STAFF', verified: true },
			{ id: 'm4', circle_id: 'org-1', user_id: 'u4', role: 'STAFF', verified: true },
		];
	}
	if (store.amenities.length === 0) {
		store.amenities = [
			{ id: 'am-1', circle_id: 'apt-1', name: 'Gym', kind: 'GENERAL', hours_json: '{}', capacity: 30, slot_mins: 60, requires_approval: false, cancel_window_mins: 60 },
			{ id: 'am-2', circle_id: 'apt-1', name: 'Rooftop', kind: 'ROOM', hours_json: '{}', capacity: 50, slot_mins: 120, requires_approval: true, cancel_window_mins: 120 },
		];
	}
}

const server = http.createServer(async (req, res) => {
	const parsed = url.parse(req.url, true);
	const method = req.method || 'GET';
	const path = parsed.pathname || '/';
	const q = parsed.query || {};
	const { userId } = parseAuth(req);
	console.log(`[api] ${method} ${path}`);

	// CORS preflight
	if (method === 'OPTIONS') {
		res.writeHead(204, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		});
		return res.end();
	}

	if (method === 'GET' && path === '/healthz') {
		return json(res, 200, { status: 'ok' });
	}

	if (method === 'POST' && path === '/v1/auth/otp') {
		return noContent(res);
	}

	if (method === 'POST' && path === '/v1/auth/verify') {
		return json(res, 200, { token: 'dev-token' });
	}

	if (method === 'POST' && path === '/v1/verify') {
		return json(res, 200, { status: 'approved', token: 'verify-token' });
	}

	if (method === 'POST' && path === '/v1/now-cell') {
		const today = new Date().toISOString().slice(0,10);
		const entry = store.nowcell_switches[userId] || { count:0, day: today };
		if (entry.day !== today) { entry.day = today; entry.count = 0; }
		if (entry.count >= 3) return tooMany(res, 'NowCell switches exceeded for today');
		entry.count += 1; store.nowcell_switches[userId] = entry;
		return json(res, 200, { cell_id: '884c8d364dbffff' });
	}

	// Bootstrap seed
	if (method === 'GET' && path === '/v1/circles') {
		ensureSeed();
		return json(res, 200, store.circles);
	}
	const circleFeatures = path.match(/^\/v1\/circles\/([^/]+)\/features$/);
	if (circleFeatures && method === 'GET') {
		return json(res, 200, ['BOOKINGS','EVENTS','INCIDENTS','COMMS','ANALYTICS']);
	}
	if (method === 'GET' && path === '/v1/users') {
		ensureSeed();
		return json(res, 200, store.users);
	}
	if (method === 'POST' && path === '/v1/users') {
		const body = await parseBody(req);
		if (!body.email || !body.display_name) return badRequest(res, 'email and display_name required');
		const u = { id: String(Date.now()), email: body.email, display_name: body.display_name };
		store.users.push(u);
		return json(res, 201, u);
	}

	// Create circle
	if (method === 'POST' && path === '/v1/circles') {
		const body = await parseBody(req);
		if (!body.name || !body.type) return badRequest(res, 'name and type required');
		const c = { 
			id: String(Date.now()), 
			name: body.name, 
			type: body.type,
			created_by: userId,
			created_at: new Date().toISOString()
		};
		store.circles.push(c);
		// Auto-add creator as admin
		const m = { 
			id: String(Date.now() + 1), 
			circle_id: c.id, 
			user_id: userId, 
			role: 'ADMIN',
			verified: true
		};
		store.memberships.push(m);
		return json(res, 201, c);
	}

	// Join circle
	const joinMatch = path.match(/^\/v1\/circles\/([^/]+)\/join$/);
	if (joinMatch && method === 'POST') {
		const circleId = joinMatch[1];
		const body = await parseBody(req);
		const circle = store.circles.find(c => c.id === circleId);
		if (!circle) return notFound(res);
		
		// Check if already a member
		const existing = store.memberships.find(m => m.circle_id === circleId && m.user_id === userId);
		if (existing) return json(res, 200, existing);
		
		const m = { 
			id: String(Date.now()), 
			circle_id: circleId, 
			user_id: userId, 
			role: body.role || 'RESIDENT',
			verified: false
		};
		store.memberships.push(m);
		return json(res, 201, m);
	}
	const addMember = path.match(/^\/v1\/circles\/([^/]+)\/members$/);
	if (addMember && method === 'POST') {
		const circleId = addMember[1]; const body = await parseBody(req);
		if (!body.user_id || !body.role) return badRequest(res, 'user_id and role required');
		const m = { id: String(Date.now()), circle_id: circleId, user_id: body.user_id, role: body.role };
		store.memberships.push(m);
		return json(res, 201, m);
	}
	const circleMembers = path.match(/^\/v1\/circles\/([^/]+)\/members$/);
	if (circleMembers && method === 'GET') {
		ensureSeed();
		const circleId = circleMembers[1];
		return json(res, 200, store.memberships.filter(m=>m.circle_id===circleId));
	}

	// Amenities
	const circleAmenities = path.match(/^\/v1\/circles\/([^/]+)\/amenities$/);
	if (circleAmenities && method === 'GET') {
		ensureSeed();
		const circleId = circleAmenities[1];
		return json(res, 200, store.amenities.filter(a=>a.circle_id===circleId));
	}

	// Minimal moderation
	if (method === 'POST' && path === '/v1/report') {
		const body = await parseBody(req);
		if (!body.context_type || !body.context_id) return badRequest(res, 'context required');
		const r = { id: String(Date.now()), reporter_id: userId, ...body, created_at: new Date().toISOString() };
		store.reports.push(r);
		return json(res, 201, r);
	}
	if (method === 'POST' && path === '/v1/block') {
		const body = await parseBody(req);
		if (!body.user_id) return badRequest(res, 'user_id required');
		const b = { id: String(Date.now()), blocker_id: userId, blocked_id: body.user_id, created_at: new Date().toISOString() };
		store.blocks.push(b);
		return json(res, 201, b);
	}

	// Enhanced feed with Help/Show lanes
	if (method === 'GET' && path.startsWith('/v1/feed')) {
		const url = new URL(req.url, `http://${req.headers.host}`);
		const circleId = url.searchParams.get('circleId');
		const lane = url.searchParams.get('lane') || 'help'; // Default to help lane
		const after = url.searchParams.get('after');
		const limit = parseInt(url.searchParams.get('limit') || '30');
		const mine = url.searchParams.get('mine') === 'true';
		const ring = url.searchParams.get('ring');

		// Get posts for this circle
		let posts = store.posts.filter(p => p.circle_id === circleId);
		
		// Filter by lane
		if (lane === 'help') {
			posts = posts.filter(p => p.lane === 'help' || p.lane === 'ask' || p.lane === 'safety');
		} else if (lane === 'show') {
			posts = posts.filter(p => p.lane === 'show' || p.lane === 'entertainment');
		}

		// Filter by mine if requested
		if (mine) {
			posts = posts.filter(p => p.author_id === userId);
		}

		// Apply ranking (simple for now)
		posts.sort((a, b) => {
			// Help lane: prioritize asks and safety
			if (lane === 'help') {
				const aPriority = a.lane === 'ask' || a.lane === 'safety' ? 10 : 1;
				const bPriority = b.lane === 'ask' || b.lane === 'safety' ? 10 : 1;
				if (aPriority !== bPriority) return bPriority - aPriority;
			}
			// Show lane: prioritize by thanks and recency
			if (lane === 'show') {
				const aScore = (a.thanks_count || 0) + (new Date(a.created_at).getTime() / 1000000);
				const bScore = (b.thanks_count || 0) + (new Date(b.created_at).getTime() / 1000000);
				return bScore - aScore;
			}
			return new Date(b.created_at) - new Date(a.created_at);
		});

		// Pagination
		if (after) {
			const afterIndex = posts.findIndex(p => p.id === after);
			posts = posts.slice(afterIndex + 1);
		}
		posts = posts.slice(0, limit);

		// Add reputation data to posts
		const postsWithRep = posts.map(post => {
			const authorRep = store.reputation.find(r => r.user_id === post.author_id && r.circle_id === circleId);
			return {
				...post,
				author_reputation: authorRep ? {
					trust_score: authorRep.trust_score,
					thanks_count: authorRep.thanks_count,
					badges: authorRep.badges || []
				} : null
			};
		});

		return json(res, 200, {
			posts: postsWithRep,
			next_cursor: posts.length === limit ? posts[posts.length - 1].id : null,
			lane: lane,
			total: posts.length
		});
	}

	// Enhanced post creation with lanes and TTL
	if (method === 'POST' && path === '/v1/posts') {
		const body = await parseBody(req);
		if (!body.circle_id || !body.content || !body.lane) {
			return badRequest(res, 'circle_id, content, and lane required');
		}

		// Check if user is member of circle
		const membership = store.memberships.find(m => m.circle_id === body.circle_id && m.user_id === userId);
		if (!membership) {
			return forbidden(res, 'Not a member of this circle');
		}

		// Check Creator Mode requirements for Show lane
		if (body.lane === 'show') {
			const userRep = store.reputation.find(r => r.user_id === userId && r.circle_id === body.circle_id);
			if (!userRep || userRep.trust_score < 3.0 || userRep.thanks_count < 3) {
				return forbidden(res, 'Creator Mode required for Show lane');
			}
		}

		const post = {
			id: String(Date.now()),
			author_id: userId,
			circle_id: body.circle_id,
			content: body.content,
			lane: body.lane, // 'help' or 'show'
			kind: body.kind || 'signal', // 'signal', 'ask', 'event', etc.
			media_url: body.media_url,
			tags: body.tags || [],
			ttl_hours: body.ttl_hours || 24,
			created_at: new Date().toISOString(),
			expires_at: new Date(Date.now() + (body.ttl_hours || 24) * 60 * 60 * 1000).toISOString(),
			thanks_count: 0,
			reports_count: 0
		};

		store.posts.push(post);

		// If it's an ask, create ask record
		if (body.kind === 'ask') {
			const ask = {
				post_id: post.id,
				status: 'open',
				claimer_id: null,
				claimed_at: null,
				closed_at: null
			};
			store.asks.push(ask);
		}

		return json(res, 201, post);
	}

	// Enhanced post reactions (Thanks/Help)
	if (method === 'POST' && path.match(/^\/v1\/posts\/([^/]+)\/react$/)) {
		const postId = path.match(/^\/v1\/posts\/([^/]+)\/react$/)[1];
		const body = await parseBody(req);
		
		const post = store.posts.find(p => p.id === postId);
		if (!post) return notFound(res);

		if (body.type === 'thank') {
			post.thanks_count = (post.thanks_count || 0) + 1;
			
			// Update author reputation
			let authorRep = store.reputation.find(r => r.user_id === post.author_id && r.circle_id === post.circle_id);
			if (!authorRep) {
				authorRep = {
					user_id: post.author_id,
					circle_id: post.circle_id,
					trust_score: 2.5,
					thanks_count: 0,
					claims_completed: 0,
					badges: []
				};
				store.reputation.push(authorRep);
			}
			
			authorRep.thanks_count += 1;
			authorRep.trust_score = Math.min(5.0, authorRep.trust_score + 0.02);
			
			// Check for badges
			if (authorRep.thanks_count >= 3 && !authorRep.badges.includes('Helper')) {
				authorRep.badges.push('Helper');
			}
		}

		return json(res, 200, { success: true, thanks_count: post.thanks_count });
	}

	// Enhanced ask claim with reputation
	if (method === 'POST' && path.match(/^\/v1\/asks\/([^/]+)\/claim$/)) {
		const askId = path.match(/^\/v1\/asks\/([^/]+)\/claim$/)[1];
		
		const ask = store.asks.find(a => a.post_id === askId);
		if (!ask || ask.status !== 'open') {
			return badRequest(res, 'Ask not available for claiming');
		}

		ask.status = 'claimed';
		ask.claimer_id = userId;
		ask.claimed_at = new Date().toISOString();

		return json(res, 200, ask);
	}

	// Enhanced ask thank with reputation
	if (method === 'POST' && path.match(/^\/v1\/asks\/([^/]+)\/thank$/)) {
		const askId = path.match(/^\/v1\/asks\/([^/]+)\/thank$/)[1];
		
		const ask = store.asks.find(a => a.post_id === askId);
		if (!ask || ask.status !== 'claimed' || ask.claimer_id !== userId) {
			return badRequest(res, 'Invalid thank request');
		}

		ask.status = 'done';
		ask.closed_at = new Date().toISOString();

		// Update claimer reputation
		let claimerRep = store.reputation.find(r => r.user_id === ask.claimer_id && r.circle_id === ask.circle_id);
		if (!claimerRep) {
			claimerRep = {
				user_id: ask.claimer_id,
				circle_id: ask.circle_id,
				trust_score: 2.5,
				thanks_count: 0,
				claims_completed: 0,
				badges: []
			};
			store.reputation.push(claimerRep);
		}
		
		claimerRep.claims_completed += 1;
		claimerRep.trust_score = Math.min(5.0, claimerRep.trust_score + 0.05);

		// Check for badges
		if (claimerRep.claims_completed >= 3 && !claimerRep.badges.includes('Helper')) {
			claimerRep.badges.push('Helper');
		}

		return json(res, 200, ask);
	}

	// Get user reputation in a circle
	if (method === 'GET' && path.match(/^\/v1\/circles\/([^/]+)\/reputation$/)) {
		const circleId = path.match(/^\/v1\/circles\/([^/]+)\/reputation$/)[1];
		
		let reputation = store.reputation.find(r => r.user_id === userId && r.circle_id === circleId);
		if (!reputation) {
			reputation = {
				user_id: userId,
				circle_id: circleId,
				trust_score: 2.5,
				thanks_count: 0,
				claims_completed: 0,
				badges: []
			};
		}

		// Add Creator Mode status
		const creatorMode = {
			is_unlocked: reputation.trust_score >= 3.0 && reputation.thanks_count >= 3,
			criteria: {
				trust_score: reputation.trust_score,
				thanks_count: reputation.thanks_count,
				posts_count: store.posts.filter(p => p.author_id === userId && p.circle_id === circleId).length
			},
			perks: {
				max_clip_duration: 45,
				can_schedule: true,
				can_duet: true
			}
		};

		return json(res, 200, { ...reputation, creator_mode: creatorMode });
	}

	// Report system
	if (method === 'POST' && path === '/v1/report') {
		const body = await parseBody(req);
		if (!body.target_type || !body.target_id || !body.reason) {
			return badRequest(res, 'target_type, target_id, and reason required');
		}

		const report = {
			id: String(Date.now()),
			reporter_id: userId,
			target_type: body.target_type, // 'post', 'comment', 'user'
			target_id: body.target_id,
			reason: body.reason,
			status: 'queue',
			created_at: new Date().toISOString()
		};

		store.reports.push(report);

		// Update target's report count
		if (body.target_type === 'post') {
			const post = store.posts.find(p => p.id === body.target_id);
			if (post) {
				post.reports_count = (post.reports_count || 0) + 1;
			}
		}

		return json(res, 201, report);
	}

	// Block user
	if (method === 'POST' && path === '/v1/block') {
		const body = await parseBody(req);
		if (!body.user_id) {
			return badRequest(res, 'user_id required');
		}

		const block = {
			blocker_id: userId,
			blocked_id: body.user_id,
			created_at: new Date().toISOString()
		};

		store.blocks.push(block);
		return json(res, 201, block);
	}

	// Stage (weekly spotlight) for Show lane
	if (method === 'GET' && path.match(/^\/v1\/circles\/([^/]+)\/stage$/)) {
		const circleId = path.match(/^\/v1\/circles\/([^/]+)\/stage$/)[1];
		
		// Get top Show posts from last 7 days
		const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
		const showPosts = store.posts.filter(p => 
			p.circle_id === circleId && 
			p.lane === 'show' && 
			new Date(p.created_at) > weekAgo &&
			(p.reports_count || 0) < 3 // Filter out heavily reported posts
		);

		// Rank by thanks and recency
		const rankedPosts = showPosts
			.map(post => ({
				...post,
				score: (post.thanks_count || 0) * 10 + (new Date(post.created_at).getTime() / 1000000)
			}))
			.sort((a, b) => b.score - a.score)
			.slice(0, 10);

		return json(res, 200, {
			stage_posts: rankedPosts,
			week_start: weekAgo.toISOString(),
			next_stage: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
		});
	}

	// TTL cleanup (should run periodically)
	if (method === 'POST' && path === '/v1/admin/cleanup-ttl') {
		const now = new Date();
		const expiredPosts = store.posts.filter(p => new Date(p.expires_at) < now);
		
		// Remove expired posts
		store.posts = store.posts.filter(p => new Date(p.expires_at) >= now);
		
		// Remove associated asks
		store.asks = store.asks.filter(a => !expiredPosts.find(p => p.id === a.post_id));

		return json(res, 200, { 
			cleaned_posts: expiredPosts.length,
			remaining_posts: store.posts.length
		});
	}

	// /v1/cells/:cell_id/signals
	const signalMatch = path.match(/^\/v1\/cells\/([^/]+)\/signals$/);
	if (signalMatch) {
		const cellId = signalMatch[1];
		if (method === 'GET') {
			const after = typeof q.after === 'string' ? q.after : null;
			const limit = q.limit ? Math.max(1, Math.min(100, Number(q.limit))) : 30;
			let items = store.signals.filter((s) => s.cell_id === cellId);
			if (q.mine === '1') items = items.filter(s => s.author_id === userId);
			items.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
			if (after) items = items.filter((s) => (s.created_at || '') < after);
			const page = items.slice(0, limit);
			const next = page.length === limit ? page[page.length - 1].created_at : null;
			return json(res, 200, { items: page, next });
		}
		if (method === 'POST') {
			const body = await parseBody(req);
			if (!body.kind) return badRequest(res, 'kind required');
			const windowMs = 5 * 60 * 1000; const since = Date.now() - windowMs;
			const recent = store.signals.filter(s=> s.author_id===userId && new Date(s.created_at).getTime() >= since);
			if (recent.length >= 10) return tooMany(res, 'Posting too fast');
			const now = new Date();
			const expires = new Date(now.getTime() + ((body.expiresInHours ?? 24) * 3600 * 1000));
			const s = {
				id: String(Date.now()),
				author_id: userId,
				scope: 'cell',
				cell_id: cellId,
				kind: body.kind,
				caption: body.caption,
				media_url: body.media_url ?? null,
				tags: Array.isArray(body.tags) ? body.tags : [],
				created_at: now.toISOString(),
				expires_at: expires.toISOString(),
			};
			store.signals.unshift(s);
			return json(res, 201, s);
		}
	}

	// Swaps alias: /v1/cells/:cell_id/swaps
	const swapMatch = path.match(/^\/v1\/cells\/([^/]+)\/swaps$/);
	if (swapMatch) {
		const cellId = swapMatch[1];
		if (method === 'GET') {
			let items = store.signals.filter((s)=> s.cell_id===cellId && s.kind==='swap');
			items.sort((a,b)=> (b.created_at||'').localeCompare(a.created_at||''));
			return json(res, 200, { items, next: null });
		}
		if (method === 'POST') {
			const body = await parseBody(req);
			const now = new Date();
			const s = { id:String(Date.now()), author_id:userId, scope:'cell', cell_id:cellId, kind:'swap', caption: body.caption||'', tags: Array.isArray(body.tags)?body.tags:[], created_at: now.toISOString(), expires_at: new Date(now.getTime()+86400000).toISOString() };
			store.signals.unshift(s);
			return json(res, 201, s);
		}
	}

	// /v1/cells/:cell_id/asks
	const asksMatch = path.match(/^\/v1\/cells\/([^/]+)\/asks$/);
	if (asksMatch) {
		const cellId = asksMatch[1];
		if (method === 'POST') {
			const body = await parseBody(req);
			const now = new Date();
			const a = {
				id: String(Date.now()),
				author_id: userId,
				scope: 'cell',
				cell_id: cellId,
				title: body.title || '',
				body: body.body || '',
				tags: Array.isArray(body.tags) ? body.tags : [],
				status: 'OPEN',
				created_at: now.toISOString(),
			};
			store.tasks.unshift(a);
			return json(res, 201, a);
		}
	}

	// /v1/asks/:id/claim
	const claimMatch = path.match(/^\/v1\/asks\/([^/]+)\/claim$/);
	if (claimMatch && method === 'POST') {
		const id = claimMatch[1];
		const a = store.tasks.find((x) => x.id === id);
		if (!a) return notFound(res);
		a.status = 'CLAIMED';
		a.claimer_id = userId;
		return json(res, 200, a);
	}

	// /v1/asks/:id/thank
	const thankMatch = path.match(/^\/v1\/asks\/([^/]+)\/thank$/);
	if (thankMatch && method === 'POST') {
		const id = thankMatch[1];
		const a = store.tasks.find((x) => x.id === id);
		if (!a) return notFound(res);
		a.status = 'DONE';
		a.closed_at = new Date().toISOString();
		return json(res, 200, a);
	}

	// Events in a cell
	const eventsMatch = path.match(/^\/v1\/cells\/([^/]+)\/events$/);
	if (eventsMatch) {
		const cellId = eventsMatch[1];
		if (method === 'GET') {
			const after = typeof q.after === 'string' ? q.after : null;
			const limit = q.limit ? Math.max(1, Math.min(100, Number(q.limit))) : 30;
			let items = store.events.filter((e) => e.cell_id === cellId);
			items.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
			if (after) items = items.filter((e) => (e.created_at || '') < after);
			const page = items.slice(0, limit);
			const next = page.length === limit ? page[page.length - 1].created_at : null;
			return json(res, 200, { items: page, next });
		}
		if (method === 'POST') {
			const body = await parseBody(req);
			const now = new Date();
			const ev = {
				id: String(Date.now()),
				title: body.title || '',
				starts_at: body.start_at || body.starts_at || now.toISOString(),
				ends_at: body.end_at || body.ends_at || new Date(now.getTime() + 3600000).toISOString(),
				location_hint: body.location_hint || null,
				scope: 'cell',
				cell_id: cellId,
				created_at: now.toISOString(),
			};
			store.events.unshift(ev);
			return json(res, 201, ev);
		}
	}

	// Events by circle (alias) — include RSVP counts
	const circleEvents = path.match(/^\/v1\/circles\/([^/]+)\/events$/);
	if (circleEvents) {
		const circleId = circleEvents[1];
		if (method === 'GET') {
			let items = store.events.filter((e) => e.circle_id === circleId || e.cell_id === circleId);
			items.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
			const withCounts = items.map((e) => {
				const rsvps = store.event_rsvps.filter((r) => r.event_id === e.id);
				const counts = { GOING: 0, INTERESTED: 0, DECLINED: 0 };
				rsvps.forEach((r) => {
					counts[r.status] = (counts[r.status] || 0) + 1;
				});
				return { ...e, rsvp_counts: counts };
			});
			return json(res, 200, withCounts);
		}
		if (method === 'POST') {
			const body = await parseBody(req);
			const now = new Date();
			const ev = {
				id: String(Date.now()),
				title: body.title || '',
				starts_at: body.start_at || body.starts_at || now.toISOString(),
				ends_at: body.end_at || body.ends_at || new Date(now.getTime() + 3600000).toISOString(),
				location_hint: body.location_hint || null,
				scope: 'circle',
				circle_id: circleId,
				created_at: now.toISOString(),
			};
			store.events.unshift(ev);
			return json(res, 201, ev);
		}
	}

	// RSVP to an event
	const rsvpMatch = path.match(/^\/v1\/events\/([^/]+)\/rsvp$/);
	if (rsvpMatch && method === 'POST') {
		const id = rsvpMatch[1];
		const body = await parseBody(req);
		const status = body.status || 'GOING';
		const existing = store.event_rsvps.find((r) => r.event_id === id && r.user_id === userId);
		if (existing) {
			existing.status = status;
			existing.updated_at = new Date().toISOString();
			return json(res, 200, existing);
		}
		const rsvp = { id: String(Date.now()), event_id: id, user_id: userId, status, created_at: new Date().toISOString() };
		store.event_rsvps.push(rsvp);
		return json(res, 201, rsvp);
	}

	// Events mine list
	if (method === 'GET' && path === '/v1/events') {
		if (q.mine === '1') {
			const mineIds = new Set(store.event_rsvps.filter(r=>r.user_id===userId).map(r=>r.event_id));
			const items = store.events.filter(e=>mineIds.has(e.id));
			return json(res, 200, items);
		}
		return json(res, 200, store.events);
	}

	// Global signals list with mine filter
	if (method === 'GET' && path === '/v1/signals') {
		const after = typeof q.after === 'string' ? q.after : null;
		const limit = q.limit ? Math.max(1, Math.min(100, Number(q.limit))) : 30;
		let items = store.signals;
		if (q.mine === '1') items = items.filter(s=>s.author_id===userId);
		items.sort((a,b)=> (b.created_at||'').localeCompare(a.created_at||''));
		if (after) items = items.filter(s=> (s.created_at||'') < after);
		const page = items.slice(0, limit);
		const next = page.length === limit ? page[page.length-1].created_at : null;
		return json(res, 200, { items: page, next });
	}

	// Announcements by circle
	const circleAnns = path.match(/^\/v1\/circles\/([^/]+)\/announcements$/);
	if (circleAnns) {
		const circleId = circleAnns[1];
		if (method === 'GET') {
			const items = store.bulletins.filter((a) => a.circle_id === circleId);
			return json(res, 200, items);
		}
		if (method === 'POST') {
			const body = await parseBody(req);
			// enforce at most one pinned announcement per circle
			if (body.pinned) {
				store.bulletins = store.bulletins.map((a)=> a.circle_id===circleId ? { ...a, pinned: false } : a);
			}
			const a = {
				id: String(Date.now()),
				circle_id: circleId,
				title: body.title,
				body_md: body.body_md,
				pinned: !!body.pinned,
				created_at: new Date().toISOString(),
			};
			store.bulletins.unshift(a);
			return json(res, 201, a);
		}
	}

	// Org endpoints
	const orgSignals = path.match(/^\/v1\/orgs\/([^/]+)\/signals$/);
	if (orgSignals && method === 'POST') {
		const orgId = orgSignals[1];
		const body = await parseBody(req);
		const now = new Date();
		const sig = { id:String(Date.now()), author_id:userId, scope:'circle', circle_id:orgId, kind:'signal', caption: body.caption||'', tags: Array.isArray(body.tags)?body.tags:[], created_at: now.toISOString(), expires_at: new Date(now.getTime()+86400000).toISOString() };
		store.signals.unshift(sig);
		return json(res, 201, sig);
	}
	const orgThreads = path.match(/^\/v1\/orgs\/([^/]+)\/threads$/);
	if (orgThreads) {
		const orgId = orgThreads[1];
		if (method === 'GET') {
			return json(res, 200, store.threads.filter(t=>t.circle_id===orgId));
		}
		if (method === 'POST') {
			const body = await parseBody(req);
			const t = { id:String(Date.now()), circle_id: orgId, title: body.title||'Thread', created_at: new Date().toISOString(), author_id: userId };
			store.threads.unshift(t);
			return json(res, 201, t);
		}
	}

	// Building resident verification (stub)
	const verifyResident = path.match(/^\/v1\/buildings\/([^/]+)\/verify-resident$/);
	if (verifyResident && method === 'POST') {
		const status = 'approved';
		return json(res, 200, { status });
	}

	// Polls by circle: list/create (returns PollWithOptions)
	const circlePolls = path.match(/^\/v1\/circles\/([^/]+)\/polls$/);
	if (circlePolls) {
		const circleId = circlePolls[1];
		if (method === 'GET') {
			const polls = store.polls.filter(p=>p.circle_id===circleId).map(p=>{
				const options = store.poll_options.filter(o=>o.poll_id===p.id);
				const votes = store.poll_votes.filter(v=>v.poll_id===p.id);
				const byOpt = options.map(o=>({ option_id:o.id, count: votes.filter(v=>v.option_id===o.id).length }));
				const you_voted = votes.find(v=>v.user_id===userId)?.option_id;
				return { ...p, options, summary: { by_option: byOpt, total: votes.length, you_voted } };
			});
			return json(res, 200, polls);
		}
		if (method === 'POST') {
			const body = await parseBody(req);
			if (!body.question || !Array.isArray(body.options)) return badRequest(res, 'question and options required');
			const p = { id: String(Date.now()), circle_id: circleId, question: body.question, multi: !!body.multi };
			store.polls.unshift(p);
			(body.options || []).forEach((text)=>store.poll_options.push({ id: String(Date.now()+Math.random()), poll_id: p.id, text }));
			return json(res, 201, p);
		}
	}

	// Poll votes
	const pollVotes = path.match(/^\/v1\/polls\/([^/]+)\/votes$/);
	if (pollVotes && method === 'GET') {
		const pollId = pollVotes[1];
		return json(res, 200, store.poll_votes.filter(v=>v.poll_id===pollId));
	}
	const pollVote = path.match(/^\/v1\/polls\/([^/]+)\/vote$/);
	if (pollVote && method === 'POST') {
		const pollId = pollVote[1];
		const body = await parseBody(req);
		if (!body.optionId || !body.userId) return badRequest(res, 'optionId and userId required');
		store.poll_votes = store.poll_votes.filter(v => !(v.poll_id===pollId && v.user_id===body.userId));
		store.poll_votes.push({ id: String(Date.now()), poll_id: pollId, option_id: body.optionId, user_id: body.userId });
		return noContent(res);
	}

	// Analytics
	const kpis = path.match(/^\/v1\/analytics\/circles\/([^/]+)\/kpis$/);
	if (kpis && method === 'GET') {
		return json(res, 200, store.kpis);
	}
	const forecast = path.match(/^\/v1\/forecast\/circles\/([^/]+)$/);
	if (forecast && method === 'GET') {
		return json(res, 200, store.forecast);
	}
	const anomalies = path.match(/^\/v1\/analytics\/circles\/([^/]+)\/anomalies$/);
	if (anomalies && method === 'GET') {
		return json(res, 200, store.anomalies);
	}
	const ack = path.match(/^\/v1\/anomalies\/([^/]+)\/ack$/);
	if (ack && method === 'POST') {
		return noContent(res);
	}
	if (method === 'POST' && path === '/v1/policies/apply') {
		return noContent(res);
	}

	// Bookings
	if (method === 'POST' && path === '/v1/bookings') {
		const body = await parseBody(req);
		if (!body.circle_id || !body.amenity_id || !body.start_at || !body.end_at) return badRequest(res, 'missing fields');
		const requiresApproval = !!store.amenities.find(a=>a.id===body.amenity_id)?.requires_approval;
		const overlaps = store.bookings.some(b => b.circle_id===body.circle_id && b.amenity_id===body.amenity_id && ['PENDING','APPROVED'].includes(b.status) && !(b.end_at <= body.start_at || b.start_at >= body.end_at));
		const booking = {
			id: String(Date.now()),
			circle_id: body.circle_id,
			amenity_id: body.amenity_id,
			user_id: body.user_id || userId,
			start_at: body.start_at,
			end_at: body.end_at,
			status: requiresApproval ? 'PENDING' : (overlaps ? 'PENDING' : 'APPROVED'),
		};
		store.bookings.push(booking);
		return json(res, 201, booking);
	}
	if (method === 'GET' && path === '/v1/bookings') {
		const mine = q.mine === '1';
		const items = mine ? store.bookings.filter(b=>b.user_id===userId) : store.bookings;
		return json(res, 200, items);
	}
	const adminBookings = path.match(/^\/v1\/admin\/bookings$/);
	if (adminBookings && method === 'GET') {
		let items = store.bookings;
		if (q.circle_id) items = items.filter(b=>b.circle_id===q.circle_id);
		if (q.amenity_id) items = items.filter(b=>b.amenity_id===q.amenity_id);
		if (q.status) items = items.filter(b=>b.status===q.status);
		if (q.circle_id && !isAdminForCircle(userId, q.circle_id)) return forbidden(res, 'Admin role required');
		return json(res, 200, items);
	}
	const updStatus = path.match(/^\/v1\/bookings\/([^/]+)\/status$/);
	if (updStatus && method === 'POST') {
		const id = updStatus[1]; const body = await parseBody(req);
		const b = store.bookings.find(x=>x.id===id); if(!b) return notFound(res);
		b.status = body.status; if (b.status==='APPROVED') b.approved_at = new Date().toISOString();
		return json(res, 200, b);
	}
	const checkin = path.match(/^\/v1\/bookings\/([^/]+)\/checkin$/);
	if (checkin && method === 'POST') {
		const id = checkin[1]; const b = store.bookings.find(x=>x.id===id); if(!b) return notFound(res);
		b.checked_in_at = new Date().toISOString();
		return json(res, 200, b);
	}
	const ics = path.match(/^\/v1\/bookings\/([^/]+)\/ics$/);
	if (ics && method === 'GET') {
		const id = ics[1]; const b = store.bookings.find(x=>x.id===id); if(!b) return notFound(res);
		const icsStr = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:${b.id}\nDTSTART:${b.start_at.replace(/[-:]/g,'').replace('.000','').replace('Z','Z')}\nDTEND:${b.end_at.replace(/[-:]/g,'').replace('.000','').replace('Z','Z')}\nSUMMARY:Amenity Booking\nEND:VEVENT\nEND:VCALENDAR`;
		const dataUri = 'data:text/calendar;charset=utf8,' + encodeURIComponent(icsStr);
		return json(res, 200, dataUri);
	}
	const cancel = path.match(/^\/v1\/bookings\/([^/]+)\/cancel$/);
	if (cancel && method === 'POST') {
		const id = cancel[1]; const b = store.bookings.find(x=>x.id===id); if(!b) return notFound(res);
		b.status = 'CANCELED'; b.canceled_at = new Date().toISOString();
		return json(res, 200, b);
	}

	// Incidents
	if (method === 'POST' && path === '/v1/incidents') {
		const body = await parseBody(req);
		const inc = { id: String(Date.now()), circle_id: body.circle_id || 'apt-1', reporter_id: userId, type: body.type || 'OTHER', severity: body.severity || 'LOW', description: body.description || '', status: 'OPEN', created_at: new Date().toISOString() };
		store.incidents.unshift(inc);
		return json(res, 201, inc);
	}
	if (method === 'GET' && path === '/v1/incidents') {
		const mine = q.mine === '1';
		const items = mine ? store.incidents.filter(i=>i.reporter_id===userId) : store.incidents;
		return json(res, 200, items);
	}
	const adminInc = path.match(/^\/v1\/admin\/incidents$/);
	if (adminInc && method === 'GET') {
		let items = store.incidents;
		if (q.circle_id) items = items.filter(i=>i.circle_id===q.circle_id);
		if (q.status) items = items.filter(i=>i.status===q.status);
		if (q.circle_id && !isAdminForCircle(userId, q.circle_id)) return forbidden(res, 'Admin role required');
		return json(res, 200, items);
	}
	const incStatus = path.match(/^\/v1\/incidents\/([^/]+)\/status$/);
	if (incStatus && method === 'POST') {
		const id = incStatus[1]; const body = await parseBody(req);
		const i = store.incidents.find(x=>x.id===id); if(!i) return notFound(res);
		i.status = body.status || i.status; if (i.status==='RESOLVED') i.resolved_at = new Date().toISOString();
		return json(res, 200, i);
	}

	// /v1/buildings/:id/bulletins
	const bullMatch = path.match(/^\/v1\/buildings\/([^/]+)\/bulletins$/);
	if (bullMatch && method === 'POST') {
		const body = await parseBody(req);
		const b = {
			id: String(Date.now()),
			title: body.title,
			body_md: body.body_md,
			pinned: !!body.pin,
			created_at: new Date().toISOString(),
		};
		store.bulletins.unshift(b);
		return json(res, 201, b);
	}

	// Uploads stub
	if (method === 'POST' && path === '/v1/uploads') {
		const body = await parseBody(req);
		return json(res, 201, { url: body?.filename ? `https://files.local/${Date.now()}-${body.filename}` : `https://files.local/${Date.now()}.bin` });
	}

	// Moderation counts
	if (method === 'GET' && path === '/v1/reports') {
		return json(res, 200, { total: store.reports.length, items: store.reports.slice(0, 50) });
	}
	if (method === 'GET' && path === '/v1/blocks') {
		return json(res, 200, { total: store.blocks.length, items: store.blocks.slice(0, 50) });
	}

	// Member invites
	const inviteMatch = path.match(/^\/v1\/circles\/([^/]+)\/invite$/);
	if (inviteMatch && method === 'POST') {
		const body = await parseBody(req);
		if (!body.email) return badRequest(res, 'email required');
		if (!isAdminForCircle(userId, inviteMatch[1])) return forbidden(res, 'Admin role required');
		// Stub: just return success
		return json(res, 201, { id: String(Date.now()), email: body.email, status: 'pending' });
	}

	// Member verification
	const verifyMatch = path.match(/^\/v1\/members\/([^/]+)\/verify$/);
	if (verifyMatch && method === 'POST') {
		const body = await parseBody(req);
		const member = store.memberships.find(m => m.id === verifyMatch[1]);
		if (!member) return notFound(res);
		if (!isAdminForCircle(userId, member.circle_id)) return forbidden(res, 'Admin role required');
		member.verified = !!body.verified;
		return json(res, 200, member);
	}

	// User verification (KYC placeholder)
	if (method === 'POST' && path === '/v1/users/verify') {
		const body = await parseBody(req);
		// Stub: just return success for now
		return json(res, 200, { 
			status: 'approved', 
			token: 'verify-token-' + Date.now(),
			verified_at: new Date().toISOString()
		});
	}

	// Get user's circles
	if (method === 'GET' && path === '/v1/users/me/circles') {
		const userMemberships = store.memberships.filter(m => m.user_id === userId);
		const userCircles = store.circles.filter(c => 
			userMemberships.some(m => m.circle_id === c.id)
		);
		return json(res, 200, userCircles);
	}

	notFound(res);
});

server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
