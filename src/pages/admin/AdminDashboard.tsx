import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Package, Users, ShoppingCart, DollarSign, ArrowRight, TrendingUp, Clock, Star, Edit } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { productsApi, ordersApi, usersApi } from '../../lib/api'
import { formatPrice } from '../../lib/utils'

export default function AdminDashboard() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  })
  const [recentProducts, setRecentProducts] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Carregar dados reais
      const [products, orders, users] = await Promise.all([
        productsApi.getAll(),
        ordersApi.getAll(),
        usersApi.getAll()
      ])

      // Calcular estatísticas
      const totalSales = orders.reduce((sum: number, order: any) => sum + parseFloat(order.total || 0), 0)
      
      setStats({
        totalSales,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalUsers: users.length
      })

      // Produtos recém cadastrados (últimos 5)
      setRecentProducts(products.slice(0, 5))

      // Melhores produtos (por rating ou vendas simuladas)
      const sortedByRating = [...products].sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
      setTopProducts(sortedByRating.slice(0, 5))

      // Pedidos recentes
      setRecentOrders(orders.slice(0, 5))
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return t('orders.status.pending')
      case 'processing': return t('orders.status.processing')
      case 'shipped': return t('orders.status.shipped')
      case 'delivered': return t('orders.status.delivered')
      case 'cancelled': return t('orders.status.cancelled')
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('admin.dashboard')}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold">{formatPrice(stats.totalSales)}</h3>
          <p className="text-gray-600 text-sm">{t('admin.totalSales')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
          <p className="text-gray-600 text-sm">{t('admin.totalOrders')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-purple-600" />
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
          <p className="text-gray-600 text-sm">{t('admin.totalProducts')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-orange-600" />
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          <p className="text-gray-600 text-sm">{t('admin.totalUsers')}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/admin/produtos" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border hover:border-stech-blue">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">{t('admin.manage')} {t('admin.products')}</h3>
              <p className="text-sm text-gray-600">{t('admin.productsDesc')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        <Link to="/admin/pedidos" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border hover:border-stech-blue">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">{t('admin.manage')} {t('admin.orders')}</h3>
              <p className="text-sm text-gray-600">{t('admin.ordersDesc')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        <Link to="/admin/usuarios" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border hover:border-stech-blue">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">{t('admin.manage')} {t('admin.users')}</h3>
              <p className="text-sm text-gray-600">{t('admin.usersDesc')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>

        <Link to="/admin/categorias" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border hover:border-stech-blue">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">{t('admin.manage')} {t('admin.categories')}</h3>
              <p className="text-sm text-gray-600">{t('admin.categoriesDesc')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Products (Novidades) */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-stech-blue" />
              <h2 className="text-xl font-semibold">{t('admin.recentProducts')}</h2>
            </div>
            <Link to="/admin/produtos" className="text-stech-blue hover:text-stech-red text-sm">
              {t('home.viewAll')}
            </Link>
          </div>

          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="text-sm font-bold text-stech-blue">{formatPrice(product.price)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/admin/produtos/${product.id}/editar`}
                    className="p-2 text-gray-600 hover:text-stech-blue transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products (Melhores) */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">{t('admin.topProducts')}</h2>
            </div>
            <Link to="/admin/produtos" className="text-stech-blue hover:text-stech-red text-sm">
              {t('home.viewAll')}
            </Link>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-stech-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-stech-blue">{formatPrice(product.price)}</p>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-stech-blue" />
            <h2 className="text-xl font-semibold">{t('admin.recentOrders')}</h2>
          </div>
          <Link to="/admin/pedidos" className="text-stech-blue hover:text-stech-red text-sm">
            {t('home.viewAll')}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderNumber')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderCustomer')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderTotal')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderStatus')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.orderDate')}</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">#{order.id}</td>
                    <td className="py-3 px-4">{order.user_id || 'N/A'}</td>
                    <td className="py-3 px-4 font-medium">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{new Date(order.created_at || order.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    {t('admin.noOrders')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
