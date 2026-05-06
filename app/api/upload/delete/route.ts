import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { deleteImage } from '@/lib/cloudinary/config';
import { protectAdmin } from '@/lib/auth/adminGuard';

export async function DELETE(request: NextRequest) {
  try {
    // Check admin session
    const session = await protectAdmin();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { publicId, productId } = body;

    // Validate publicId
    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    await deleteImage(publicId);

    // If productId is provided, remove the image URL from the product in database
    if (productId) {
      // TODO: Implement database update to remove image URL from product
      // This would depend on your database structure (Prisma, JSON, etc.)
      console.log(`Removing image with publicId ${publicId} from product ${productId}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Image deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
