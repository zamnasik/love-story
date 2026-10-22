import { motion } from 'framer-motion';
import { Compass, Heart, Moon as MoonIcon, Users, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  heart: Heart,
  users: Users,
  compass: Compass,
  moon: MoonIcon,
};

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  index?: number;
}

export function MemoryCard({ title, subtitle, icon, index = 0 }: Props) {
  const Icon = ICONS[icon] ?? Heart;
  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-midnight/65 p-6 shadow-soft sm:backdrop-blur-sm"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay: (index % 2) * 0.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl transition-opacity group-hover:opacity-100" />
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold shadow-glow">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-serif text-2xl text-ivory">{title}</h3>
      <p className="mt-1 font-serif text-xl italic text-rose">{subtitle}</p>
    </motion.article>
  );
}
