'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CtaBand } from '@/components/home/CtaBand'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

type Section = { heading?: string; body: string }

type Post = {
  slug:     string
  category: string
  date:     string
  title:    string
  intro:    string
  sections: Section[]
}

const POSTS: Post[] = [
  {
    slug:     'why-dashcams-are-essential',
    category: 'Fleet Safety',
    date:     'June 26, 2025',
    title:    'Why Dashcams Are Essential for Modern Fleet Management',
    intro:    'Managing a fleet comes with many moving parts — literally. Between monitoring driver behaviour, handling insurance claims, and maintaining road safety standards, fleet operators need tools that go beyond paperwork and guesswork. Dashcams have evolved from simple recording devices into strategic, AI-powered systems that transform how fleets operate.',
    sections: [
      {
        heading: 'What Does a Dashcam Actually Do?',
        body:    'Dashcams record footage inside and outside the vehicle. While older models were primarily used as post-incident documentation tools, today\'s AI-enabled cameras operate proactively. They identify risky situations in real time, allowing fleet managers to intervene before dangerous scenarios escalate — a shift from reactive to preventative fleet safety.',
      },
      {
        heading: 'Real-Time Visibility',
        body:    'Fleet managers can monitor live driving conditions and driver behaviour from a central platform. This awareness allows for immediate intervention when distraction, fatigue, or phone use is detected — before it becomes an incident.',
      },
      {
        heading: 'Safer Driving Habits',
        body:    'Drivers who know recordings are active tend to drive more responsibly. Coupled with in-cab alerts and performance scoring, modern dashcam systems actively reinforce safe behaviours rather than simply documenting violations after the fact.',
      },
      {
        heading: 'Quick Resolution of Incidents',
        body:    'Video evidence resolves accident disputes objectively and quickly, protecting both the business and its drivers. This reduces unnecessary claims costs, lowers insurance premiums over time, and strengthens trust with clients and regulators.',
      },
      {
        heading: 'Smarter Coaching and Training',
        body:    'Real footage from actual fleet operations provides far more impactful training material than generic instruction. Supervisors can review specific incidents, coach individual drivers on their own behaviour, and track improvement over time.',
      },
      {
        heading: 'Why Choose the MiX AI Camera?',
        body:    'The MiX Vision AI Camera combines HD dual-facing video with artificial intelligence to detect risky behaviours including phone use, drowsiness, and harsh braking. Real-time alerts, driver monitoring, and instant clip access give fleet managers everything they need to move from reactive safety management to proactive fleet protection.',
      },
    ],
  },
  {
    slug:     'smart-fleet-telematics-features',
    category: 'Technology',
    date:     'April 22, 2026',
    title:    'Smart Fleet Management: Top Telematics Features You Shouldn\'t Ignore',
    intro:    'Fleet telematics is no longer a luxury — it\'s a necessity. As competition intensifies and operational costs rise, the ability to make real-time, data-driven decisions separates efficient fleets from struggling ones. Here are the telematics capabilities that matter most.',
    sections: [
      {
        heading: 'Real-Time GPS Tracking',
        body:    'Know where every vehicle is at any moment. Real-time tracking improves dispatch efficiency, enables smarter routing, and enhances security across your entire fleet.',
      },
      {
        heading: 'Fuel Monitoring & Management',
        body:    'Fuel is typically the largest operating cost for any fleet. Telematics systems identify consumption patterns, flag inefficient driving behaviours, and actively help prevent fuel theft.',
      },
      {
        heading: 'Driver Behaviour Monitoring',
        body:    'Analyse risky habits including harsh braking, rapid acceleration, excessive idling, and speeding. Scoring systems give managers clear visibility and give drivers the feedback they need to improve.',
      },
      {
        heading: 'Route Optimisation',
        body:    'Reduce fuel costs and vehicle wear by ensuring drivers take the most efficient routes. Dynamic rerouting adapts to traffic in real time, keeping your fleet moving.',
      },
      {
        heading: 'Geofencing & Alerts',
        body:    'Set virtual boundaries around depots, job sites, or restricted areas. Receive instant notifications when a vehicle enters or exits a designated zone — critical for security and compliance.',
      },
      {
        heading: 'Predictive Maintenance Alerts',
        body:    'Engine diagnostics and health monitoring identify problems before they become breakdowns. Predictive maintenance extends vehicle lifespan, prevents costly downtime, and keeps your fleet roadworthy.',
      },
      {
        heading: 'AI-Powered Dash Cameras',
        body:    'Monitor driver attentiveness and fatigue in real time. AI cameras detect distraction, drowsiness, and mobile phone use, triggering in-cab alerts the moment risk is detected.',
      },
      {
        heading: 'Incident & Crash Detection',
        body:    'Automatic crash detection triggers emergency responses and captures video evidence instantly. Speed the claims process and protect your business with objective, timestamped footage.',
      },
      {
        heading: 'Customisable Reporting & Analytics',
        body:    'Transform raw fleet data into actionable insights. Custom dashboards and scheduled reports give management the visibility needed to make strategic decisions with confidence.',
      },
    ],
  },
  {
    slug:     'why-asset-protection-matters',
    category: 'Operations',
    date:     'April 22, 2026',
    title:    'Why Asset Protection Is Essential for Operational Efficiency',
    intro:    'Asset protection extends far beyond preventing theft. For fleet operators, securing physical resources — vehicles, machinery, and equipment — is the foundation of operational continuity. Neglecting this responsibility exposes organisations to downtime, unexpected costs, and cascading workflow disruptions.',
    sections: [
      {
        heading: 'The Hidden Costs of Ignoring Asset Protection',
        body:    'An unattended or inadequately monitored asset creates multiple risks simultaneously. A single equipment failure can halt an entire operation. Deferred maintenance compounds costs rapidly. And the downstream impact on scheduling, client commitments, and cash flow can be severe and long-lasting.',
      },
      {
        heading: 'How Asset Protection Drives Better Business Outcomes',
        body:    'Well-maintained, well-monitored assets function longer and more reliably. Strategic oversight minimises production interruptions, reduces emergency repair expenditure, and gives managers clear visibility into resource availability across the organisation.',
      },
      {
        heading: 'Practical Strategies for Safeguarding Your Assets',
        body:    'Effective protection combines technology with methodology. Scheduled maintenance programmes identify deterioration before costly failures occur. Physical security enhancements — locks, alarms, access controls — add layers of protection. And real-time monitoring tracks asset location and condition around the clock.',
      },
      {
        heading: 'The Power of Technology in Asset Protection',
        body:    'AI-powered camera systems monitor operator conduct and alert supervisors to risky behaviour in real time. Predictive analytics forecast equipment failures before they happen. Virtual geofences trigger instant notifications when assets move outside designated zones — giving fleet managers control they previously didn\'t have.',
      },
      {
        heading: 'How Best Practices Limited Helps You Protect Your Assets',
        body:    'BPL integrates advanced monitoring technology with customised fleet strategies to reduce threats, prevent expensive interruptions, and extend asset longevity. Whether you operate a vehicle fleet, heavy equipment, or mixed assets, our solutions are built around your specific operational needs.',
      },
    ],
  },
  {
    slug:     'hours-of-service-fleet-compliance',
    category: 'Compliance',
    date:     'April 22, 2026',
    title:    'Understanding Hours of Service: Why It\'s Essential for a Safe and Efficient Fleet',
    intro:    'Hours of Service (HOS) regulations exist for a simple reason: fatigue kills. By limiting how long drivers can operate a vehicle before mandatory rest, HOS rules reduce the risk of fatigue-related incidents on roads. For fleet operators, understanding and enforcing compliance is both a legal obligation and a competitive advantage.',
    sections: [
      {
        heading: 'Maximum Driving Hours',
        body:    'HOS regulations set hard caps on how many hours a driver can operate a vehicle in a given period. These limits prevent the kind of cumulative fatigue that impairs judgment and reaction time — keeping drivers alert and roads safer for everyone.',
      },
      {
        heading: 'Mandatory Rest Breaks',
        body:    'Scheduled breaks are not optional — they are a legal necessity. Regular rest periods give drivers the recovery time needed to stay sharp, safe, and compliant throughout the working day and across multi-day operations.',
      },
      {
        heading: 'Weekly On-Duty Limits',
        body:    'Beyond daily driving limits, weekly caps protect workers from cumulative exhaustion. These limits maintain productivity over the long term without compromising driver welfare or road safety.',
      },
      {
        heading: 'Why HOS Compliance Should Be a Priority',
        body:    'Non-compliance carries significant financial and legal consequences — fines, operational shutdowns, and reputational damage. Beyond regulatory risk, rested drivers are more productive, have fewer accidents, and are less likely to leave the organisation. HOS compliance protects your people and your business simultaneously.',
      },
      {
        heading: 'How Technology Simplifies HOS Compliance',
        body:    'Modern telematics systems automate HOS tracking entirely. Electronic Logging Devices (ELDs) create tamper-proof, audit-ready records. Real-time alerts notify fleet managers when drivers are approaching their hour limits, and automated reports replace manual logbooks — eliminating errors and saving administrative time.',
      },
    ],
  },
  {
    slug:     'green-fleet-co2-emissions',
    category: 'Sustainability',
    date:     'April 8, 2025',
    title:    'Driving Towards a Greener Future: How Smart Fleet Management Slashes CO₂ Emissions',
    intro:    'Transportation is one of the largest contributors to carbon emissions globally. For fleet operators, this creates both a responsibility and an opportunity. With the right technology and strategies, fleet management can shift from an environmental burden into a genuine sustainability advantage.',
    sections: [
      {
        heading: 'The Environmental Cost of Inefficient Fleet Operations',
        body:    'Fuel-wasting driving behaviours, poor route planning, aging vehicles, and overloaded assets all contribute to unnecessary emissions. Many fleets are producing significantly more CO₂ than they need to — not because of scale, but because of a lack of visibility into what\'s actually happening on the road.',
      },
      {
        heading: 'How Smart Fleet Management Makes a Difference',
        body:    'Real-time fuel monitoring pinpoints where consumption is highest and why. Telematics-driven route optimisation eliminates unnecessary mileage. Driver behaviour analysis identifies and corrects habits — harsh braking, rapid acceleration, excessive idling — that burn fuel and increase emissions without adding productivity.',
      },
      {
        heading: 'Preventive Maintenance and Vehicle Health',
        body:    'A poorly maintained vehicle burns more fuel and emits more pollutants. Predictive maintenance programmes keep engines running efficiently, extend vehicle lifespan, and reduce the frequency of high-emission breakdowns and emergency repairs.',
      },
      {
        heading: 'Why Going Green Pays Off for Business',
        body:    'Sustainability is not a trade-off against profitability — it is aligned with it. Fuel cost reductions flow directly to the bottom line. Regulatory compliance protects against future carbon-related penalties. And a demonstrable environmental commitment strengthens brand reputation with clients, partners, and regulators who are increasingly making it a requirement.',
      },
      {
        heading: 'The Road Ahead',
        body:    'The future of fleet management is greener, smarter, and more connected. Electrification, AI-driven optimisation, and carbon tracking tools are no longer distant possibilities — they are available today. The fleets that adopt them now will be the ones best positioned for the decade ahead.',
      },
    ],
  },
  {
    slug:     'bpl-leading-digital-fleet-nigeria',
    category: 'Company',
    date:     'October 29, 2024',
    title:    'Best Practices Limited: Leading the Way in Digital Fleet Solutions in Nigeria',
    intro:    'Since 2001, Best Practices Limited has built Nigeria\'s most comprehensive fleet intelligence offering. From GPS tracking and speed limiting to driver training and full fleet consulting, BPL serves the country\'s most demanding enterprise fleets — guided by a commitment to safety, efficiency, and measurable results.',
    sections: [
      {
        heading: 'Tailored Fleet Management Solutions',
        body:    'BPL provides specialised fleet management services for logistics, oil & gas, FMCG, construction, and transport sectors. Clients receive real-time insights and enhanced control over their operations, alongside tangible benefits: streamlined logistics, reduced fuel expenditure, and strengthened safety records.',
      },
      {
        heading: 'Technology-Driven, People-Focused',
        body:    'As Nigeria\'s authorised partner for MiX by Powerfleet and Elson Truck Technology, BPL deploys market-leading hardware and software across enterprise fleets nationwide. But technology is only part of the picture. Driver training, manager development, and ongoing support are built into every engagement.',
      },
      {
        heading: 'A Commitment to Ethics and Client Satisfaction',
        body:    'BPL operates under the THIS principle — Truthfulness, Honesty, Integrity, and Service. These values shape every client relationship, every recommendation, and every deployment. The result is partnerships that endure: Shell Nigeria, TotalEnergies, Lafarge, DHL, and Baker Hughes have all trusted BPL with their most critical fleet operations.',
      },
      {
        heading: 'Our Vision for the Future',
        body:    'BPL aims to be Nigeria\'s leading provider of fleet intelligence and value-added safety solutions that deliver strong, measurable returns on investment for fleet owners and operators. With over two decades of experience and a team of dedicated specialists, the foundation is already in place.',
      },
    ],
  },
  {
    slug:     'digital-fleet-solution-transformation',
    category: 'Innovation',
    date:     'April 20, 2023',
    title:    'Digital Fleet Solution: The Tool for Fleet Business Transformation',
    intro:    'The shift from manual fleet oversight to fully digital operations is not simply an upgrade — it is a transformation. Data analytics, integrated platforms, and real-time connectivity are redefining what enterprise fleet management looks like across Africa and beyond.',
    sections: [
      {
        heading: 'Improved Cost Control',
        body:    'Digital fleet solutions enable businesses to reduce fuel consumption, cut maintenance costs, and minimise vehicle downtime. By optimising routes and tracking fuel usage in real time, operators can identify maintenance problems early — before they become expensive failures — and improve overall profitability.',
      },
      {
        heading: 'Improved Driver Safety',
        body:    'Digital systems monitor dangerous driving patterns and fatigue in real time, providing managers with the data needed for meaningful driver debriefing and retraining. The result is a measurable decrease in accidents, lower insurance costs, reduced legal exposure, and consistent compliance with speed and driving-hour regulations.',
      },
      {
        heading: 'Improved Customer Service',
        body:    'Route optimisation and live tracking allow businesses to improve delivery times and raise customer satisfaction. Real-time data across the full logistics chain keeps managers connected with drivers, vehicles, cargo, and clients — enabling proactive communication instead of reactive problem-solving.',
      },
      {
        heading: 'Reduced Environmental Impact',
        body:    'Digital fleet solutions support sustainability by monitoring fuel consumption per kilometre and CO₂ emissions per vehicle. Fleet managers can track environmental performance, promote eco-friendly driving behaviours, and build a measurable case for greener operations.',
      },
      {
        heading: 'Built for Every Fleet Size',
        body:    'Whether you operate ten vehicles or ten thousand, digital fleet solutions scale to your needs. The combination of enhanced efficiency, lower costs, and improved safety makes them one of the highest-returning investments available to fleet operators today.',
      },
    ],
  },
]

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = POSTS.find(p => p.slug === slug)
  if (!post) notFound()

  const others = POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <div style={{ background: '#040C18' }}>

      {/* ── Hero ── */}
      <section
        className="relative px-8 md:px-14 xl:px-20 pt-20 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #040C18 0%, #071526 60%, #040F1E 100%)' }}
      >
        <div className="absolute -top-24 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.12) 0%, transparent 70%)' }} />

        <div className="max-w-[780px] mx-auto relative">
          {/* Back link */}
          <motion.div {...fade(0.05)}>
            <Link
              href="/resources/blog"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none', marginBottom: 32,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div {...fade(0.1)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
              {post.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>{post.date}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fade(0.18)}
            className="font-display font-extrabold text-white leading-[1.1] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(28px, 4vw, 50px)', marginBottom: 24 }}
          >
            {post.title}
          </motion.h1>

          {/* Divider */}
          <motion.div {...fade(0.25)} style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

          {/* Intro */}
          <motion.p
            {...fade(0.3)}
            style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)' }}
          >
            {post.intro}
          </motion.p>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="px-8 md:px-14 xl:px-20 py-16" style={{ background: '#040C18' }}>
        <div className="max-w-[780px] mx-auto">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {post.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {section.heading && (
                  <h2
                    className="font-display font-bold text-white leading-[1.25] tracking-[-0.02em] mb-4"
                    style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
                  >
                    {section.heading}
                  </h2>
                )}
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)' }}>
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '56px 0 48px' }} />

          {/* Author tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, overflow: 'hidden',
              background: 'rgba(0,102,204,0.2)',
              border: '1px solid rgba(51,153,224,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3399E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-inter)' }}>
                Best Practices Limited
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
                Fleet Intelligence Team · {post.date}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More articles ── */}
      {others.length > 0 && (
        <section className="px-8 md:px-14 xl:px-20 pb-20" style={{ background: '#040C18' }}>
          <div className="max-w-[780px] mx-auto">
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 40 }} />
            <h3 className="font-display font-bold text-white text-[18px] tracking-tight mb-8">
              More from the BPL blog
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {others.map(p => (
                <Link
                  key={p.slug}
                  href={`/resources/blog/${p.slug}`}
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(51,153,224,0.25)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="rounded-xl p-5 h-full transition-colors duration-150"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)', display: 'block', marginBottom: 8 }}>
                      {p.category}
                    </span>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, fontFamily: 'var(--font-inter)' }}>
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </div>
  )
}
