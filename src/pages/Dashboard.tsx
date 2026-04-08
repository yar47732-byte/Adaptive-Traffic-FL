import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Activity, Wifi, Clock, Cpu, TrendingDown, Zap } from "lucide-react";
import StatCard from "@/components/StatCard";
import Footer from "@/components/Footer";

const trainingData = Array.from({ length: 20 }, (_, i) => ({
  round: i + 1,
  accuracy: Math.min(95, 45 + i * 3.2 - Math.random() * 5),
  loss: Math.max(0.05, 1.2 - i * 0.058 + Math.random() * 0.05),
  commCost: Math.max(8, 85 - i * 4 + Math.random() * 8),
  bandwidth: Math.max(12, 70 - i * 3.2 + Math.random() * 6),
}));

const vehicleDistribution = [
  { name: "Selected", value: 15, color: "hsl(210, 100%, 60%)" },
  { name: "Idle", value: 485, color: "hsl(230, 18%, 22%)" },
];

const edgeServerData = [
  { name: "Edge 1", vehicles: 4, updates: 12, latency: 23 },
  { name: "Edge 2", vehicles: 3, updates: 9, latency: 18 },
  { name: "Edge 3", vehicles: 5, updates: 15, latency: 31 },
  { name: "Edge 4", vehicles: 3, updates: 11, latency: 22 },
];

const trafficPatterns = [
  { time: "06:00", normal: 120, anomaly: 2 },
  { time: "08:00", normal: 380, anomaly: 8 },
  { time: "10:00", normal: 260, anomaly: 5 },
  { time: "12:00", normal: 310, anomaly: 6 },
  { time: "14:00", normal: 290, anomaly: 4 },
  { time: "16:00", normal: 350, anomaly: 12 },
  { time: "18:00", normal: 420, anomaly: 15 },
  { time: "20:00", normal: 250, anomaly: 7 },
  { time: "22:00", normal: 140, anomaly: 3 },
];

const tooltipStyle = {
  contentStyle: {
    background: "hsl(230, 22%, 11%)",
    border: "1px solid hsl(230, 18%, 20%)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "hsl(210, 40%, 96%)",
    boxShadow: "0 10px 40px hsl(230, 25%, 5% / 0.5)",
  },
};

const cardAnim = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
});

const Dashboard = () => {
  const [activeRound] = useState(20);
  const currentMetrics = useMemo(() => trainingData[activeRound - 1], [activeRound]);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Training <span className="gradient-text-blue">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time federated learning metrics across {activeRound} training rounds.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard title="Model Accuracy" value={`${currentMetrics.accuracy.toFixed(1)}%`} icon={<Activity className="w-4 h-4" />} trend="up" trendValue="3.2%/round" />
          <StatCard title="Comm. Overhead" value={`${currentMetrics.commCost.toFixed(0)}%`} icon={<TrendingDown className="w-4 h-4" />} trend="down" trendValue="72% reduced" />
          <StatCard title="Active Vehicles" value="15" subtitle="of 500 total" icon={<Cpu className="w-4 h-4" />} />
          <StatCard title="Avg Latency" value="23ms" icon={<Clock className="w-4 h-4" />} trend="down" trendValue="vs 89ms baseline" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5 mb-10">
          <motion.div {...cardAnim(0.1)} className="glass-card p-6">
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><Activity className="w-3.5 h-3.5 text-primary" /></div>
              Model Accuracy vs Training Rounds
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trainingData}>
                <defs>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210, 100%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(210, 100%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 18%, 16%)" />
                <XAxis dataKey="round" stroke="hsl(220, 15%, 40%)" fontSize={11} />
                <YAxis stroke="hsl(220, 15%, 40%)" fontSize={11} domain={[40, 100]} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="accuracy" stroke="hsl(210, 100%, 60%)" fill="url(#accGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div {...cardAnim(0.2)} className="glass-card p-6">
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center"><Wifi className="w-3.5 h-3.5 text-accent" /></div>
              Communication Cost vs Time
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 18%, 16%)" />
                <XAxis dataKey="round" stroke="hsl(220, 15%, 40%)" fontSize={11} />
                <YAxis stroke="hsl(220, 15%, 40%)" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="commCost" stroke="hsl(32, 100%, 55%)" strokeWidth={2.5} dot={false} name="Our System" />
                <Line type="monotone" dataKey="bandwidth" stroke="hsl(0, 85%, 55%)" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Baseline FL" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div {...cardAnim(0.3)} className="glass-card p-6">
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-electric-violet/10 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-electric-violet" /></div>
              Traffic Density & Anomalies
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={trafficPatterns}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 18%, 16%)" />
                <XAxis dataKey="time" stroke="hsl(220, 15%, 40%)" fontSize={11} />
                <YAxis stroke="hsl(220, 15%, 40%)" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="normal" fill="hsl(210, 100%, 60%)" opacity={0.6} radius={[6, 6, 0, 0]} name="Normal Traffic" />
                <Bar dataKey="anomaly" fill="hsl(32, 100%, 55%)" radius={[6, 6, 0, 0]} name="Anomalies" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div {...cardAnim(0.4)} className="glass-card p-6">
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><Cpu className="w-3.5 h-3.5 text-primary" /></div>
              Vehicle Selection Distribution
            </h3>
            <div className="flex items-center gap-8">
              <ResponsiveContainer width="50%" height={230}>
                <PieChart>
                  <Pie data={vehicleDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={85} strokeWidth={0}>
                    {vehicleDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                {vehicleDistribution.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    <div>
                      <div className="text-sm font-medium">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.value} vehicles</div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-border/30">
                  <div className="text-xs text-muted-foreground">Selection ratio</div>
                  <div className="font-display text-2xl font-bold gradient-text-blue">3%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Edge Server Table */}
        <motion.div {...cardAnim(0.5)} className="glass-card overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h3 className="font-display text-sm font-semibold flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><Wifi className="w-3.5 h-3.5 text-primary" /></div>
              Edge Server Status
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30 bg-secondary/20">
                  <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider p-4">Server</th>
                  <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider p-4">Connected Vehicles</th>
                  <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider p-4">Updates Processed</th>
                  <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider p-4">Avg Latency</th>
                  <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {edgeServerData.map((s, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="border-b border-border/20 hover:bg-primary/3 transition-colors"
                  >
                    <td className="p-4 font-mono text-sm font-medium">{s.name}</td>
                    <td className="p-4 text-sm">{s.vehicles}</td>
                    <td className="p-4 text-sm font-mono">{s.updates}</td>
                    <td className="p-4 text-sm font-mono">{s.latency}ms</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-electric-emerald/10 text-electric-emerald border border-electric-emerald/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-emerald animate-pulse" />
                        Active
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
