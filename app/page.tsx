import { HeroSection } from '@/components/home/HeroSection'
import { Ticker } from '@/components/home/Ticker'
import { StatsBand } from '@/components/home/StatsBand'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { AboutSplit } from '@/components/home/AboutSplit'
import { ProductsGrid } from '@/components/home/ProductsGrid'
import { ClientsCarousel } from '@/components/home/ClientsCarousel'
import { Testimonial } from '@/components/home/Testimonial'
import { PhotoStrip } from '@/components/home/PhotoStrip'
import { CtaBand } from '@/components/home/CtaBand'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <StatsBand />
      <ServicesGrid />
      <AboutSplit />
      <ProductsGrid />
      <ClientsCarousel />
      <Testimonial />
      <PhotoStrip />
      <CtaBand />
    </>
  )
}
