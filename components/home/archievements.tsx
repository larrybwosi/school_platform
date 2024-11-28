'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Users } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const achievements = [
  { 
    icon: <Trophy size={64} className="mx-auto text-yellow-500" />, 
    number: "150+", 
    label: "Academic Awards" 
  },
  { 
    icon: <Star size={64} className="mx-auto text-blue-500" />, 
    number: "95%", 
    label: "College Placement Rate" 
  },
  { 
    icon: <Users size={64} className="mx-auto text-green-500" />, 
    number: "30+", 
    label: "Nationalities Represented" 
  }
]

export default function AchievementHighlights() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="bg-gradient-to-br from-blue-100 to-white py-20"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Our Extraordinary Achievements
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {achievements.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.4, type: "spring" }}
            >
              <Card className="h-full bg-white hover:shadow-xl transition-all">
                <CardHeader>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <h3 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-4">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

