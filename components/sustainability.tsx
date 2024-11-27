"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Droplets, Package } from "lucide-react";

const initiatives = [
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    value: "100%",
    description: "Natural ingredients from ethical suppliers",
  },
  {
    icon: Recycle,
    title: "Recycled Packaging",
    value: "95%",
    description: "Eco-friendly packaging materials",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    value: "50K",
    description: "Gallons saved annually",
  },
  {
    icon: Package,
    title: "Zero Waste",
    value: "99%",
    description: "Production waste reduction",
  },
];

export function Sustainability() {
  return (
    <section className="py-24 bg-sage/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-playfair mb-4">Our Commitment to Earth</h2>
          <p className="text-lg font-nunito text-foreground/80 max-w-2xl mx-auto">
            Every bar of soap is a step towards a more sustainable future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-background rounded-lg p-6 shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/10 mb-4">
                <initiative.icon className="h-8 w-8 text-sage" />
              </div>
              <h3 className="text-2xl font-playfair mb-2">{initiative.value}</h3>
              <h4 className="text-lg font-playfair mb-2">{initiative.title}</h4>
              <p className="text-foreground/70">{initiative.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}