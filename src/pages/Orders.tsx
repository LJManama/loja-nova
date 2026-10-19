import { useState, useEffect } from 'react'
import { Package, Clock, CheckCircle, Truck } from 'lucide-react'
import { ordersApi } from '../lib/api'
import { useAuthStore } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { formatPrice } from '../lib/utils'

export default function Orders() {
  const { t } = useLanguage()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    if (user?.id) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await ordersApi.getAll(user?.id)
      setOrders(data)
    } catch (error) {
      console.error('Failed to load orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-600', label: t('orders.status.delivered') }
      case 'shipped':
        return { icon: Truck, color: 'text-blue-600', label: t('orders.status.shipped') }
      case 'processing':
        return { icon: Clock, color: 'text-yellow-600', label: t('orders.status.processing') }
      default:
        return { icon: Package, color: 'text-gray-600', label: t('orders.status.pending') }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('orders.title')}</h1>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('common.loading')}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{t('orders.empty')}</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = getStatusInfo(order.status).icon
            const statusColor = getStatusInfo(order.status).color
            const statusLabel = getStatusInfo(order.status).label

            return (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold">{t('orders.id')} {order.id}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-sm">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {order.items?.length || 0} {t('cart.quantity')}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className={`flex items-center gap-2 ${statusColor}`}>
                      <StatusIcon className="w-5 h-5" />
                      <span className="font-medium">{statusLabel}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
