import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { categoriesApi } from '../../lib/api'
import { toast } from 'sonner'

export default function AdminCategoryForm() {
  const { t } = useLanguage()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  })

  useEffect(() => {
    if (id) {
      loadCategory(parseInt(id))
    }
  }, [id])

  const loadCategory = async (categoryId: number) => {
    try {
      setLoading(true)
      const data = await categoriesApi.getById(categoryId)
      setFormData({
        name: data.name,
        description: data.description,
        image: data.image,
      })
    } catch (error) {
      console.error('Failed to load category:', error)
      toast.error(t('admin.loadError'))
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append('image', file)

    try {
      const response = await fetch('/api/upload_image.php', {
        method: 'POST',
        body: uploadFormData,
      })
      const result = await response.json()

      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }))
        toast.success(t('admin.imageLoaded'))
      } else {
        toast.error(result.error || t('admin.imageError'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(t('admin.imageError'))
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      if (id) {
        await categoriesApi.update(parseInt(id), formData)
        toast.success(t('admin.updateSuccess'))
      } else {
        await categoriesApi.create(formData)
        toast.success(t('admin.createSuccess'))
      }
      navigate('/admin/categorias')
    } catch (error) {
      console.error('Failed to save category:', error)
      toast.error(t('admin.saveError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/admin/categorias"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('admin.back')}
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {id ? t('admin.editCategory') : t('admin.newCategory')}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.categoryName')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.categoryDesc')}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.imageUrl')}</label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                  placeholder="/images/nome-da-imagem.jpg"
                />
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{t('admin.orUrl')}</span>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 py-4"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {uploading ? t('admin.saving') : t('admin.uploadImage')}
                    </span>
                  </label>
                </div>
                
                {formData.image ? (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="relative inline-block">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Link
              to="/admin/categorias"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {t('admin.cancel')}
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-stech-blue text-white rounded-lg hover:bg-stech-red disabled:opacity-50"
            >
              {loading ? t('admin.saving') : (id ? t('admin.updateCategory') : t('admin.createCategory'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
