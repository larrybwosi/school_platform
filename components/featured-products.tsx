"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Lavender Dreams",
    description: "Calming lavender with hints of chamomile",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800&q=80",
    ingredients: ["Lavender Essential Oil", "Chamomile Extract", "Shea Butter"],
  },
  {
    id: 2,
    name: "Ocean Breeze",
    description: "Fresh marine scent with sea minerals",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1600857061011-d7c3149c8589?w=800&q=80",
    ingredients: ["Sea Minerals", "Algae Extract", "Coconut Oil"],
  },
  {
    id: 3,
    name: "Rose Garden",
    description: "Luxurious rose with moisturizing oils",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1600857062086-c87b6d394e94?w=800&q=80",
    ingredients: ["Rose Essential Oil", "Jojoba Oil", "Vitamin E"],
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-cream/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-playfair mb-4">Bestselling Soaps</h2>
          <p className="text-lg font-nunito text-foreground/80 max-w-2xl mx-auto">
            Discover our most loved creations, each handcrafted with care and premium ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="product-card bg-background rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair mb-2">{product.name}</h3>
                <p className="text-foreground/70 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">${product.price}</span>
                  <Button variant="outline" size="sm">
                    Add to Cart
                  </Button>
                </div>
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <p className="text-sm text-foreground/60">Key Ingredients:</p>
                  <ul className="text-sm text-foreground/80 mt-2">
                    {product.ingredients.map((ingredient) => (
                      <li key={ingredient} className="inline-block mr-2">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}