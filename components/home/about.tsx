'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, GraduationCap, Lightbulb, Users } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Details = [
  {
    title: "Our Vision",
    description: "At Horizon Academy, we believe education is more than academic achievement. We are committed to creating an environment where curiosity thrives, potential is limitless, and every child is empowered to shape their unique future.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    alignment: "left",
    icon: GraduationCap,
    stats: {
      value: "98%",
      label: "Graduate Success Rate"
    }
  },
  {
    title: "Innovative Learning",
    description: "Our cutting-edge curriculum integrates technology, critical thinking, and hands-on experiences. We don't just teach subjects; we inspire passion, creativity, and a lifelong love for learning that extends far beyond traditional classroom boundaries.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071",
    alignment: "right",
    icon: Lightbulb,
    stats: {
      value: "40+",
      label: "Innovation Programs"
    }
  },
  {
    title: "Supportive Community",
    description: "We're more than a school—we're a family. Our dedicated educators, comprehensive support systems, and collaborative environment ensure that each student receives personalized attention, guidance, and the resources they need to excel.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070",
    alignment: "left",
    icon: Users,
    stats: {
      value: "15:1",
      label: "Student-Teacher Ratio"
    }
  }
]

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function AboutSections() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Empowering Future Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we&apos;re redefining education through innovation, community, and excellence.
          </p>
        </motion.div>

        {Details.map((section, index) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.2
          })
          const isLeft = section.alignment === 'left'
          const Icon = section.icon

          return (
            <motion.div 
              key={section.title}
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
              }}
              className={`
                flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
                items-center my-32 gap-16 relative
              `}
            >
              <motion.div 
                variants={fadeInUpVariants}
                className="w-full md:w-1/2 relative group"
              >
                <div className="relative">
                  <Image 
                    src={section.image} 
                    alt={section.title} 
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-2xl object-cover w-full h-[500px] transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <motion.div
                  variants={fadeInUpVariants}
                  className="absolute -bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{section.stats.value}</div>
                  <div className="text-sm text-gray-600">{section.stats.label}</div>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={fadeInUpVariants}
                className={`w-full md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {section.description}
                </p>
                <Button
                  size="lg"
                  className="group flex items-center bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all"
                >
                  Learn More 
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
