# Cloudinary Setup Guide for Meharstare

Follow these steps to set up Cloudinary for product image management.

## 1. Create a Cloudinary Account
- Go to [cloudinary.com](https://cloudinary.com/) and sign up for a free account.
- Complete the email verification process.

## 2. Get Your API Credentials
- Log in to your Cloudinary dashboard.
- On the **Dashboard** page, you will find your **Product Environment Credentials**:
  - **Cloud Name**
  - **API Key**
  - **API Secret**

## 3. Create an Unsigned Upload Preset
This allows the frontend to upload images securely without a backend signature for certain operations.
- Go to **Settings** (gear icon at the bottom left).
- Select **Upload** from the left sidebar.
- Scroll down to the **Upload presets** section.
- Click **Add upload preset**.
- Set the following fields:
  - **Upload preset name**: `meharstare_products`
  - **Signing Mode**: `Unsigned`
  - **Folder**: `meharstare/products` (optional, but recommended)
- Click **Save** at the top right.

## 4. Configure Environment Variables
- Create or update your `.env.local` file in the root of the project.
- Add the following variables:
  ```env
  CLOUDINARY_CLOUD_NAME="your_cloud_name"
  CLOUDINARY_API_KEY="your_api_key"
  CLOUDINARY_API_SECRET="your_api_secret"
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="meharstare_products"
  ```
- Replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with the actual values from your dashboard.

## 5. Verify the Folders
The system is configured to automatically upload images to these folders:
- `meharstare/products/sportswear/`
- `meharstare/products/casual-wear/`
- `meharstare/products/gloves/`
- `meharstare/products/accessories/`
- `meharstare/products/360/`
- `meharstare/oem-logos/`
- `meharstare/payment-proofs/`
