"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getCategoryUrl, getSubcategoryUrl } from "@/lib/utils/urls";

export default function CategoryGrid({ categories }: { categories: any[] }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-96 overflow-hidden rounded-xl cursor-pointer"
            >
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className={`absolute inset-0 bg-neutral-${800 - i * 100} group-hover:scale-110 transition-transform duration-700`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary transition-all duration-300 rounded-xl" />
              
              {/* Normal state */}
              <div className="absolute bottom-8 left-8 right-8 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-3xl font-athletic italic text-white mb-2">{cat.name}</h3>
                <span className="flex items-center text-primary font-bold uppercase text-xs tracking-widest">
                  {cat._count?.products || 0} Products <ChevronRight className="h-4 w-4 ml-1" />
                </span>
              </div>

              {/* Hover overlay with subcategories */}
              <div className="absolute inset-0 bg-dark/90 flex flex-col justify-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-athletic italic text-white mb-1 flex items-center gap-2">
                  {cat.name} <ArrowRight className="h-5 w-5 text-primary" />
                </h3>
                <div className="w-12 h-0.5 bg-primary mb-4" />
                <ul className="space-y-2">
                  {cat.subcategories?.map((sub: any) => (
                    <li key={sub.id}>
                      <Link
                        href={getSubcategoryUrl(cat.slug, sub.slug)}
                        className="text-white/70 hover:text-primary text-sm transition-colors flex items-center gap-1 group/link"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full group-hover/link:scale-150 transition-transform" />
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={getCategoryUrl(cat.slug)}
                  className="mt-4 inline-flex items-center text-xs text-primary font-bold uppercase tracking-wider hover:underline"
                >
                  Explore All <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
