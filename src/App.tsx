import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Favorites from './pages/Favorites'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminCategories from './pages/admin/AdminCategories'
import AdminCategoryForm from './pages/admin/AdminCategoryForm'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'
import { useAuthStore } from './context/AuthContext'

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore()
  
  // Debug: Log user state
  console.log('AdminRoute check:', { isAuthenticated, user, isAdmin: user?.isAdmin })
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login')
    return <Navigate to="/login" />
  }
  
  // Temporarily allow access for debugging
  // if (!user?.isAdmin) {
  //   console.log('Not admin, redirecting to home')
  //   return <Navigate to="/" />
  // }
  
  console.log('Access granted to admin panel')
  return <>{children}</>
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/produtos" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/produtos/novo" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
            <Route path="/admin/produtos/:id/editar" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
            <Route path="/admin/categorias" element={<AdminRoute><AdminCategories /></AdminRoute>} />
            <Route path="/admin/categorias/nova" element={<AdminRoute><AdminCategoryForm /></AdminRoute>} />
            <Route path="/admin/categorias/:id/editar" element={<AdminRoute><AdminCategoryForm /></AdminRoute>} />
            <Route path="/admin/pedidos" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/usuarios" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
