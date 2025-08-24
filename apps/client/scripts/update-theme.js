const fs = require('fs');
const path = require('path');

// Theme mapping from old to new structure
const themeMapping = {
  // Surface colors
  'theme.colors.surface50': 'theme.colors.surface[50]',
  'theme.colors.surface0': 'theme.colors.surface[0]',
  'theme.colors.surface100': 'theme.colors.surface[100]',
  
  // Ink colors
  'theme.colors.ink900': 'theme.colors.ink[900]',
  'theme.colors.ink700': 'theme.colors.ink[700]',
  'theme.colors.ink600': 'theme.colors.ink[600]',
  'theme.colors.ink500': 'theme.colors.ink[500]',
  
  // Primary colors
  'theme.colors.primary700': 'theme.colors.primary[700]',
  'theme.colors.primary600': 'theme.colors.primary[600]',
  'theme.colors.primary500': 'theme.colors.primary[500]',
  
  // Accent colors
  'theme.colors.accent500': 'theme.colors.accent[500]',
  'theme.colors.accent600': 'theme.colors.accent[600]',
  
  // Border colors
  'theme.colors.borderSubtle': 'theme.colors.border.subtle',
  'theme.colors.borderStrong': 'theme.colors.border.strong',
  
  // Legacy semantic colors
  'theme.colors.successFg': 'theme.colors.role.success.fg',
  'theme.colors.successBg': 'theme.colors.role.success.bg',
  'theme.colors.warningFg': 'theme.colors.role.warning.fg',
  'theme.colors.warningBg': 'theme.colors.role.warning.bg',
  'theme.colors.dangerFg': 'theme.colors.role.danger.fg',
  'theme.colors.dangerBg': 'theme.colors.role.danger.bg',
  'theme.colors.infoFg': 'theme.colors.role.info.fg',
  'theme.colors.infoBg': 'theme.colors.role.info.bg',
};

// Function to recursively find all TypeScript/TSX files
function findTsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findTsxFiles(fullPath, files);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to update theme references in a file
function updateThemeInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Replace old theme references
    for (const [oldRef, newRef] of Object.entries(themeMapping)) {
      const regex = new RegExp(oldRef.replace(/\./g, '\\.'), 'g');
      if (regex.test(content)) {
        content = content.replace(regex, newRef);
        updated = true;
        console.log(`  Updated ${oldRef} → ${newRef}`);
      }
    }
    
    // Remove "as any" type assertions
    const asAnyRegex = /(\s+as\s+any)/g;
    if (asAnyRegex.test(content)) {
      content = content.replace(asAnyRegex, '');
      updated = true;
      console.log(`  Removed "as any" type assertions`);
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('🔧 Updating theme references across all components...\n');

const appDir = path.join(__dirname, '..');
const tsxFiles = findTsxFiles(appDir);

console.log(`Found ${tsxFiles.length} TypeScript/TSX files to process\n`);

let updatedCount = 0;

for (const file of tsxFiles) {
  const relativePath = path.relative(appDir, file);
  console.log(`Processing: ${relativePath}`);
  
  if (updateThemeInFile(file)) {
    updatedCount++;
    console.log(`✅ Updated: ${relativePath}\n`);
  } else {
    console.log(`⏭️  No changes needed: ${relativePath}\n`);
  }
}

console.log(`\n🎉 Theme update complete!`);
console.log(`📊 Files processed: ${tsxFiles.length}`);
console.log(`✅ Files updated: ${updatedCount}`);
console.log(`\n💡 To change the entire theme, edit the themeConfig in src/theme/theme.ts`);
