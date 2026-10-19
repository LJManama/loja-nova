import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot, User } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface QuickQuestion {
  id: string
  text: string
  response: string
}

export default function Chatbot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('chatbot.welcome'),
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [lastBotQuestion, setLastBotQuestion] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions: QuickQuestion[] = [
    { id: 'products', text: t('chatbot.quickProducts'), response: t('chatbot.productGeneralResponse') },
    { id: 'price', text: t('chatbot.quickPrice'), response: t('chatbot.priceResponse') },
    { id: 'delivery', text: t('chatbot.quickDelivery'), response: t('chatbot.deliveryResponse') },
    { id: 'payment', text: t('chatbot.quickPayment'), response: t('chatbot.paymentResponse') },
    { id: 'warranty', text: t('chatbot.quickWarranty'), response: t('chatbot.warrantyResponse') },
    { id: 'contact', text: t('chatbot.quickContact'), response: t('chatbot.contactResponse') },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isMinimized])

  const handleQuickQuestion = (question: QuickQuestion) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: question.text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setShowQuickQuestions(false)
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: question.response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 800)
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Respostas afirmativas simples (sim, yes, gostaria, quero, etc)
    if (lowerMessage === 'sim' || lowerMessage === 'yes' || lowerMessage === 'gostaria' || lowerMessage === 'quero' || lowerMessage === 'i want' || lowerMessage === 'i would like') {
      // Se a última pergunta do bot foi sobre smartphones
      if (lastBotQuestion.includes('smartphone') || lastBotQuestion.includes('celular') || lastBotQuestion.includes('phone')) {
        return t('chatbot.smartphoneAction')
      }
      // Se foi sobre laptops
      if (lastBotQuestion.includes('laptop') || lastBotQuestion.includes('notebook') || lastBotQuestion.includes('computador')) {
        return t('chatbot.laptopAction')
      }
      // Se foi sobre câmeras
      if (lastBotQuestion.includes('camera') || lowerMessage.includes('câmera')) {
        return t('chatbot.cameraAction')
      }
      // Se foi sobre TVs
      if (lastBotQuestion.includes('tv') || lastBotQuestion.includes('televisão')) {
        return t('chatbot.tvAction')
      }
      // Se foi sobre impressoras
      if (lastBotQuestion.includes('impressora') || lastBotQuestion.includes('printer')) {
        return t('chatbot.printerAction')
      }
      // Se foi sobre gaming
      if (lastBotQuestion.includes('gaming') || lastBotQuestion.includes('jogo')) {
        return t('chatbot.gamingAction')
      }
      // Se foi sobre redes
      if (lastBotQuestion.includes('rede') || lastBotQuestion.includes('network') || lastBotQuestion.includes('router')) {
        return t('chatbot.networkAction')
      }
      // Se foi sobre acessórios
      if (lastBotQuestion.includes('acessório') || lastBotQuestion.includes('accessory')) {
        return t('chatbot.accessoriesAction')
      }
      // Se foi sobre áudio
      if (lastBotQuestion.includes('áudio') || lastBotQuestion.includes('audio') || lastBotQuestion.includes('som')) {
        return t('chatbot.audioAction')
      }
      // Resposta padrão para "sim"
      return t('chatbot.yesResponse')
    }

    // Respostas negativas (não, no)
    if (lowerMessage === 'não' || lowerMessage === 'nao' || lowerMessage === 'no') {
      return t('chatbot.noResponse')
    }

    // Respostas em português - Produtos específicos
    if (lowerMessage.includes('smartphone') || lowerMessage.includes('celular') || lowerMessage.includes('telemóvel') || lowerMessage.includes('telemove') || lowerMessage.includes('phone') || lowerMessage.includes('samsung') || lowerMessage.includes('iphone') || lowerMessage.includes('xiaomi')) {
      return t('chatbot.smartphoneResponse')
    }
    if (lowerMessage.includes('laptop') || lowerMessage.includes('notebook') || lowerMessage.includes('computador') || lowerMessage.includes('pc') || lowerMessage.includes('hp') || lowerMessage.includes('dell') || lowerMessage.includes('lenovo')) {
      return t('chatbot.laptopResponse')
    }
    if (lowerMessage.includes('camera') || lowerMessage.includes('câmera') || lowerMessage.includes('foto') || lowerMessage.includes('canon') || lowerMessage.includes('sony') || lowerMessage.includes('gopro')) {
      return t('chatbot.cameraResponse')
    }
    if (lowerMessage.includes('tv') || lowerMessage.includes('televisão') || lowerMessage.includes('televisao') || lowerMessage.includes('monitor') || lowerMessage.includes('samsung tv') || lowerMessage.includes('lg')) {
      return t('chatbot.tvResponse')
    }
    if (lowerMessage.includes('impressora') || lowerMessage.includes('print') || lowerMessage.includes('scanner') || lowerMessage.includes('epson') || lowerMessage.includes('hp print')) {
      return t('chatbot.printerResponse')
    }
    if (lowerMessage.includes('gaming') || lowerMessage.includes('jogo') || lowerMessage.includes('playstation') || lowerMessage.includes('xbox') || lowerMessage.includes('nintendo')) {
      return t('chatbot.gamingResponse')
    }
    if (lowerMessage.includes('rede') || lowerMessage.includes('router') || lowerMessage.includes('wifi') || lowerMessage.includes('tp-link') || lowerMessage.includes('cisco') || lowerMessage.includes('mikrotik')) {
      return t('chatbot.networkResponse')
    }
    if (lowerMessage.includes('acessório') || lowerMessage.includes('acessorio') || lowerMessage.includes('fone') || lowerMessage.includes('headphone') || lowerMessage.includes('cabo') || lowerMessage.includes('carregador')) {
      return t('chatbot.accessoriesResponse')
    }
    if (lowerMessage.includes('áudio') || lowerMessage.includes('audio') || lowerMessage.includes('som') || lowerMessage.includes('alto-falante') || lowerMessage.includes('jbl') || lowerMessage.includes('sony audio')) {
      return t('chatbot.audioResponse')
    }

    // Respostas em português - Perguntas gerais sobre produtos
    if (lowerMessage.includes('qual produto') || lowerMessage.includes('recomendar') || lowerMessage.includes('melhor') || lowerMessage.includes('qual o melhor') || lowerMessage.includes('sugestão') || lowerMessage.includes('sugestao')) {
      return t('chatbot.recommendationResponse')
    }
    if (lowerMessage.includes('produto') || lowerMessage.includes('item') || lowerMessage.includes('comprar')) {
      return t('chatbot.productGeneralResponse')
    }

    // Respostas em português - Horário
    if (lowerMessage.includes('horário') || lowerMessage.includes('horario') || lowerMessage.includes('abre') || lowerMessage.includes('fecha')) {
      return t('chatbot.hoursResponse')
    }

    // Respostas em português - Localização
    if (lowerMessage.includes('local') || lowerMessage.includes('endereço') || lowerMessage.includes('endereco') || lowerMessage.includes('onde') || lowerMessage.includes('maputo')) {
      return t('chatbot.locationResponse')
    }

    // Respostas em português - Marcas
    if (lowerMessage.includes('marca') || lowerMessage.includes('fabricante') || lowerMessage.includes('brands')) {
      return t('chatbot.brandsResponse')
    }

    // Respostas em português - Rastreamento
    if (lowerMessage.includes('rastrear') || lowerMessage.includes('rastreio') || lowerMessage.includes('acompanhar') || lowerMessage.includes('tracking')) {
      return t('chatbot.trackingResponse')
    }

    // Respostas em português - Cupons
    if (lowerMessage.includes('cupom') || lowerMessage.includes('desconto') || lowerMessage.includes('promoção') || lowerMessage.includes('promocao') || lowerMessage.includes('código') || lowerMessage.includes('codigo')) {
      return t('chatbot.couponResponse')
    }

    // Respostas em português - Empresas
    if (lowerMessage.includes('empresa') || lowerMessage.includes('corporativo') || lowerMessage.includes('b2b') || lowerMessage.includes('atacado')) {
      return t('chatbot.businessResponse')
    }

    // Respostas em português - Suporte técnico
    if (lowerMessage.includes('suporte') || lowerMessage.includes('técnico') || lowerMessage.includes('tecnico') || lowerMessage.includes('ajuda técnica') || lowerMessage.includes('configuração') || lowerMessage.includes('configuracao')) {
      return t('chatbot.supportResponse')
    }

    // Respostas em português - Compra por telefone
    if (lowerMessage.includes('telefone') || lowerMessage.includes('ligar') || lowerMessage.includes('call') || lowerMessage.includes('whatsapp')) {
      return t('chatbot.phoneOrderResponse')
    }

    // Respostas em português - Parcelamento
    if (lowerMessage.includes('parcela') || lowerMessage.includes('parcelamento') || lowerMessage.includes('crediário') || lowerMessage.includes('pagamento parcelado')) {
      return t('chatbot.installmentResponse')
    }

    // Respostas em português - Estoque
    if (lowerMessage.includes('estoque') || lowerMessage.includes('disponível') || lowerMessage.includes('disponivel') || lowerMessage.includes('tem')) {
      return t('chatbot.stockResponse')
    }

    // Respostas em português - Novidades
    if (lowerMessage.includes('novidade') || lowerMessage.includes('novo') || lowerMessage.includes('lançamento') || lowerMessage.includes('lancamento') || lowerMessage.includes('recente')) {
      return t('chatbot.newArrivalsResponse')
    }

    // Respostas em português - Serviços
    if (lowerMessage.includes('serviço') || lowerMessage.includes('servico') || lowerMessage.includes('reparo') || lowerMessage.includes('manutenção') || lowerMessage.includes('manutencao')) {
      return t('chatbot.servicesResponse')
    }

    // Respostas em português - Conta
    if (lowerMessage.includes('conta') || lowerMessage.includes('login') || lowerMessage.includes('cadastro') || lowerMessage.includes('registro') || lowerMessage.includes('perfil')) {
      return t('chatbot.accountResponse')
    }

    // Respostas em português - Frete específico
    if (lowerMessage.includes('entrega') || lowerMessage.includes('frete') || lowerMessage.includes('envio')) {
      return t('chatbot.deliveryResponse')
    }

    // Respostas em português - Preço
    if (lowerMessage.includes('preço') || lowerMessage.includes('preco') || lowerMessage.includes('valor') || lowerMessage.includes('custo')) {
      return t('chatbot.priceResponse')
    }

    // Respostas em português - Pagamento
    if (lowerMessage.includes('pagamento') || lowerMessage.includes('pagar')) {
      return t('chatbot.paymentResponse')
    }

    // Respostas em português - Devolução
    if (lowerMessage.includes('devolução') || lowerMessage.includes('devolucao') || lowerMessage.includes('troca')) {
      return t('chatbot.returnResponse')
    }

    // Respostas em português - Garantia
    if (lowerMessage.includes('garantia')) {
      return t('chatbot.warrantyResponse')
    }

    // Respostas em português - Contato
    if (lowerMessage.includes('contato') || lowerMessage.includes('email')) {
      return t('chatbot.contactResponse')
    }

    // Respostas em português - Categoria
    if (lowerMessage.includes('categoria') || lowerMessage.includes('categorias')) {
      return t('chatbot.categoryResponse')
    }

    // Respostas em português - Oferta
    if (lowerMessage.includes('oferta') || lowerMessage.includes('promoção') || lowerMessage.includes('promocao')) {
      return t('chatbot.offerResponse')
    }

    // Respostas em português - Ajuda
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
      return t('chatbot.helpResponse')
    }

    // Respostas em inglês - Specific products
    if (lowerMessage.includes('smartphone') || lowerMessage.includes('phone') || lowerMessage.includes('mobile') || lowerMessage.includes('iphone') || lowerMessage.includes('samsung') || lowerMessage.includes('xiaomi')) {
      return t('chatbot.smartphoneResponse')
    }
    if (lowerMessage.includes('laptop') || lowerMessage.includes('notebook') || lowerMessage.includes('computer') || lowerMessage.includes('pc') || lowerMessage.includes('hp') || lowerMessage.includes('dell') || lowerMessage.includes('lenovo')) {
      return t('chatbot.laptopResponse')
    }
    if (lowerMessage.includes('camera') || lowerMessage.includes('photo') || lowerMessage.includes('canon') || lowerMessage.includes('sony') || lowerMessage.includes('gopro')) {
      return t('chatbot.cameraResponse')
    }
    if (lowerMessage.includes('tv') || lowerMessage.includes('television') || lowerMessage.includes('monitor') || lowerMessage.includes('samsung tv') || lowerMessage.includes('lg')) {
      return t('chatbot.tvResponse')
    }
    if (lowerMessage.includes('printer') || lowerMessage.includes('print') || lowerMessage.includes('scanner') || lowerMessage.includes('epson') || lowerMessage.includes('hp print')) {
      return t('chatbot.printerResponse')
    }
    if (lowerMessage.includes('gaming') || lowerMessage.includes('game') || lowerMessage.includes('playstation') || lowerMessage.includes('xbox') || lowerMessage.includes('nintendo')) {
      return t('chatbot.gamingResponse')
    }
    if (lowerMessage.includes('network') || lowerMessage.includes('router') || lowerMessage.includes('wifi') || lowerMessage.includes('tp-link') || lowerMessage.includes('cisco') || lowerMessage.includes('mikrotik')) {
      return t('chatbot.networkResponse')
    }
    if (lowerMessage.includes('accessory') || lowerMessage.includes('headphone') || lowerMessage.includes('cable') || lowerMessage.includes('charger')) {
      return t('chatbot.accessoriesResponse')
    }
    if (lowerMessage.includes('audio') || lowerMessage.includes('sound') || lowerMessage.includes('speaker') || lowerMessage.includes('jbl') || lowerMessage.includes('sony audio')) {
      return t('chatbot.audioResponse')
    }

    // Respostas em inglês - General product questions
    if (lowerMessage.includes('which product') || lowerMessage.includes('recommend') || lowerMessage.includes('best') || lowerMessage.includes('suggestion')) {
      return t('chatbot.recommendationResponse')
    }
    if (lowerMessage.includes('product') || lowerMessage.includes('item') || lowerMessage.includes('buy')) {
      return t('chatbot.productGeneralResponse')
    }

    // Respostas em inglês - Hours
    if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('close') || lowerMessage.includes('time')) {
      return t('chatbot.hoursResponse')
    }

    // Respostas em inglês - Location
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('maputo')) {
      return t('chatbot.locationResponse')
    }

    // Respostas em inglês - Brands
    if (lowerMessage.includes('brand') || lowerMessage.includes('manufacturer') || lowerMessage.includes('brands')) {
      return t('chatbot.brandsResponse')
    }

    // Respostas em inglês - Tracking
    if (lowerMessage.includes('track') || lowerMessage.includes('tracking') || lowerMessage.includes('follow') || lowerMessage.includes('order status')) {
      return t('chatbot.trackingResponse')
    }

    // Respostas em inglês - Coupons
    if (lowerMessage.includes('coupon') || lowerMessage.includes('discount') || lowerMessage.includes('promo') || lowerMessage.includes('code') || lowerMessage.includes('promotion')) {
      return t('chatbot.couponResponse')
    }

    // Respostas em inglês - Business
    if (lowerMessage.includes('business') || lowerMessage.includes('corporate') || lowerMessage.includes('b2b') || lowerMessage.includes('wholesale')) {
      return t('chatbot.businessResponse')
    }

    // Respostas em inglês - Support
    if (lowerMessage.includes('support') || lowerMessage.includes('technical') || lowerMessage.includes('help') || lowerMessage.includes('setup') || lowerMessage.includes('configuration')) {
      return t('chatbot.supportResponse')
    }

    // Respostas em inglês - Phone order
    if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('whatsapp')) {
      return t('chatbot.phoneOrderResponse')
    }

    // Respostas em inglês - Installment
    if (lowerMessage.includes('installment') || lowerMessage.includes('credit') || lowerMessage.includes('payment plan')) {
      return t('chatbot.installmentResponse')
    }

    // Respostas em inglês - Stock
    if (lowerMessage.includes('stock') || lowerMessage.includes('available') || lowerMessage.includes('in stock')) {
      return t('chatbot.stockResponse')
    }

    // Respostas em inglês - New arrivals
    if (lowerMessage.includes('new') || lowerMessage.includes('arrival') || lowerMessage.includes('latest') || lowerMessage.includes('recent')) {
      return t('chatbot.newArrivalsResponse')
    }

    // Respostas em inglês - Services
    if (lowerMessage.includes('service') || lowerMessage.includes('repair') || lowerMessage.includes('maintenance')) {
      return t('chatbot.servicesResponse')
    }

    // Respostas em inglês - Account
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('register') || lowerMessage.includes('profile')) {
      return t('chatbot.accountResponse')
    }

    // Respostas em inglês - Delivery
    if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
      return t('chatbot.deliveryResponse')
    }

    // Respostas em inglês - Price
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return t('chatbot.priceResponse')
    }

    // Respostas em inglês - Payment
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return t('chatbot.paymentResponse')
    }

    // Respostas em inglês - Return
    if (lowerMessage.includes('return') || lowerMessage.includes('exchange')) {
      return t('chatbot.returnResponse')
    }

    // Respostas em inglês - Warranty
    if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
      return t('chatbot.warrantyResponse')
    }

    // Respostas em inglês - Contact
    if (lowerMessage.includes('contact')) {
      return t('chatbot.contactResponse')
    }

    // Respostas em inglês - Category
    if (lowerMessage.includes('category') || lowerMessage.includes('categories')) {
      return t('chatbot.categoryResponse')
    }

    // Respostas em inglês - Offer
    if (lowerMessage.includes('offer') || lowerMessage.includes('discount') || lowerMessage.includes('promotion')) {
      return t('chatbot.offerResponse')
    }

    // Respostas em inglês - Help
    if (lowerMessage.includes('help')) {
      return t('chatbot.helpResponse')
    }

    return t('chatbot.defaultResponse')
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputValue('')
    setShowQuickQuestions(false)
    setIsTyping(true)

    // Simular tempo de resposta do bot
    setTimeout(() => {
      const botResponseText = getBotResponse(inputValue)
      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setLastBotQuestion(botResponseText)
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-stech-blue to-stech-red text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 ${
              isMinimized ? 'w-80 h-14' : 'w-96 h-[550px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stech-blue to-stech-red text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t('chatbot.title')}</h3>
                  <p className="text-xs opacity-90">Online • Resposta imediata</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-1.5 rounded-full transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Mensagens */}
                <div className="h-[380px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        {message.sender === 'bot' && (
                          <div className="bg-stech-blue text-white p-1.5 rounded-full mb-1">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-stech-blue to-stech-red text-white rounded-br-md'
                              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'user' ? 'opacity-70' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.sender === 'user' && (
                          <div className="bg-gray-300 text-gray-600 p-1.5 rounded-full mb-1">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-end gap-2">
                        <div className="bg-stech-blue text-white p-1.5 rounded-full mb-1">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-stech-blue rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-stech-blue rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-stech-blue rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Perguntas rápidas */}
                {showQuickQuestions && messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 pb-2"
                  >
                    <p className="text-xs text-gray-500 mb-2 font-medium">{t('chatbot.quickQuestionsTitle')}</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => handleQuickQuestion(q)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-stech-blue hover:text-white text-gray-700 text-xs rounded-full transition-all duration-300 border border-gray-200 hover:border-stech-blue"
                        >
                          {q.text}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t('chatbot.placeholder')}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-stech-blue focus:border-transparent text-sm transition-all"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-gradient-to-r from-stech-blue to-stech-red text-white p-2.5 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
