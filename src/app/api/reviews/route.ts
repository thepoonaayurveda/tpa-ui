import { NextResponse } from 'next/server';
import { getProductReviews, getProduct } from '@/lib/woocommerce';

export async function GET() {
  try {
    const reviews = await getProductReviews({ per_page: 6 });
    
    if (!reviews || reviews.length === 0) {
      return NextResponse.json([]);
    }
    
    // Filter for high-quality reviews
    const filteredReviews = reviews.filter((review: any) => 
      review.rating >= 4 && review.review && review.review.length > 50
    );
    
    // Fetch product information for each review
    const reviewsWithProducts = await Promise.all(
      filteredReviews.slice(0, 3).map(async (review: any) => {
        try {
          const product = await getProduct(review.product_id);
          return {
            ...review,
            product_name: product?.name || 'Product',
            product_slug: product?.slug || ''
          };
        } catch (error) {
          console.error(`Error fetching product ${review.product_id}:`, error);
          return {
            ...review,
            product_name: 'Product',
            product_slug: ''
          };
        }
      })
    );
    
    return NextResponse.json(reviewsWithProducts);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json([], { status: 500 });
  }
}