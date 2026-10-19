import { useState, useEffect } from 'react'
import { Search, Filter, Eye, ArrowLeft, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { ordersApi } from '../../lib/api'
import { formatPrice } from '../../lib/utils'
import { toast } from 'sonner'

export default function AdminOrders() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showOrderModal, setShowOrderModal] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await ordersApi.getAll()
      setOrders(data)
    } catch (error) {
      console.error('Failed to load orders:', error)
      toast.error(t('admin.loadError'))
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await ordersApi.update(orderId, newStatus)
      toast.success(t('admin.updateStatus'))
      loadOrders()
    } catch (error) {
      console.error('Failed to update status:', error)
      toast.error(t('admin.updateError'))
    }
  }

  const handleViewOrder = async (orderId: number) => {
    try {
      const order = await ordersApi.getById(orderId)
      setSelectedOrder(order)
      setShowOrderModal(true)
    } catch (error) {
      console.error('Failed to load order:', error)
      toast.error(t('admin.loadError'))
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.user_id?.toString().includes(searchTerm.toLowerCase()) ||
                        order.id.toString().includes(searchTerm) ||
                        (order.customer_name && order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = !selectedStatus || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('admin.back')}
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-8">{t('admin.manage')} {t('admin.orders')}</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('admin.orderSearch')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
            >
              <option value="">{t('admin.allStatus')}</option>
              <option value="pending">{t('orders.status.pending')}</option>
              <option value="processing">{t('orders.status.processing')}</option>
              <option value="shipped">{t('orders.status.shipped')}</option>
              <option value="delivered">{t('orders.status.delivered')}</option>
              <option value="cancelled">{t('orders.status.cancelled')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderNumber')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderCustomer')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderItems')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderTotal')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderStatus')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderDate')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="text-gray-500">{t('admin.loading')}</p>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="text-gray-500">{t('admin.orderNotFound')}</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">#{order.id}</td>
                    <td className="py-3 px-4">{order.user_id || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-600">{order.items?.length || 0}</td>
                    <td className="py-3 px-4 font-medium">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {t(`orders.status.${order.status}`)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="p-2 text-stech-blue hover:bg-blue-50 rounded transition-colors"
                          title={t('admin.view')}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="px-2 py-1 rounded text-xs font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-stech-blue"
                        >
                          <option value="pending">{t('orders.status.pending')}</option>
                          <option value="processing">{t('orders.status.processing')}</option>
                          <option value="shipped">{t('orders.status.shipped')}</option>
                          <option value="delivered">{t('orders.status.delivered')}</option>
                          <option value="cancelled">{t('orders.status.cancelled')}</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{t('admin.orderNumber')} #{selectedOrder.id}</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">{t('admin.orderCustomer')}</p>
                  <p className="font-medium">{selectedOrder.user_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('admin.orderStatus')}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {t(`orders.status.${selectedOrder.status}`)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('admin.orderTotal')}</p>
                  <p className="font-medium">{formatPrice(selectedOrder.total)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('admin.orderDate')}</p>
                  <p className="font-medium">{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString('pt-BR') : 'N/A'}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">{t('admin.orderItems')}</h3>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{item.name || 'Produto'}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price || 0)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">{t('admin.noItems')}</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-3">{t('admin.orderEmail')}</h3>
                <p className="text-gray-600">{selectedOrder.shipping_address || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
