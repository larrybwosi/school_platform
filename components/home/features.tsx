'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Globe, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const keyFeatures = [
  {
    icon: <GraduationCap size={48} className="text-blue-600" />,
    title: "Academic Mastery",
    description: "Pioneering transformative learning strategies that unlock each student's extraordinary potential through personalized educational experiences.",
    color: "blue"
  },
  {
    icon: <Globe size={48} className="text-green-600" />,
    title: "Global Citizenship",
    description: "Cultivating world-ready leaders with comprehensive international programs that develop cross-cultural understanding and global perspectives.",
    color: "green"
  },
  {
    icon: <BookOpen size={48} className="text-purple-600" />,
    title: "Holistic Growth",
    description: "Nurturing intellectual, emotional, and personal development through integrated learning approaches that prepare students for lifelong success.",
    color: "purple"
  }
]

export default function KeyFeatures() {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {keyFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
            onHoverStart={() => setActiveSection(index)}
            onHoverEnd={() => setActiveSection(null)}
          >
            <Card className={`h-full transition-all duration-500 ${
              activeSection === index 
                ? `bg-${feature.color}-100 scale-105 border-2 border-${feature.color}-300` 
                : 'bg-white hover:bg-gray-50'
            }`}>
              <CardHeader>
                <div className="mb-6">{feature.icon}</div>
                <CardTitle className="text-2xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
