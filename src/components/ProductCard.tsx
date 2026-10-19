import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Plus, Check } from 'lucide-react'
import { formatPrice } from '../lib/utils'
import { useCartStore } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { toast } from 'sonner'

interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage()
  const addItem = useCartStore((state) => state.addItem)
  const isItemAdded = useCartStore((state) => state.isItemAdded)
  const added = isItemAdded(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    const result = addItem(product)
    if (result.alreadyAdded) {
      toast.error(`${product.name} ${t('toast.alreadyInCart')}`)
    } else {
      toast.success(`${product.name} ${t('toast.addedToCart')}`)
    }
  }

  return (
    <Link to={`/produto/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative">
        {/* Image */}
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover Overlay with Description */}
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <p className="text-white text-sm text-center line-clamp-4">
              {product.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-xs mb-1 line-clamp-2 group-hover:text-stech-blue transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-bold text-stech-blue">
                {formatPrice(product.price)}
              </span>
              {product.original_price && parseFloat(product.original_price) > parseFloat(product.price) && (
                <span className="text-xs text-gray-400 line-through ml-1">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`p-1.5 rounded transition-all duration-300 flex items-center gap-1 ${
                added
                  ? 'bg-green-600 text-white cursor-default'
                  : 'bg-stech-blue text-white hover:bg-stech-red'
              }`}
            >
              {added ? (
                <Check className="w-3 h-3" />
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3" />
                  <Plus className="w-2 h-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
