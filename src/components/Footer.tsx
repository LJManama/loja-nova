import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-stech-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="STECH ENGENHARIA"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-gray-400 text-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">{t('footer.service1')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.service2')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.service3')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.service4')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.service5')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.service6')}</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.contactLink')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.returnPolicy')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.shipping')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>+258 84 239 0756</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>info@stecheng.co.mz</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-xs">
                  Estrada Nacional Nr7, Paragem PMA<br />
                  Bairro Azul, Cidade de Tete<br />
                  Província de Tete, Moçambique
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-xs text-gray-400">
                  <strong>{t('footer.hours')}:</strong><br />
                  {t('footer.weekdays')}<br />
                  {t('footer.saturday')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
