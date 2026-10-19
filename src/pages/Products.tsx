import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Star, SlidersHorizontal, Grid, List } from 'lucide-react'
import { motion } from 'framer-motion'
import { productsApi, categoriesApi } from '../lib/api'
import { formatPrice, formatDiscount } from '../lib/utils'
import { useLanguage } from '../context/LanguageContext'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const { t, language } = useLanguage()
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    // Read category from URL
    const categoryParam = searchParams.get('category')
    setSelectedCategory(categoryParam || '')
  }, [searchParams])

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [searchParams, searchTerm, selectedCategory, priceRange, sortBy, language])

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
      
      // Read filters directly from URL
      const categoryParam = searchParams.get('category')
      const searchParam = searchParams.get('search')
      const discountParam = searchParams.get('discount')
      const sortParam = searchParams.get('sort')
      
      // Use state values or URL params
      const categoryFilter = selectedCategory || categoryParam
      const searchFilter = searchTerm || searchParam
      
      if (categoryFilter) filters.category = categoryFilter
      if (searchFilter) filters.search = searchFilter
      if (discountParam === 'true') filters.discount = true
      if (sortParam) filters.sort = sortParam
      if (sortBy !== 'default') filters.sort = sortBy
      
      let data = await productsApi.getAll(filters)
      
      let filtered = data
      if (priceRange !== 'all') {
        filtered = data.filter((product: any) => {
          if (priceRange === 'low') return product.price < 50000
          if (priceRange === 'medium') return product.price >= 50000 && product.price < 100000
          if (priceRange === 'high') return product.price >= 100000
          return true
        })
      }
      
      setProducts(filtered)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-stech-blue">{t('products.home')}</Link>
        <span>/</span>
        <span className="text-gray-700">{t('products.title')}</span>
      </div>

      {/* Top Filters Bar - SHEIN style */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-0 z-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('products.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue text-sm"
            />
          </div>

          {/* Categories */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue text-sm"
          >
            <option value="">{t('products.all')}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          {/* Price Range */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue text-sm"
          >
            <option value="all">{t('products.priceAll')}</option>
            <option value="low">{t('products.priceLow')}</option>
            <option value="medium">{t('products.priceMedium')}</option>
            <option value="high">{t('products.priceHigh')}</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue text-sm"
          >
            <option value="default">{t('products.sortDefault')}</option>
            <option value="price-low">{t('products.sortPriceLow')}</option>
            <option value="price-high">{t('products.sortPriceHigh')}</option>
            <option value="rating">{t('products.sortRating')}</option>
            <option value="new">{t('products.sortNew')}</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-stech-blue text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-stech-blue text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('')
              setPriceRange('all')
              setSortBy('default')
            }}
            className="px-4 py-2.5 text-sm text-stech-blue hover:text-stech-red border border-stech-blue rounded-lg hover:border-stech-red transition-colors"
          >
            {t('products.clearFilters')}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {products.length} {t('products.found')}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <SlidersHorizontal className="w-4 h-4" />
          <span>{t('products.filters')}</span>
        </div>
      </div>

      {/* Products Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('products.loading')}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('products.notFound')}</p>
          <p className="text-gray-400 text-sm mt-2">{t('products.tryFilters')}</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex">
                <Link to={`/produto/${product.id}`} className="flex-shrink-0 w-48">
                  <div className="aspect-square overflow-hidden relative">
                    {parseFloat(product.discount || '0') > 0 && (
                      <span className="absolute top-2 left-2 bg-stech-red text-white text-xs px-2 py-1 rounded">
                        {formatDiscount(product.discount)}
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="flex-1 p-4">
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-stech-blue transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-stech-blue">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </motion.div>
    </div>
  )
}
