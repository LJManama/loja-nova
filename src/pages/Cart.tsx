import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { formatPrice } from '../lib/utils'

export default function Cart() {
  const { t } = useLanguage()
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t('cart.title')}</h1>
        <p className="text-gray-600 mb-6">{t('cart.empty')}</p>
        <Link
          to="/produtos"
          className="inline-block bg-stech-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-stech-red transition-colors"
        >
          {t('cart.continue')}
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
              <Link to={`/produto/${item.product.id}`} className="flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/produto/${item.product.id}`}>
                  <h3 className="font-semibold hover:text-stech-blue">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500">{item.product.brand}</p>
                <p className="text-lg font-bold text-stech-blue mt-2">
                  {formatPrice(item.product.price)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 hover:text-red-700"
                  title={t('cart.remove')}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-2 py-1 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                    disabled={item.quantity >= item.product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('cart.subtotal')}</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('cart.shipping')}</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>{t('cart.total')}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-stech-blue text-white py-3 rounded-lg font-medium text-center hover:bg-stech-red transition-colors mb-4"
            >
              {t('cart.checkout')}
            </Link>

            <button
              onClick={clearCart}
              className="w-full text-red-600 hover:text-red-700 text-sm"
            >
              {t('cart.clear')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
