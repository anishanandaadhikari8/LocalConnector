import Fastify from 'fastify';
import cors from 'fastify-cors';
import type { FeedItem, Signal, Ask, Bulletin } from './types';

const app = Fastify({ logger: true });
app.register(cors, { origin: '*' });

app.get('/healthz', async () => ({ status: 'ok' }));

// Stubs matching docs/openapi.yaml
app.post('/v1/auth/otp', async () => ({ ok: true }));
app.post('/v1/auth/verify', async () => ({ token: 'dev-token' }));
app.post('/v1/verify', async () => ({ status: 'approved', token: 'verify-token' }));
app.post('/v1/now-cell', async (req: any) => ({ cell_id: '884c8d364dbffff' }));

// In-memory dev store (replace with DB later)
const store = {
  signals: [] as Signal[],
  asks: [] as Ask[],
  bulletins: [] as Bulletin[],
};

app.get('/v1/feed', async (req) => {
  const items: FeedItem[] = [
    ...store.signals.map((s) => ({ type: 'signal', data: s } as FeedItem)),
    ...store.asks.map((a) => ({ type: 'ask', data: a } as FeedItem)),
    ...store.bulletins.map((b) => ({ type: 'bulletin', data: b } as FeedItem)),
  ].sort((a, b) => {
    const ta = 'created_at' in a.data ? (a.data as any).created_at : '0';
    const tb = 'created_at' in b.data ? (b.data as any).created_at : '0';
    return tb.localeCompare(ta);
  });
  return { items, next: null };
});

app.get('/v1/cells/:cell_id/signals', async (req: any) => {
  const { cell_id } = req.params;
  return { items: store.signals.filter((s) => s.cell_id === cell_id), next: null };
});

app.post('/v1/cells/:cell_id/signals', async (req: any) => {
  const { cell_id } = req.params;
  const body = req.body as Partial<Signal> & { kind: Signal['kind'] };
  const now = new Date();
  const expires = new Date(now.getTime() + ((body as any).expiresInHours ?? 24) * 3600 * 1000);
  const s: Signal = {
    id: String(Date.now()),
    author_id: 'dev',
    scope: 'cell',
    cell_id,
    kind: body.kind,
    caption: body.caption,
    media_url: body.media_url ?? null as any,
    tags: Array.isArray(body.tags) ? body.tags : [],
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
  } as Signal;
  store.signals.unshift(s);
  return s;
});

app.post('/v1/cells/:cell_id/asks', async (req: any) => {
  const { cell_id } = req.params;
  const body = req.body as Partial<Ask> & { title: string };
  const now = new Date();
  const a: Ask = {
    id: String(Date.now()),
    author_id: 'dev',
    scope: 'cell',
    cell_id,
    title: body.title || '',
    body: body.body || '',
    tags: Array.isArray(body.tags) ? body.tags : [],
    status: 'OPEN',
    created_at: now.toISOString(),
  } as Ask;
  store.asks.unshift(a);
  return a;
});

app.post('/v1/asks/:id/claim', async (req: any) => {
  const { id } = req.params; const a = store.asks.find((x) => x.id === id);
  if (!a) return app.httpErrors.notFound();
  a.status = 'CLAIMED'; a.claimer_id = 'dev';
  return a;
});

app.post('/v1/asks/:id/thank', async (req: any) => {
  const { id } = req.params; const a = store.asks.find((x) => x.id === id);
  if (!a) return app.httpErrors.notFound();
  a.status = 'DONE'; a.closed_at = new Date().toISOString();
  return a;
});

app.post('/v1/buildings/:id/bulletins', async (req: any) => {
  const body = req.body as { title: string; body_md: string; pin?: boolean };
  const b: Bulletin = { id: String(Date.now()), title: body.title, body_md: body.body_md, pinned: !!body.pin, created_at: new Date().toISOString() };
  store.bulletins.unshift(b);
  return b;
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`Server listening on http://localhost:${port}`);
});


