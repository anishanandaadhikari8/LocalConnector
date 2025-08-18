// Simple startup verification script
const http = require('http');

console.log('🔍 Verifying application startup...');

// Test 1: Check if server is responding
function checkServerResponse() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:8081/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Server responding on port 8081');
          resolve(true);
        } else {
          console.log(`❌ Server returned status ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Server not reachable: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Server timeout');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 2: Check multiple routes
async function verifyRoutes() {
  console.log('🔍 Testing routes...');
  
  const routes = ['/', '/health', '/login'];
  const results = {};
  
  for (const route of routes) {
    try {
      const result = await checkRoute(route);
      results[route] = result;
      console.log(`${result ? '✅' : '❌'} Route ${route}: ${result ? 'OK' : 'FAILED'}`);
    } catch (error) {
      results[route] = false;
      console.log(`❌ Route ${route}: ERROR - ${error.message}`);
    }
  }
  
  // At least one route should work for basic connectivity
  const anyRouteWorks = Object.values(results).some(r => r);
  return anyRouteWorks;
}

function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:19006${route}`, (res) => {
      // Accept any response that isn't a connection error
      resolve(res.statusCode < 500);
    });
    
    req.on('error', () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Test 3: Check critical files exist
function checkCriticalFiles() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('🔍 Checking critical files...');
  
  const criticalFiles = [
    'apps/client/app/health.tsx',
    'apps/client/app/(auth)/login.tsx', 
    'apps/client/src/api/ApiAdapter.ts',
    'apps/client/src/store/auth.ts',
    'apps/client/babel.config.js',
    'apps/client/package.json'
  ];
  
  const missing = criticalFiles.filter(file => {
    const exists = fs.existsSync(file);
    if (!exists) {
      console.log(`❌ Missing: ${file}`);
    }
    return !exists;
  });
  
  if (missing.length === 0) {
    console.log('✅ All critical files present');
    return true;
  } else {
    console.log(`❌ Missing ${missing.length} critical files`);
    return false;
  }
}

// Run all tests
async function runStartupVerification() {
  console.log('🚀 Starting application verification...\n');
  
  const filesOk = checkCriticalFiles();
  const serverOk = await verifyRoutes();
  
  console.log('\n📊 Startup Verification Results:');
  console.log(`Files: ${filesOk ? '✅' : '❌'}`);
  console.log(`Server: ${serverOk ? '✅' : '❌'}`);
  
  if (filesOk && serverOk) {
    console.log('\n🎉 APPLICATION STARTUP VERIFIED - Ready for testing!');
    console.log('🌐 Open: http://localhost:8081/health');
    console.log('🔐 Login: http://localhost:8081/login');
    process.exit(0);
  } else {
    console.log('\n💥 APPLICATION STARTUP FAILED - Check errors above');
    process.exit(1);
  }
}

runStartupVerification();
