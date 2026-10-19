import { useState } from 'react'
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'
import { useAuthStore } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { toast } from 'sonner'

export default function Profile() {
  const { t } = useLanguage()
  const { user, updateUser, logout } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulação de atualização
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateUser({
      ...user!,
      ...formData,
    })

    toast.success('Perfil atualizado com sucesso!')
    setLoading(false)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Faça login para acessar seu perfil</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('profile.title')}</h1>

      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{t('profile.personal')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.name')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('login.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('register.phone')}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('checkout.shipping')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stech-blue text-white py-3 rounded-lg font-medium hover:bg-stech-red disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? 'Salvando...' : t('profile.save')}
              <Save className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">{t('profile.settings')}</h2>
          <p className="text-gray-600 mb-4">
            Membro desde: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
          </p>
          <button
            onClick={logout}
            className="w-full bg-stech-red text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            {t('header.logout')}
          </button>
        </div>
      </div>
    </div>
  )
}
