"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ingredients = [
  {
    name: "Lavender Essential Oil",
    benefit: "Calming and soothing properties",
    image: "https://images.unsplash.com/photo-1611073615830-9f76883241ab?w=800&q=80",
  },
  {
    name: "Shea Butter",
    benefit: "Deep moisturizing and nourishing",
    image: "https://images.unsplash.com/photo-1599848880236-f1e590e5ed01?w=800&q=80",
  },
  {
    name: "Rose Essential Oil",
    benefit: "Anti-aging and skin rejuvenation",
    image: "https://images.unsplash.com/photo-1518982380512-5a3c6f0b7b7f?w=800&q=80",
  },
  {
    name: "Coconut Oil",
    benefit: "Natural cleansing and hydration",
    image: "https://images.unsplash.com/photo-1550406822-7d6d2193e805?w=800&q=80",
  },
  {
    name: "Aloe Vera",
    benefit: "Soothing and healing properties",
    image: "https://images.unsplash.com/photo-1596046891824-43a5e95f7f01?w=800&q=80",
  },
  {
    name: "Green Tea Extract",
    benefit: "Antioxidant protection",
    image: "https://images.unsplash.com/photo-1582793988951-9aed5555d7c3?w=800&q=80",
  },
];

export function IngredientsStory() {
  return (
    <section className="py-24 bg-ocean/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-playfair mb-4">From Garden to Bath</h2>
          <p className="text-lg font-nunito text-foreground/80 max-w-2xl mx-auto">
            Our premium ingredients are carefully selected for their purity and effectiveness
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={ingredient.image}
                alt={ingredient.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-playfair mb-2">{ingredient.name}</h3>
                <p className="text-sm font-nunito opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {ingredient.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}