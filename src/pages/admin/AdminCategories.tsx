import { useState, useEffect } from 'react'
import { Plus, Search, ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { categoriesApi } from '../../lib/api'
import { toast } from 'sonner'
import ConfirmDialog from '../../components/ConfirmDialog'

export default function AdminCategories() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; categoryId: number | null }>({
    isOpen: false,
    categoryId: null
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (categoryId: number) => {
    setDeleteDialog({ isOpen: true, categoryId })
  }

  const confirmDelete = async () => {
    if (deleteDialog.categoryId !== null) {
      try {
        await categoriesApi.delete(deleteDialog.categoryId)
        toast.success(t('admin.deleteSuccess'))
        loadCategories()
      } catch (error) {
        toast.error(t('admin.deleteError'))
      }
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.categories')}</h1>
        <Link
          to="/admin/categorias/nova"
          className="bg-stech-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-stech-red flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.addCategory')}
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('admin.categorySearch')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('admin.loading')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{category.description}</p>
              <p className="text-xs text-gray-400 mb-4">{category.productCount} {t('admin.productCount')}</p>
              <div className="flex gap-2">
                <Link
                  to={`/admin/categorias/${category.id}/editar`}
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  {t('admin.edit')}
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('admin.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {filteredCategories.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('admin.categoryNotFound')}</p>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, categoryId: null })}
        onConfirm={confirmDelete}
        title={t('admin.deleteCategory')}
        message={t('admin.deleteCategoryConfirm')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
      />
    </div>
  )
}
