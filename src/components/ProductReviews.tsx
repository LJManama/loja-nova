import { useState, useEffect } from 'react'
import { Star, ThumbsUp, MessageSquare } from 'lucide-react'
import { useAuthStore } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { reviewsApi } from '../lib/api'
import { toast } from 'sonner'

interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  createdAt: string
  helpful?: number
}

export default function ProductReviews({ productId }: { productId: number }) {
  const { t } = useLanguage()
  const { isAuthenticated, user } = useAuthStore()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const data = await reviewsApi.getByProduct(productId)
      setReviews(data)
    } catch (error) {
      console.error('Failed to load reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error(t('reviews.loginRequired'))
      return
    }

    if (!newReview.comment.trim()) {
      toast.error(t('reviews.writeComment'))
      return
    }

    try {
      await reviewsApi.create({
        product_id: productId,
        user_id: user?.id || 0,
        rating: newReview.rating,
        comment: newReview.comment
      })
      
      await loadReviews()
      setNewReview({ rating: 5, comment: '' })
      setShowForm(false)
      toast.success(t('reviews.success'))
    } catch (error) {
      console.error('Failed to submit review:', error)
      toast.error(t('reviews.error'))
    }
  }

  const handleHelpful = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: (review.helpful || 0) + 1 }
        : review
    ))
    toast.success(t('reviews.thanks'))
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <p className="text-gray-500">{t('reviews.loading')}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">{t('reviews.title')}</h2>

      {/* Rating Summary */}
      <div className="flex items-center gap-6 mb-8 pb-6 border-b">
        <div className="text-center">
          <p className="text-4xl font-bold">{averageRating.toFixed(1)}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{reviews.length} {t('reviews.count')}</p>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(r => r.rating === star).length
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-8">{star}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Review Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-stech-blue text-white py-3 rounded-lg font-medium hover:bg-stech-red transition-colors mb-6"
        >
          {t('reviews.write')}
        </button>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">{t('reviews.your')}</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t('reviews.rating')}</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="p-2 hover:bg-gray-200 rounded transition-colors transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t('reviews.comment')}</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
              placeholder={t('reviews.placeholder')}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmitReview}
              className="flex-1 bg-stech-blue text-white py-2 rounded-lg font-medium hover:bg-stech-red transition-colors"
            >
              {t('reviews.submit')}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('reviews.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('reviews.noReviews')}</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{review.userName || t('reviews.anonymous')}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {t('reviews.helpful')} ({review.helpful || 0})
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                  <MessageSquare className="w-4 h-4" />
                  {t('reviews.reply')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
