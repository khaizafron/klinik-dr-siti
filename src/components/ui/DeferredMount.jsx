import React, { useEffect, useRef, useState } from 'react'

export default function DeferredMount({
  children,
  minHeight = 0,
  rootMargin = '400px 0px',
  className = '',
  style = {},
  ...rest
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) return

    const node = ref.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [isVisible, rootMargin])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        ...style,
      }}
      {...rest}
    >
      {isVisible ? children : null}
    </div>
  )
}
