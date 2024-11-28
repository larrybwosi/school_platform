'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Details = [
  {
    title: "Our Vision",
    description: "At Horizon Academy, we believe education is more than academic achievement. We are committed to creating an environment where curiosity thrives, potential is limitless, and every child is empowered to shape their unique future.",
    image: "/images/vision.jpg",
    alignment: "left"
  },
  {
    title: "Innovative Learning",
    description: "Our cutting-edge curriculum integrates technology, critical thinking, and hands-on experiences. We don't just teach subjects; we inspire passion, creativity, and a lifelong love for learning that extends far beyond traditional classroom boundaries.",
    image: "/images/innovative-learning.jpg",
    alignment: "right"
  },
  {
    title: "Supportive Community",
    description: "We're more than a school—we're a family. Our dedicated educators, comprehensive support systems, and collaborative environment ensure that each student receives personalized attention, guidance, and the resources they need to excel.",
    image: "/images/supportive-community.jpg",
    alignment: "left"
  }
]

export default function AboutSections() {
  return (
    <section className="py-16">
      {Details.map((section, index) => {
        const isLeft = section.alignment === 'left'
        return (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`
              flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
              items-center my-16 gap-12 container mx-auto px-6
            `}
          >
            <div className="w-full md:w-1/2">
              <Image 
                src={section.image} 
                alt={section.title} 
                width={600}
                height={400}
                className="rounded-2xl shadow-xl object-cover w-full h-96"
              />
            </div>
            <div className={`w-full md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                {section.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {section.description}
              </p>
              <Button
                size="lg"
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Learn More <ArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )
      })}
    </section>
  )
}

