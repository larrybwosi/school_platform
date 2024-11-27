"use client";

import { motion } from "framer-motion";
import { Beaker, Leaf, Heart, Package } from "lucide-react";

const steps = [
  {
    icon: Leaf,
    title: "Ingredient Selection",
    description: "We carefully source the finest natural ingredients from sustainable suppliers.",
  },
  {
    icon: Beaker,
    title: "Formulation",
    description: "Our master artisans blend ingredients using traditional techniques.",
  },
  {
    icon: Heart,
    title: "Curing",
    description: "Each soap is aged for 4-6 weeks to achieve perfect hardness and longevity.",
  },
  {
    icon: Package,
    title: "Packaging",
    description: "Wrapped in eco-friendly materials with care and attention to detail.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-sage/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-playfair mb-4">Our Artisanal Process</h2>
          <p className="text-lg font-nunito text-foreground/80 max-w-2xl mx-auto">
            From nature to your home, discover how we craft each bar with precision and care
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-background rounded-lg p-6 shadow-lg h-full">
                <div className="mb-4">
                  <step.icon className="h-12 w-12 text-sage" />
                </div>
                <h3 className="text-xl font-playfair mb-2">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-sage/30"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}