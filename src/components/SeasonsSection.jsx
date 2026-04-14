"use client";

import { motion } from "framer-motion";
import season1 from "@/assets/season1.jpg";
import season2 from "@/assets/season2.jpg";
import season3 from "@/assets/season3.jpg";
import season4 from "@/assets/season4.jpg";

const seasons = [
  {
    title: "Season 1",
    subtitle: "Tanjiro Kamado, Unwavering Resolve Arc",
    episodes: 26,
    year: 2019,
    image: season1,
  },
  {
    title: "Mugen Train",
    subtitle: "Mugen Train Arc",
    episodes: 7,
    year: 2021,
    image: season2,
  },
  {
    title: "Season 2",
    subtitle: "Entertainment District Arc",
    episodes: 11,
    year: 2022,
    image: season3,
  },
  {
    title: "Season 3",
    subtitle: "Swordsmith Village Arc",
    episodes: 11,
    year: 2023,
    image: season4,
  },
];

const SeasonsSection = () => {
  return (
    <section id="seasons" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            SEASONS & <span className="text-gradient-accent">ARCS</span>
          </h2>
          <p className="text-muted-foreground max-w-md">
            Follow Tanjiro's journey through each breathtaking season.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((season, i) => (
            <motion.div
              key={season.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group rounded-xl overflow-hidden card-gradient border border-border/50 cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={season.image.src}
                  alt={season.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={1024}
                  height={576}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-5">
                <span className="text-xs text-accent font-semibold tracking-wider">
                  {season.year} • {season.episodes} EPISODES
                </span>
                <h3 className="text-lg font-display font-bold text-foreground mt-1">
                  {season.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {season.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonsSection;
