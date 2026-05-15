const fs = require('fs'); 
const files = [
  'app/api/admin/inquiries/route.ts', 
  'app/api/admin/orders/route.ts', 
  'app/api/admin/stats/route.ts', 
  'app/api/orders/track/route.ts', 
  'app/api/auth/verify-email/route.ts', 
  'app/(store)/page.tsx', 
  'app/admin/products/page.tsx', 
  'app/admin/orders/page.tsx', 
  'app/admin/inquiries/page.tsx', 
  'app/admin/page.tsx', 
  'app/(store)/products/page.tsx'
]; 
files.forEach(f => { 
  if(fs.existsSync(f)) { 
    const content = fs.readFileSync(f, 'utf8'); 
    if(!content.includes('force-dynamic')) { 
      fs.writeFileSync(f, "export const dynamic = 'force-dynamic';\n" + content); 
      console.log('Updated ' + f); 
    } 
  } else {
    console.log('Not found ' + f);
  }
});
