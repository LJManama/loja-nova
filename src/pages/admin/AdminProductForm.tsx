import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, X, Upload } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { toast } from 'sonner'
import { categoriesApi, productsApi } from '../../lib/api'

export default function AdminProductForm() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    image: '',
    category_id: 0,
    brand: '',
    stock: 0,
    featured: false,
    specifications: {} as Record<string, string>,
  })
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadCategories()
    if (isEditing && id) {
      loadProduct(parseInt(id))
    }
  }, [id, isEditing])

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadProduct = async (productId: number) => {
    try {
      setLoading(true)
      const product = await productsApi.getById(productId)
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.original_price || product.price,
        discount: product.discount || 0,
        image: product.image,
        category_id: product.category_id,
        brand: product.brand,
        stock: product.stock,
        featured: product.featured || false,
        specifications: product.specifications || {},
      })
    } catch (error) {
      console.error('Failed to load product:', error)
    } finally {
      setLoading(false)
    }
  }

  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      // Preparar dados para envio
      const dataToSend = {
        ...formData,
        original_price: formData.originalPrice || formData.price,
        discount: formData.discount || 0,
        description_pt: formData.description,
        description_en: formData.description,
        specifications_pt: JSON.stringify(formData.specifications),
        specifications_en: JSON.stringify(formData.specifications),
      }

      if (isEditing && id) {
        await productsApi.update(parseInt(id), dataToSend)
        toast.success(t('admin.updateSuccess'))
      } else {
        await productsApi.create(dataToSend)
        toast.success(t('admin.createSuccess'))
      }
      navigate('/admin/produtos')
    } catch (error) {
      toast.error(t('admin.saveError'))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specKey]: specValue,
        },
      })
      setSpecKey('')
      setSpecValue('')
    }
  }

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications }
    delete newSpecs[key]
    setFormData({ ...formData, specifications: newSpecs })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('image', file)

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
      toast.error(t('admin.imageError'))
      console.error(error)
    } finally {
      setUploadingImage(false)
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/produtos')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('admin.back')}
        </button>
        <h1 className="text-3xl font-bold">
          {isEditing ? t('admin.editProduct') : t('admin.addProduct')}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">{t('admin.productName')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Descrição */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">{t('admin.description')}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Preço Original */}
          <div>
            <label className="block text-sm font-medium mb-2">{t('admin.originalPrice')} (MZN)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.originalPrice}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
                setFormData({ ...formData, originalPrice: value })
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
            />
          </div>

          {/* Desconto */}
          <div>
            <label className="block text-sm font-medium mb-2">{t('admin.discount')} (%)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.discount}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
                setFormData({ ...formData, discount: value })
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
            />
            {formData.discount > 0 && formData.originalPrice > 0 && (
              <p className="text-xs text-gray-600 mt-1">
                {t('admin.discountedPrice')}: {Math.round(formData.originalPrice * (1 - formData.discount / 100))} {t('admin.currency')}
              </p>
            )}
          </div>

          {/* Preço Final */}
          <div>
            <label className="block text-sm font-medium mb-2">{t('admin.price')} (MZN)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
                setFormData({ ...formData, price: value })
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue font-semibold"
              required
            />
          </div>

          {/* Estoque */}
          <div>
            <label className="block text-sm font-medium mb-2">{t('admin.stock')}</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium mb-2">{t('products.category')}</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">{t('admin.categorySelect')}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Marca */}
          <div>
            <label className="block text-sm font-medium mb-2">{t('admin.brand')}</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Imagem */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">{t('admin.image')}</label>
            <div className="space-y-4">
              {/* Upload de arquivo */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-stech-blue text-white rounded-lg hover:bg-stech-red cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>{t('admin.uploadImage')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {uploadingImage && (
                  <span className="text-sm text-gray-600">{t('admin.loading')}</span>
                )}
              </div>

              {/* Ou URL */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{t('admin.orUrl')}:</span>
              </div>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                placeholder="/images/nome-do-arquivo.jpg"
              />

              {/* Preview */}
              {formData.image && (
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">{t('admin.preview')}</p>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      {t('admin.removeImage')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Destaque */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">{t('admin.featured')}</span>
            </label>
          </div>

          {/* Especificações */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">{t('admin.specifications')}</label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder={t('admin.specKey')}
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder={t('admin.specValue')}
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSpecification}
                className="px-4 py-2 bg-stech-blue text-white rounded-lg hover:bg-stech-red transition-colors"
              >
                {t('admin.addSpec')}
              </button>
            </div>
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                  <span>
                    <strong>{key}:</strong> {value as string}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/produtos')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('admin.cancel')}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-stech-blue text-white rounded-lg hover:bg-stech-red flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            <Save className="w-4 h-4" />
            {loading ? t('admin.saving') : (isEditing ? t('admin.updateProduct') : t('admin.saveProduct'))}
          </button>
        </div>
      </form>
    </div>
  )
}
