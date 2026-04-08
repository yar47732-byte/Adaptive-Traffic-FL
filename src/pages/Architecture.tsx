import { motion } from "framer-motion";
import { Cloud, Server, Car, ArrowDown, ArrowUp, Wifi, Lock, Zap, Layers } from "lucide-react";
import Footer from "@/components/Footer";

const tiers = [
  {
    name: "Cloud Server",
    icon: <Cloud className="w-8 h-8" />,
    accent: "text-electric-violet",
    bg: "bg-electric-violet/10",
    border: "border-electric-violet/25",
    gradient: "from-electric-violet/10 to-transparent",
    desc: "Global model aggregation & storage. Receives compressed updates from edge servers infrequently.",
    details: [
      "Global FedAvg aggregation",
      "Model versioning & rollback",
      "Infrequent updates (saves bandwidth)",
      "Final model distribution",
    ],
  },
  {
    name: "Edge Servers (Base Stations)",
    icon: <Server className="w-8 h-8" />,
    accent: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/25",
    gradient: "from-primary/10 to-transparent",
    desc: "Local aggregation from selected vehicles. Compresses and batches updates before cloud transmission.",
    details: [
      "Local model aggregation",
      "Data compression (LOCO-MIMO)",
      "Vehicle score computation",
      "4 edge servers per area",
    ],
  },
  {
    name: "Vehicle Layer (Selected Participants)",
    icon: <Car className="w-8 h-8" />,
    accent: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/25",
    gradient: "from-accent/10 to-transparent",
    desc: "5–20 key vehicles selected per area via Resource Allocation Algorithm. Local training on CAN bus data.",
    details: [
      "Local model training on-device",
      "CAN bus data compression",
      "Only 3% of vehicles participate",
      "Privacy-preserving (no raw data shared)",
    ],
  },
];

const protocols = [
  { icon: <Wifi className="w-5 h-5" />, title: "LOCO-MIMO", desc: "Low Overhead Coordinated MIMO for interference-free simultaneous transmission.", color: "text-primary", bg: "bg-primary/10" },
  { icon: <Lock className="w-5 h-5" />, title: "Privacy", desc: "Only model weights/gradients are transmitted — raw data never leaves vehicles.", color: "text-electric-emerald", bg: "bg-electric-emerald/10" },
  { icon: <Zap className="w-5 h-5" />, title: "CAN Protocol", desc: "Controller Area Network for compressed intra-vehicle data communication.", color: "text-accent", bg: "bg-accent/10" },
  { icon: <Layers className="w-5 h-5" />, title: "FedAvg", desc: "Federated Averaging algorithm for distributed model weight aggregation.", color: "text-electric-violet", bg: "bg-electric-violet/10" },
];

const Architecture = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            System <span className="gradient-text-blue">Architecture</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Three-tier hierarchical federated learning architecture for vehicular ad-hoc networks.
          </p>
        </motion.div>

        {/* 3-Tier Diagram */}
        <div className="max-w-3xl mx-auto mb-20">
          {tiers.map((tier, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.02 }}
                className={`glass-card p-7 border ${tier.border} relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tier.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="flex items-start gap-5 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${tier.bg} flex items-center justify-center ${tier.accent} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {tier.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-display text-xl font-bold ${tier.accent} mb-2`}>{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tier.desc}</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {tier.details.map((d, j) => (
                        <div key={j} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <span className={`w-1.5 h-1.5 rounded-full ${tier.bg} ${tier.accent}`} />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              {i < tiers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className="flex flex-col items-center py-4"
                >
                  <ArrowUp className="w-4 h-4 text-primary/30" />
                  <div className="text-[10px] font-mono text-muted-foreground/70 px-3 py-1 rounded-full bg-secondary/40 border border-border/30 my-1">
                    {i === 0 ? "Global aggregation" : "Compressed updates"}
                  </div>
                  <ArrowDown className="w-4 h-4 text-primary/30" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Communication Protocols */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
            Communication <span className="gradient-text-multi">Protocols</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {protocols.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card p-6 text-center group"
              >
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center ${p.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {p.icon}
                </div>
                <h4 className="font-display font-semibold text-sm mb-2">{p.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Flow Pipeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
          <h2 className="font-display text-xl font-bold mb-8">
            Data Flow <span className="gradient-text-blue">Pipeline</span>
          </h2>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              { step: 1, label: "Vehicle collects CAN bus data", color: "text-accent", bg: "bg-accent/10" },
              { step: 2, label: "Local model training on device", color: "text-accent", bg: "bg-accent/10" },
              { step: 3, label: "Compressed update → Edge Server", color: "text-primary", bg: "bg-primary/10" },
              { step: 4, label: "Edge aggregation & recompression", color: "text-primary", bg: "bg-primary/10" },
              { step: 5, label: "Infrequent cloud global update", color: "text-electric-violet", bg: "bg-electric-violet/10" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mx-auto mb-3`}>
                  <span className={`font-display text-xl font-bold ${s.color}`}>{s.step}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.label}</p>
                {i < 4 && <div className="hidden md:block data-line mt-4 animate-data-flow" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Architecture;
