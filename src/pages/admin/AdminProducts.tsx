import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { productsApi, categoriesApi } from '../../lib/api'
import { formatPrice } from '../../lib/utils'
import { toast } from 'sonner'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function AdminProducts() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; productId: number | null }>({
    isOpen: false,
    productId: null
  })

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [searchTerm, selectedCategory])

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      const filters: any = {}
      if (selectedCategory) filters.category = selectedCategory
      if (searchTerm) filters.search = searchTerm
      
      const data = await productsApi.getAll(filters)
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeleteDialog({ isOpen: true, productId: id })
  }

  const confirmDelete = async () => {
    if (deleteDialog.productId !== null) {
      try {
        await productsApi.delete(deleteDialog.productId)
        toast.success(t('admin.deleteSuccess'))
        loadProducts()
      } catch (error) {
        console.error('Failed to delete product:', error)
        toast.error(t('admin.deleteError'))
      }
    }
  }

  const categoryNames = categories.map(cat => cat.name)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.manage')} {t('admin.products')}</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/categorias/nova"
            className="bg-stech-dark text-white px-4 py-2 rounded-lg font-medium hover:bg-stech-blue transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('admin.addCategory')}
          </Link>
          <Link
            to="/admin/produtos/novo"
            className="bg-stech-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-stech-red transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('admin.addProduct')}
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('admin.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('products.all')}</option>
              {categoryNames.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.productName')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('products.category')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.price')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.stock')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.status')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <p className="text-gray-500">{t('admin.loading')}</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <p className="text-gray-500">{t('admin.noResults')}</p>
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4 font-medium">{formatPrice(product.price)}</td>
                  <td className="py-3 px-4">
                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {product.stock > 0 ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ativo
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {t('products.outOfStock')}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        to={`/admin/produtos/${product.id}/editar`} 
                        className="p-2 text-stech-blue hover:bg-blue-50 rounded transition-colors"
                        title={t('admin.editProduct')}
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="p-2 text-stech-red hover:bg-red-50 rounded transition-colors"
                        title={t('admin.delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, productId: null })}
        onConfirm={confirmDelete}
        title={t('admin.delete')}
        message={t('admin.deleteConfirm')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
      />
    </div>
  )
}
