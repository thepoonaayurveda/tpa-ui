import { NextResponse } from 'next/server';
import { getProductReviews, getProduct } from '@/lib/woocommerce';

export async function GET() {
  try {
    // Fetch more reviews to ensure we have enough after filtering
    const reviews = await getProductReviews({
      per_page: 50,
      orderby: 'date',
      order: 'desc'
    });
    
    if (!reviews || reviews.length === 0) {
      return NextResponse.json([]);
    }
    
    // Filter for high-quality reviews with more flexible criteria
    const filteredReviews = reviews.filter((review: any) => 
      review.rating >= 4 &&
      review.review &&
      review.review.trim().length > 30 &&
      review.status === 'approved'
    );
    
    // Fetch product information for each review
    const reviewsWithProducts = await Promise.all(
      filteredReviews.slice(0, 6).map(async (review: any) => {
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
    
    // Add cache headers to ensure fresh data while preventing excessive API calls
    const response = NextResponse.json(reviewsWithProducts);
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=600'); // 5 min client, 10 min CDN
    return response;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Return empty array with shorter cache for errors
    const errorResponse = NextResponse.json([], { status: 200 }); // Return 200 to avoid UI errors
    errorResponse.headers.set('Cache-Control', 'public, max-age=60'); // Retry in 1 minute
    return errorResponse;
  }
}