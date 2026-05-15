"use client";

import { Star } from "lucide-react";
import { format } from "date-fns";

export default function ReviewsList({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-12 text-center border-t border-neutral-100 mt-12">
        <p className="text-neutral-400">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-12 border-t border-neutral-100 mt-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-athletic italic font-bold uppercase tracking-widest text-dark">Customer Reviews</h3>
        <button className="text-primary font-bold uppercase text-xs tracking-widest hover:underline">Write a Review</button>
      </div>
      
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-neutral-50 pb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-neutral-200'}`} 
                    />
                  ))}
                </div>
                <h4 className="font-bold text-dark">{review.user?.name || "Verified Customer"}</h4>
              </div>
              <span className="text-xs text-neutral-400">
                {format(new Date(review.createdAt), "MMMM d, yyyy")}
              </span>
            </div>
            <p className="text-neutral-600 leading-relaxed italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
