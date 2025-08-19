import MockApi from './ApiAdapter';
import RealApi from './RealApi';

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

// Default to mock if no base URL or explicitly set to 'mock'
const api = !baseUrl || baseUrl === 'mock' ? new MockApi() : new RealApi(baseUrl);

export default api;

