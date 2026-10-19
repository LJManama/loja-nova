import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Truck, Shield, Headphones, ShoppingCart, Plus } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { productsApi, categoriesApi } from '../lib/api'
import { formatPrice, formatDiscount } from '../lib/utils'
import { useCartStore } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { toast } from 'sonner'

export default function Home() {
  const { t, language } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [heroProducts, setHeroProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [heroEmblaRef, heroEmblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  useEffect(() => {
    loadData()
  }, [language])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [products, emblaApi])

  useEffect(() => {
    if (heroEmblaApi) {
      heroEmblaApi.reInit()
    }
  }, [heroProducts, heroEmblaApi])

  // Auto-play for hero carousel
  useEffect(() => {
    if (!heroEmblaApi) return
    const interval = setInterval(() => {
      heroEmblaApi.scrollNext()
    }, 2000)
    return () => clearInterval(interval)
  }, [heroEmblaApi])

  // Auto-play for promotions carousel
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 2000)
    return () => clearInterval(interval)
  }, [emblaApi])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        productsApi.getAll({ featured: true }),
        categoriesApi.getAll()
      ])
      setProducts(productsData)
      setCategories(categoriesData)

      // Selecionar 1 produto de cada categoria para o hero carousel
      const heroProductsData: any[] = []
      for (const category of categoriesData) {
        const categoryProducts = await productsApi.getAll({ category: category.name })
        if (categoryProducts.length > 0) {
          heroProductsData.push(categoryProducts[0])
        }
      }
      setHeroProducts(heroProductsData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: any) => {
    const result = addItem(product)
    if (result.alreadyAdded) {
      toast.error(`${product.name} ${t('toast.alreadyInCart')}`)
    } else {
      toast.success(`${product.name} ${t('toast.addedToCart')}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Carregando...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Banner - SEM gradiente (cor neutra) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white text-gray-900"
      >
        <div className="container mx-auto px-4 py-8">
          {/* Hero Product Carousel */}
          {heroProducts.length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden" ref={heroEmblaRef}>
                <div className="flex gap-4">
                  {heroProducts.map((product) => (
                    <div key={product.id} className="flex-[0_0_200px]">
                      <Link to={`/produto/${product.id}`} className="block">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3 text-stech-dark">
                            <h3 className="font-semibold text-xs mb-1 line-clamp-2">{product.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-stech-blue">
                                {formatPrice(product.price)}
                              </span>
                              {parseFloat(product.discount || '0') > 0 && (
                                <span className="bg-stech-red text-white text-xs px-1.5 py-0.5 rounded">
                                  {formatDiscount(product.discount)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Carregando produtos...</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Flash Sale Section - SHEIN style */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-6 bg-white border-b"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-stech-red">🔥 {t('home.sale')}</h2>
            <Link
              to="/produtos?discount=true"
              className="text-sm text-stech-blue hover:text-stech-red font-medium transition-colors"
            >
              {t('home.viewAll')}
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {products.filter(p => parseFloat(p.discount || '0') > 0).slice(0, 8).map((product: any) => (
                  <div key={product.id} className="flex-[0_0_180px]">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <Link to={`/produto/${product.id}`}>
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
                      <div className="p-3">
                        <Link to={`/produto/${product.id}`}>
                          <h3 className="font-semibold text-xs mb-1 line-clamp-2 hover:text-stech-blue transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-sm font-bold text-stech-blue">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through ml-1">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-stech-blue text-white p-1.5 rounded hover:bg-stech-red transition-colors duration-300 flex items-center gap-1"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Categories Grid - SEM título */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-6 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/produtos?category=${category.name}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="font-semibold text-xs group-hover:text-stech-blue transition-colors line-clamp-1">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Top Trends - SHEIN style */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-6 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">🌟 {t('home.topTrends')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.slice(0, 10).map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <Link to={`/produto/${product.id}`}>
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
                <div className="p-3">
                  <Link to={`/produto/${product.id}`}>
                    <h3 className="font-semibold text-xs mb-1 line-clamp-2 hover:text-stech-blue transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold text-stech-blue">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-1">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-stech-blue text-white p-1.5 rounded hover:bg-stech-red transition-colors duration-300 flex items-center gap-1"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features - SHEIN style */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-8 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-10 h-10 text-stech-blue mb-2" />
              <h3 className="font-semibold text-sm">{t('home.feature.delivery')}</h3>
              <p className="text-xs text-gray-500">{t('home.feature.deliveryTime')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-10 h-10 text-stech-blue mb-2" />
              <h3 className="font-semibold text-sm">{t('home.feature.warranty')}</h3>
              <p className="text-xs text-gray-500">{t('home.feature.warrantyTime')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Headphones className="w-10 h-10 text-stech-blue mb-2" />
              <h3 className="font-semibold text-sm">{t('home.feature.support')}</h3>
              <p className="text-xs text-gray-500">{t('home.feature.supportTime')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Star className="w-10 h-10 text-stech-blue mb-2" />
              <h3 className="font-semibold text-sm">{t('home.feature.quality')}</h3>
              <p className="text-xs text-gray-500">{t('home.feature.qualityDesc')}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-12 bg-stech-blue text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">{t('home.cta.title')}</h2>
          <p className="text-lg mb-6 text-white/90">
            {t('home.cta.subtitle')}
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder={t('home.cta.email')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-stech-red"
            />
            <button className="bg-white text-stech-blue px-6 py-3 rounded-lg font-semibold hover:bg-stech-light transition-colors">
              {t('home.cta.subscribe')}
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
