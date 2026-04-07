export interface Service {
  icon: string
  title: string
  description: string
  href: string
}

export interface Product {
  slug: string
  tag: string
  name: string
  description: string
}

export interface Client {
  initials: string
  name: string
  color: string
  textColor?: string
}

export interface Stat {
  number: number
  suffix: string
  label: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface TickerItem {
  text: string
  color: 'blue' | 'green' | 'red'
}
