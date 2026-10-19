import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, Heart, Globe } from 'lucide-react'
import { useCartStore } from '../context/CartContext'
import { useAuthStore } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useState, useEffect } from 'react'
import { categoriesApi } from '../lib/api'

export default function Header() {
  const { t, language, setLanguage } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const getItemCount = useCartStore((state) => state.getItemCount)
  const { isAuthenticated, user, logout } = useAuthStore()
  const cartCount = getItemCount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

  // Verifica se está em rota admin
  const isAdminRoute = location.pathname.startsWith('/admin')

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const mainCategories = [
    { name: 'header.justForYou', link: '/' },
    { name: 'header.newIn', link: '/produtos' },
    ...categories.map(cat => ({
      name: cat.name,
      link: `/produtos?category=${encodeURIComponent(cat.name)}`
    }))
  ]

  const adminNavItems = [
    { name: 'admin.dashboard', link: '/admin' },
    { name: 'admin.products', link: '/admin/produtos' },
    { name: 'admin.orders', link: '/admin/pedidos' },
    { name: 'admin.users', link: '/admin/usuarios' },
    { name: 'admin.categories', link: '/admin/categorias' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Bar - SHEIN style */}
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-10">
            {/* Idioma */}
            <button
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="flex items-center space-x-1 text-xs text-gray-600 hover:text-stech-blue transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'pt' ? 'EN' : 'PT'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button - apenas em mobile pequeno */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-gray-700 hover:text-stech-blue"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="STECH"
              className="h-10 w-auto"
            />
          </Link>

          {/* Search Bar - Centered */}
          <div className="flex-1 max-w-2xl mx-4 md:mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder={t('header.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-stech-blue focus:border-transparent text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-stech-blue text-white p-1.5 rounded-full hover:bg-stech-red transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/carrinho" className="relative p-2 text-gray-700 hover:text-stech-blue transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stech-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Favorites */}
            <Link to="/favoritos" className="hidden sm:block p-2 text-gray-700 hover:text-stech-blue transition-colors">
              <Heart className="w-6 h-6" />
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-stech-blue transition-colors">
                  <User className="w-6 h-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {t('header.profile')}
                  </Link>
                  <Link
                    to="/pedidos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {t('header.orders')}
                  </Link>
                  <Link
                    to="/favoritos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {t('header.favorites')}
                  </Link>
                  {user?.isAdmin && (
                    <>
                      <div className="border-t border-gray-200" />
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-stech-blue hover:bg-gray-50 font-medium transition-colors"
                      >
                        {t('header.admin')}
                      </Link>
                    </>
                  )}
                  <div className="border-t border-gray-200" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    {t('header.logout')}
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-gray-700 hover:text-stech-blue transition-colors">
                <User className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Categories Navigation - SHEIN style horizontal scroll (mostra em tablet e desktop) */}
      {!isAdminRoute && (
        <div className="hidden sm:block border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide">
              {mainCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.link}
                  className="text-sm text-gray-700 hover:text-stech-blue whitespace-nowrap font-medium transition-colors duration-200 flex-shrink-0"
                >
                  {t(cat.name)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Admin Navigation (mostra em tablet e desktop) */}
      {isAdminRoute && (
        <div className="hidden sm:block border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide">
              {adminNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className={`text-sm whitespace-nowrap font-medium transition-colors duration-200 flex-shrink-0 ${
                    location.pathname === item.link
                      ? 'text-stech-blue bg-gray-100 px-3 py-1 rounded'
                      : 'text-gray-700 hover:text-stech-blue'
                  }`}
                >
                  {t(item.name)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-3">
              {isAdminRoute ? (
                adminNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      location.pathname === item.link
                        ? 'text-stech-blue'
                        : 'text-gray-700 hover:text-stech-blue'
                    }`}
                  >
                    {t(item.name)}
                  </Link>
                ))
              ) : (
                mainCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-700 hover:text-stech-blue font-medium transition-colors"
                  >
                    {t(cat.name)}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
