import MockApi from './ApiAdapter';
import RealApi from './RealApi';
import Constants from 'expo-constants';

const envUrl = (process.env)?.EXPO_PUBLIC_API_BASE_URL as string | undefined;
const extraUrl = (Constants?.expoConfig?.extra)?.EXPO_PUBLIC_API_BASE_URL as string | undefined;
const baseUrl = envUrl || extraUrl;

const api = !baseUrl || baseUrl === 'mock' ? new MockApi() : new RealApi(baseUrl);

export default api;

