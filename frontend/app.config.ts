import { ExpoConfig } from 'expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'LocalConnector',
  slug: 'localconnector',
  scheme: 'localconnector',
  version: '1.0.0',
  platforms: ['ios', 'android', 'web'],
  web: {
    bundler: 'metro',
  },
  extra: {
    eas: {
      projectId: 'localconnector-mvp',
    },
  },
});

export default defineConfig;


