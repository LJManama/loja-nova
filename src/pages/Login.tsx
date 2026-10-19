import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Lock, ArrowRight, Mail, X } from 'lucide-react'
import { useAuthStore } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { toast } from 'sonner'

export default function Login() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMethod, setResetMethod] = useState<'email' | 'sms'>('email')
  const [resetting, setResetting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success(t('login.success'))
      navigate('/')
    } catch (error) {
      toast.error(t('login.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail.trim()) {
      toast.error(t('login.enterEmail'))
      return
    }

    setResetting(true)
    try {
      // Simular envio de reset
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success(
        resetMethod === 'email'
          ? t('toast.emailSent')
          : t('toast.smsSent')
      )
      setShowResetModal(false)
      setResetEmail('')
    } catch (error) {
      toast.error(t('login.resetError'))
    } finally {
      setResetting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">{t('login.title')}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">{t('login.email')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">{t('login.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input id="remember" name="remember" type="checkbox" className="mr-2" />
                <span className="text-sm">{t('login.remember')}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="text-sm text-stech-blue hover:text-stech-red transition-colors"
              >
                {t('login.forgotPassword')}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stech-blue text-white py-3 rounded-lg font-medium hover:bg-stech-red disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? 'Entrando...' : t('login.submit')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('login.noAccount')}{' '}
              <Link to="/registro" className="text-stech-blue hover:text-stech-red font-medium transition-colors">
                {t('login.register')}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t('login.resetTitle')}</h2>
              <button
                onClick={() => setShowResetModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">{t('login.resetMethod')}</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setResetMethod('email')}
                  className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                    resetMethod === 'email'
                      ? 'border-stech-blue bg-stech-blue text-white'
                      : 'border-gray-300 hover:border-stech-blue'
                  }`}
                >
                  <Mail className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">{t('login.resetEmail')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setResetMethod('sms')}
                  className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                    resetMethod === 'sms'
                      ? 'border-stech-blue bg-stech-blue text-white'
                      : 'border-gray-300 hover:border-stech-blue'
                  }`}
                >
                  <User className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm">{t('login.resetSms')}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="reset-input" className="block text-sm font-medium mb-2">
                  {resetMethod === 'email' ? t('login.email') : t('register.phone')}
                </label>
                <div className="relative">
                  {resetMethod === 'email' ? (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  ) : (
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  )}
                  <input
                    id="reset-input"
                    name="reset-input"
                    type={resetMethod === 'email' ? 'email' : 'tel'}
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stech-blue"
                    placeholder={resetMethod === 'email' ? t('login.resetEmailPlaceholder') : t('login.resetSmsPlaceholder')}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetting}
                className="w-full bg-stech-blue text-white py-3 rounded-lg font-medium hover:bg-stech-red disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {resetting ? t('login.sending') : t('login.sendRecovery')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
