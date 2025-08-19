import Fastify from 'fastify';
import cors from 'fastify-cors';

const app = Fastify({ logger: true });
app.register(cors, { origin: '*' });

app.get('/healthz', async () => ({ status: 'ok' }));

// Stubs matching docs/openapi.yaml
app.post('/v1/auth/otp', async () => ({ ok: true }));
app.post('/v1/auth/verify', async () => ({ token: 'dev-token' }));
app.post('/v1/verify', async () => ({ status: 'approved', token: 'verify-token' }));
app.post('/v1/now-cell', async (req: any) => ({ cell_id: '884c8d364dbffff' }));

app.get('/v1/feed', async () => ({ items: [], next: null }));

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`Server listening on http://localhost:${port}`);
});


