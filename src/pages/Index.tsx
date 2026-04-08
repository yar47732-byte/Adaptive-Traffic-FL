import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Network, Shield, Zap, BarChart3, Database, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkAnimation from "@/components/NetworkAnimation";
import Footer from "@/components/Footer";
import { useRef } from "react";

const features = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Smart Vehicle Selection",
    desc: "Resource Allocation Algorithm selects 5–20 key vehicles per area based on data significance and anomaly scores.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "3-Tier Architecture",
    desc: "Vehicle → Edge → Cloud hierarchical aggregation minimizes communication overhead by 72%.",
    color: "from-electric-violet/20 to-electric-violet/5",
    iconBg: "bg-electric-violet/15 text-electric-violet",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "LOCO-MIMO Technology",
    desc: "Simultaneous data transmission without interference using coordinated multi-user MIMO.",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/15 text-accent",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Privacy Preserving",
    desc: "Only model parameters are shared — raw vehicle data never leaves the device.",
    color: "from-electric-emerald/20 to-electric-emerald/5",
    iconBg: "bg-electric-emerald/15 text-electric-emerald",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Real-time Monitoring",
    desc: "Track communication cost, model accuracy, and bandwidth usage across training rounds.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/15 text-primary",
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "UrbanScene Dataset",
    desc: "16,426 urban images capturing vehicles, cyclists, motorbikes, and pedestrians in diverse conditions.",
    color: "from-electric-rose/20 to-electric-rose/5",
    iconBg: "bg-electric-rose/15 text-electric-rose",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Index = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center cyber-grid">
        <div className="absolute inset-0 hero-gradient" />
        <NetworkAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container mx-auto px-4 relative z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-primary text-xs font-mono mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Final Year Project — BSCS — Lahore Garrison University
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight"
            >
              <span className="gradient-text-blue">Optimizing</span>{" "}
              <span className="text-foreground">Federated</span>
              <br />
              <span className="text-foreground">Learning</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-display text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-6"
            >
              in Dense Traffic Networks
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Minimizing communication overhead and maximizing adaptivity through hierarchical
              architecture, smart vehicle selection, and LOCO-MIMO technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/dashboard">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] px-8 h-12 text-base font-semibold rounded-xl transition-all duration-300">
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/architecture">
                <Button variant="outline" className="border-border/50 hover:bg-secondary/50 hover:border-primary/30 h-12 px-8 text-base rounded-xl transition-all duration-300">
                  View Architecture
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      {/* Stats bar */}
      <section className="relative z-10 -mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card glow-border p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Vehicles Simulated", value: "500+", sub: "per area", color: "gradient-text-blue" },
              { label: "Selected per Round", value: "5–20", sub: "key vehicles", color: "gradient-text-orange" },
              { label: "Comm. Overhead", value: "↓72%", sub: "reduction", color: "text-electric-emerald" },
              { label: "Dataset Images", value: "16,426", sub: "urban scenes", color: "gradient-text-blue" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className={`font-display text-3xl md:text-4xl font-bold ${s.color} mb-1`}>{s.value}</div>
                <div className="text-sm text-foreground/80 font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
              System <span className="gradient-text-multi">Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Our hierarchical FL framework addresses communication bottlenecks in vehicular networks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card p-7 group hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {f.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-card/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
              How It <span className="gradient-text-blue">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three-step hierarchical process from vehicle to cloud.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Vehicle Selection",
                desc: "Resource Allocation Algorithm scores all 200–500 vehicles and selects the top 5–20 with the most informative data patterns.",
                gradient: "from-accent/20 to-transparent",
                accent: "text-accent",
                iconBg: "bg-accent/10",
              },
              {
                step: "02",
                title: "Edge Aggregation",
                desc: "Selected vehicles compress model updates via CAN bus and send to edge servers, which aggregate and further compress data.",
                gradient: "from-primary/20 to-transparent",
                accent: "text-primary",
                iconBg: "bg-primary/10",
              },
              {
                step: "03",
                title: "Cloud Update",
                desc: "Edge servers transmit aggregated updates to the cloud server infrequently, performing global model aggregation with minimal overhead.",
                gradient: "from-electric-violet/20 to-transparent",
                accent: "text-electric-violet",
                iconBg: "bg-electric-violet/10",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass-card p-7 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`font-display text-6xl font-black ${step.accent} opacity-15 mb-4`}>
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 hero-gradient opacity-50" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Explore the <span className="gradient-text-blue">System</span>?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Dive into the dashboard, explore the dataset, or learn about our 3-tier architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow)] px-8 h-11 rounded-xl font-semibold">
                    View Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/dataset">
                  <Button variant="outline" className="border-border/50 hover:border-primary/30 h-11 px-8 rounded-xl">
                    Explore Dataset
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
