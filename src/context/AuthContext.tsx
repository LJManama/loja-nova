import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'
import { authApi } from '../lib/api'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const response = await authApi.login(email, password)
        console.log('Login response:', response)
        
        if (response.success) {
          const user: User = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            isAdmin: response.user.is_admin === 1 || response.user.is_admin === true,
            createdAt: response.user.created_at,
          }
          console.log('User object created:', user)
          set({ user, isAuthenticated: true })
        } else {
          throw new Error(response.error || 'Login failed')
        }
      },
      register: async (name, email, password, phone) => {
        const response = await authApi.register(name, email, password, phone)
        if (response.success) {
          const user: User = {
            id: response.user?.id,
            name,
            email,
            phone,
            isAdmin: false,
            createdAt: new Date().toISOString(),
          }
          set({ user, isAuthenticated: true })
        } else {
          throw new Error(response.error || 'Registration failed')
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
