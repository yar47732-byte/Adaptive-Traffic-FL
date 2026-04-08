import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
  className?: string;
}

const StatCard = ({ title, value, subtitle, icon, trend, trendValue, className = "" }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -3 }}
    transition={{ duration: 0.3 }}
    className={`glass-card p-5 group hover:border-primary/25 transition-all duration-500 ${className}`}
  >
    <div className="flex items-start justify-between mb-3">
      <span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-widest">{title}</span>
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-500">
        {icon}
      </div>
    </div>
    <div className="font-display text-2xl font-bold text-foreground tracking-tight">{value}</div>
    {(subtitle || trendValue) && (
      <div className="flex items-center gap-2 mt-1.5">
        {trendValue && (
          <span className={`text-xs font-semibold ${trend === "up" ? "text-electric-emerald" : "text-destructive"}`}>
            {trend === "up" ? "↑" : "↓"} {trendValue}
          </span>
        )}
        {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
      </div>
    )}
  </motion.div>
);

export default StatCard;
