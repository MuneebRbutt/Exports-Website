# Cloudinary Setup Guide for Meharstare

This guide will help you set up Cloudinary for product image management in your Meharstare ecommerce website.

## STEP 1 — CLOUDINARY ACCOUNT SETUP GUIDE

### 1.1 Create a Free Cloudinary Account
1. Visit [cloudinary.com](https://cloudinary.com)
2. Click **"Sign up for free"**
3. Fill in your details:
   - Email address
   - Password
   - Company name (optional)
4. Verify your email address
5. Choose the **Free** plan (includes 25 credits/month)

### 1.2 Find Your Cloudinary Credentials
After signing up, navigate to your Cloudinary dashboard:

1. **Cloud Name**:
   - Go to Dashboard → Account Details
   - Copy the "Cloud name" value

2. **API Key & API Secret**:
   - Go to Settings → Security
   - Find "API Key" and "API Secret"
   - Click the eye icon to reveal the API Secret
   - Copy both values

### 1.3 Create Unsigned Upload Preset
1. Go to Settings → Upload
2. Scroll down to "Upload presets"
3. Click **"Add upload preset"**
4. Configure the preset:
   - **Name**: `meharstare_products`
   - **Signing mode**: Unsigned
   - **Folder**: Leave empty (we'll specify folders in code)
   - **Allowed formats**: jpg, png, webp, svg
   - **Max file size**: 5MB
   - **Transformation**: Leave default for now
5. Click **"Save"**

### 1.4 Add Credentials to .env.local
Add these environment variables to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=meharstare_products
```

**Important**:
- Replace the placeholder values with your actual credentials
- Never commit `.env.local` to version control
- The `NEXT_PUBLIC_` prefix makes the cloud name available in the browser

## STEP 2 — FOLDER STRUCTURE

The following folder structure will be created automatically in your Cloudinary account when you upload images:

```
meharstare/
├── products/
│   ├── sportswear/
│   ├── casual-wear/
│   ├── gloves/
│   └── accessories/
├── products/360/
├── oem-logos/
└── payment-proofs/
```

## STEP 3 — VERIFY SETUP

After completing the setup:

1. Test the configuration by running your development server
2. Try uploading a test image through the admin interface
3. Check that the image appears in your Cloudinary Media Library
4. Verify the image is in the correct folder structure

## TROUBLESHOOTING

### Common Issues:

1. **"Invalid credentials" error**:
   - Double-check your cloud name, API key, and secret
   - Ensure there are no extra spaces or characters

2. **"Upload preset not found" error**:
   - Verify the upload preset name matches exactly: `meharstare_products`
   - Make sure it's set to "Unsigned" mode

3. **"CORS error" in browser**:
   - Add your domain to allowed origins in Cloudinary settings
   - Go to Settings → Security → Allowed origins

4. **File size limit exceeded**:
   - Check that your upload preset allows 5MB files
   - Verify the file you're uploading is under 5MB

## SUPPORT

If you encounter issues:
- Check Cloudinary documentation: [docs.cloudinary.com](https://docs.cloudinary.com)
- Review your browser console for specific error messages
- Ensure all environment variables are properly set
