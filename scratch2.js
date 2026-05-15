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
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Remove the previously added line if it is at the very top
    if (content.startsWith("export const dynamic = 'force-dynamic';\n")) {
        content = content.replace("export const dynamic = 'force-dynamic';\n", "");
    }
    
    // Check if file has use client
    if (content.includes("'use client'") || content.includes('"use client"')) {
        // Put it after use client
        if (content.includes("'use client'")) {
            content = content.replace(/'use client';?/, "'use client';\nexport const dynamic = 'force-dynamic';");
        } else {
            content = content.replace(/"use client";?/, "\"use client\";\nexport const dynamic = 'force-dynamic';");
        }
    } else {
        content = "export const dynamic = 'force-dynamic';\n" + content;
    }
    
    fs.writeFileSync(f, content);
    console.log('Fixed order for ' + f);
  }
});
