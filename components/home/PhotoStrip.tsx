import Image from 'next/image'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

const PHOTOS = [
  { src: '/images/gallery/gallery-10.jpeg', caption: 'Device installation' },
  { src: '/images/gallery/gallery-12.jpeg', caption: 'Tracker commissioning' },
  { src: '/images/gallery/gallery-13.jpeg', caption: 'Fleet diagnostics' },
  { src: '/images/gallery/gallery-14.jpeg', caption: 'On-site installation' },
  { src: '/images/gallery/gallery-15.jpeg', caption: 'Speed limiter fitting' },
  { src: '/images/gallery/gallery-05.jpg',  caption: 'Field team' },
]

export function PhotoStrip() {
  return (
    <section className="bg-bpl-off-white py-20 md:py-24">
      <div className="max-w-site mx-auto px-6 md:px-10">
        <RevealWrapper className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-mid-gray mb-2">
            Our team in action
          </p>
          <h2 className="font-display font-bold text-bpl-navy text-[26px] md:text-[30px] tracking-tight">
            Installation, training &amp; support — across Nigeria
          </h2>
        </RevealWrapper>

        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory -mx-6 md:-mx-10 px-6 md:px-10">
          {PHOTOS.map(photo => (
            <div
              key={photo.src}
              className="relative flex-shrink-0 w-[260px] md:w-[300px] h-[200px] rounded-2xl overflow-hidden snap-start group"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-4 text-[12px] font-medium text-white/80">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
