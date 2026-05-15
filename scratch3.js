const fs = require('fs');
const files = [
  'app/api/admin/inquiries/route.ts',
  'app/api/admin/inquiries/[id]/route.ts',
  'app/api/admin/orders/route.ts',
  'app/api/admin/orders/[orderId]/route.ts',
  'app/api/admin/products/route.ts',
  'app/api/admin/products/[id]/route.ts',
  'app/api/admin/stats/route.ts',
  'app/api/orders/route.ts',
  'app/api/orders/[orderId]/route.ts',
  'app/api/orders/track/route.ts',
  'app/api/cart/route.ts',
  'app/api/cart/[itemId]/route.ts',
  'app/api/auth/register/route.ts',
  'app/api/auth/forgot-password/route.ts',
  'app/api/auth/reset-password/route.ts',
  'app/api/auth/verify-email/route.ts',
  'app/api/contact/route.ts',
  'app/api/upload/route.ts',
  'app/api/user/profile/route.ts'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Remove the previously added line if it is at the very top
    if (content.startsWith("export const dynamic = 'force-dynamic';\n")) {
        content = content.replace("export const dynamic = 'force-dynamic';\n", "");
    }
    
    if (!content.includes("export const dynamic = 'force-dynamic'")) {
        content = "export const dynamic = 'force-dynamic';\n" + content;
    } else if (!content.includes("export const dynamic = 'force-dynamic';\n")) {
        // already has it, just make sure it's correct
        // do nothing if it's there
        content = "export const dynamic = 'force-dynamic';\n" + content.replace(/export const dynamic = 'force-dynamic';?\n?/g, '');
    }
    
    fs.writeFileSync(f, content);
    console.log('Fixed dynamic export for ' + f);
  } else {
    console.log('Not found ' + f);
  }
});
