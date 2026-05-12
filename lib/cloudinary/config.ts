import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Export the cloudinary instance
export { cloudinary };

// Helper function to upload a single image
export async function uploadImage(
  file: File | Buffer,
  folder: string,
  mimeType: string = 'image/jpeg'
): Promise<{ url: string; publicId: string; width: number; height: number }> {
  try {
    const uploadOptions: any = {
      folder: folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'png', 'webp', 'svg'],
      max_file_size: 5 * 1024 * 1024, // 5MB
    };

    let result;
    
    // Convert to data URI for upload
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      result = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString('base64')}`,
        uploadOptions
      );
    } else if (Buffer.isBuffer(file)) {
      result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${file.toString('base64')}`,
        uploadOptions
      );
    } else {
      throw new Error('Unsupported file type provided to uploadImage function.');
    }

    console.log('Upload successful:', result.public_id);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    throw new Error('Failed to upload image to Cloudinary');
  }
}

// Helper function to upload multiple images
export async function uploadMultipleImages(
  files: (File | Buffer)[],
  folder: string
): Promise<{ url: string; publicId: string; width: number; height: number }[]> {
  const uploadPromises = files.map((file) => uploadImage(file, folder));
  return Promise.all(uploadPromises);
}

// Helper function to upload 360° images with sequential naming
export async function upload360Images(
  files: (File | Buffer)[],
  productSlug: string
): Promise<{ url: string; publicId: string; width: number; height: number; sequence: number }[]> {
  const folder = `meharstare/products/360/${productSlug}`;
  
  const uploadPromises = files.map((file, index) =>
    uploadImage(file, folder).then((result) => ({
      ...result,
      sequence: index + 1,
    }))
  );
  
  return Promise.all(uploadPromises);
}

// Helper function to delete an image from Cloudinary
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}

// Helper function to get folder path based on category
export function getFolderPath(category: string): string {
  const categoryMap: Record<string, string> = {
    sportswear: 'meharstare/products/sportswear',
    'casual-wear': 'meharstare/products/casual-wear',
    gloves: 'meharstare/products/gloves',
    accessories: 'meharstare/products/accessories',
    '360': 'meharstare/products/360',
    'oem-logos': 'meharstare/oem-logos',
    'payment-proofs': 'meharstare/payment-proofs',
  };

  return categoryMap[category] || 'meharstare/products';
}
