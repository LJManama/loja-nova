import { useEffect, useState, useRef } from 'react'

export function useOnScroll(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false) // Start invisible
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show when in viewport
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return [ref, isVisible] as const
}
