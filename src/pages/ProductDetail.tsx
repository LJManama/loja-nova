import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Truck, Shield, ArrowLeft, Minus, Plus } from 'lucide-react'
import { productsApi, reviewsApi } from '../lib/api'
import { formatPrice, formatDiscount } from '../lib/utils'
import { useCartStore } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { useAuthStore } from '../context/AuthContext'
import { toast } from 'sonner'

export default function ProductDetail() {
  const { t, language } = useLanguage()
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const addItem = useCartStore((state) => state.addItem)
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id))
    }
  }, [id, language])

  const loadProduct = async (productId: number) => {
    try {
      setLoading(true)
      const data = await productsApi.getById(productId)
      setProduct(data)
    } catch (error) {
      console.error('Failed to load product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('products.notFound')}</h1>
        <Link to="/produtos" className="text-stech-blue hover:text-stech-red">
          {t('cart.continue')}
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    const result = addItem(product)
    if (result.alreadyAdded) {
      toast.error(`${product.name} ${t('toast.alreadyInCart')}`)
    } else {
      for (let i = 1; i < quantity; i++) {
        addItem(product)
      }
      toast.success(`${quantity}x ${product.name} ${t('toast.addedToCart')}`)
    }
  }

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error(t('reviews.loginRequired'))
      return
    }

    if (!reviewComment.trim()) {
      toast.error(t('reviews.writeComment'))
      return
    }

    try {
      await reviewsApi.create({
        product_id: parseInt(id || '0'),
        user_id: user?.id || 0,
        rating: reviewRating,
        comment: reviewComment
      })
      
      // Reload product to get updated rating
      const updatedProduct = await productsApi.getById(parseInt(id || '0'))
      setProduct(updatedProduct)
      
      setReviewRating(5)
      setReviewComment('')
      setShowReviewModal(false)
      toast.success(t('reviews.success'))
    } catch (error) {
      console.error('Failed to submit review:', error)
      toast.error(t('reviews.error'))
    }
  }

  const images = product.images || [product.image]

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Link to="/produtos" className="inline-flex items-center text-stech-blue hover:text-stech-red mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('cart.continue')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {parseFloat(product.discount || '0') > 0 && (
            <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded mb-4">
              {formatDiscount(product.discount)}
            </span>
          )}
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 ml-2">{product.rating} ({product.reviews} {t('product.reviews')})</span>
            <button
              onClick={() => setShowReviewModal(true)}
              className="ml-4 text-xs bg-stech-blue text-white px-3 py-1 rounded hover:bg-stech-red transition-colors"
            >
              {t('reviews.write')}
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-blue-600">{formatPrice(product.price)}</span>
              {product.original_price && parseFloat(product.original_price) > parseFloat(product.price) && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {product.stock > 0 ? `${product.stock} ${t('product.stock')}` : t('products.outOfStock')}
            </p>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">{t('product.quantity')}:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-stech-blue text-white hover:bg-stech-red'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <Plus className="w-4 h-4" />
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>{t('product.delivery')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>{t('product.warranty')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-5 h-5 text-blue-600" />
              <span>{t('product.original')}</span>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">{t('product.specifications')}</h2>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{t('reviews.your')}</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">{t('reviews.rating')}</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= reviewRating
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
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
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
                onClick={() => setShowReviewModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {t('reviews.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}
