import { describe, it, expect } from 'vitest';

describe('Application Startup Requirements', () => {
  it('should have valid babel config without deprecated plugins', () => {
    const babelConfig = require('../../babel.config.js')({ cache: () => {} });
    
    // Should use babel-preset-expo
    expect(babelConfig.presets).toContain('babel-preset-expo');
    
    // Should NOT use deprecated expo-router/babel plugin
    expect(babelConfig.plugins).not.toContain('expo-router/babel');
  });

  it('should have proper package.json main entry', () => {
    const packageJson = require('../../package.json');
    
    // Should use index.js which loads expo-router/entry
    expect(packageJson.main).toBe('index.js');
  });

  it('should have valid tsconfig', () => {
    const tsconfig = require('../../tsconfig.json');
    
    // Should extend expo base config
    expect(tsconfig.extends).toBe('expo/tsconfig.base');
    
    // Should have path aliases configured
    expect(tsconfig.compilerOptions.paths).toBeDefined();
    expect(tsconfig.compilerOptions.paths['@/*']).toEqual(['./src/*']);
  });

  it('should have all required fixture files', () => {
    const fs = require('fs');
    const path = require('path');
    
    const fixturesDir = path.join(__dirname, '../fixtures');
    const requiredFixtures = [
      'circles.json',
      'users.json', 
      'memberships.json',
      'amenities.json',
      'bookings.json',
      'incidents.json',
      'announcements.json',
      'events.json',
      'polls.json',
      'poll_options.json',
      'anomaly_alerts.json'
    ];
    
    requiredFixtures.forEach(fixture => {
      const fixturePath = path.join(fixturesDir, fixture);
      expect(fs.existsSync(fixturePath)).toBe(true);
    });
  });
});
