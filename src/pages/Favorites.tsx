import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingBag } from 'lucide-react'
import { useFavoritesStore } from '../context/FavoritesContext'
import { useCartStore } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { formatPrice } from '../lib/utils'
import { toast } from 'sonner'

export default function Favorites() {
  const { t } = useLanguage()
  const { items, removeItem, clearFavorites } = useFavoritesStore()
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (product: any) => {
    addItem(product)
    toast.success(`${product.name} ${t('favorites.addToCart')}!`)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t('favorites.empty')}</h1>
        <p className="text-gray-600 mb-6">{t('favorites.emptyDesc')}</p>
        <Link
          to="/produtos"
          className="inline-block bg-stech-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-stech-red transition-colors"
        >
          {t('favorites.viewProducts')}
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('favorites.title')}</h1>
        <button
          onClick={clearFavorites}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          {t('favorites.clear')}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <Link to={`/produto/${product.id}`}>
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    removeItem(product.id)
                  }}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/produto/${product.id}`}>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-stech-blue">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
              <p className="text-lg font-bold text-stech-blue mb-3">
                {formatPrice(product.price)}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-stech-blue text-white py-2 rounded-lg font-medium hover:bg-stech-red flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                {t('favorites.addToCart')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
