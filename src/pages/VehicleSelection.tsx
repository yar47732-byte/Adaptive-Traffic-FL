import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Cpu, MapPin, AlertTriangle, CheckCircle, RefreshCw, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface Vehicle {
  id: number;
  x: number;
  y: number;
  speed: number;
  anomalyScore: number;
  dataQuality: number;
  totalScore: number;
  selected: boolean;
  type: "normal" | "anomaly" | "emergency";
}

const generateVehicles = (count: number, selectCount: number): Vehicle[] => {
  const vehicles: Vehicle[] = [];
  for (let i = 0; i < count; i++) {
    const isAnomaly = Math.random() < 0.08;
    const isEmergency = !isAnomaly && Math.random() < 0.03;
    const anomalyScore = isEmergency ? 0.9 + Math.random() * 0.1 : isAnomaly ? 0.6 + Math.random() * 0.3 : Math.random() * 0.4;
    const dataQuality = 0.3 + Math.random() * 0.7;
    const totalScore = anomalyScore * 0.6 + dataQuality * 0.4;
    vehicles.push({
      id: i + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 10 + Math.random() * 80,
      anomalyScore,
      dataQuality,
      totalScore,
      selected: false,
      type: isEmergency ? "emergency" : isAnomaly ? "anomaly" : "normal",
    });
  }
  const sorted = [...vehicles].sort((a, b) => b.totalScore - a.totalScore);
  const selectedIds = new Set(sorted.slice(0, selectCount).map((v) => v.id));
  return vehicles.map((v) => ({ ...v, selected: selectedIds.has(v.id) }));
};

const VehicleSelection = () => {
  const [vehicleCount, setVehicleCount] = useState(200);
  const [selectCount, setSelectCount] = useState(15);
  const [seed, setSeed] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const vehicles = useMemo(() => generateVehicles(vehicleCount, selectCount), [vehicleCount, selectCount, seed]);
  const selectedVehicles = useMemo(() => vehicles.filter((v) => v.selected).sort((a, b) => b.totalScore - a.totalScore), [vehicles]);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Vehicle <span className="gradient-text-blue">Selection</span> Simulator
          </h1>
          <p className="text-muted-foreground text-lg">
            Interactive demonstration of the Resource Allocation Algorithm selecting key vehicles.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 mb-6 flex flex-wrap items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sliders className="w-4 h-4 text-primary" />
            </div>
            <label className="text-sm font-medium">Total Vehicles:</label>
            <select
              value={vehicleCount}
              onChange={(e) => setVehicleCount(Number(e.target.value))}
              className="bg-secondary border border-border/50 rounded-xl px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors"
            >
              {[50, 100, 200, 300, 500].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-accent" />
            </div>
            <label className="text-sm font-medium">Select Top:</label>
            <select
              value={selectCount}
              onChange={(e) => setSelectCount(Number(e.target.value))}
              className="bg-secondary border border-border/50 rounded-xl px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors"
            >
              {[5, 10, 15, 20].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <Button
            onClick={() => setSeed((s) => s + 1)}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Re-run Algorithm
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><MapPin className="w-3.5 h-3.5 text-primary" /></div>
              Vehicle Distribution Map — Area Coverage
            </h3>
            <div className="relative bg-secondary/20 rounded-2xl overflow-hidden border border-border/20" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0 cyber-grid opacity-40" />
              {/* Edge servers */}
              {[
                { x: 25, y: 30 },
                { x: 75, y: 30 },
                { x: 25, y: 70 },
                { x: 75, y: 70 },
              ].map((pos, i) => (
                <motion.div
                  key={`edge-${i}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  className="absolute w-7 h-7 rounded-xl bg-electric-violet/15 border border-electric-violet/30 flex items-center justify-center shadow-[0_0_15px_hsl(265,80%,62%/0.2)]"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <Cpu className="w-3 h-3 text-electric-violet" />
                </motion.div>
              ))}
              {/* Vehicles */}
              {vehicles.map((v) => (
                <motion.div
                  key={v.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: Math.random() * 0.5 }}
                  onClick={() => setSelectedVehicle(v)}
                  className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-[2.5] ${
                    v.selected
                      ? v.type === "emergency"
                        ? "bg-destructive shadow-[0_0_10px_hsl(0,85%,55%/0.5)]"
                        : "bg-accent shadow-[0_0_10px_hsl(32,100%,55%/0.4)]"
                      : "bg-muted-foreground/20"
                  }`}
                  style={{ left: `${v.x}%`, top: `${v.y}%`, transform: "translate(-50%, -50%)" }}
                />
              ))}
              {/* Legend */}
              <div className="absolute bottom-3 left-3 glass-card p-3 text-xs space-y-1.5 border border-border/30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_6px_hsl(32,100%,55%/0.4)]" />
                  <span className="text-muted-foreground">Selected ({selectedVehicles.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                  <span className="text-muted-foreground">Idle ({vehicles.length - selectedVehicles.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive shadow-[0_0_6px_hsl(0,85%,55%/0.4)]" />
                  <span className="text-muted-foreground">Emergency</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Selected vehicles list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-electric-emerald/10 flex items-center justify-center"><CheckCircle className="w-3.5 h-3.5 text-electric-emerald" /></div>
              Selected Vehicles (Top {selectCount})
            </h3>
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {selectedVehicles.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedVehicle(v)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 hover:border-primary/40 ${
                    selectedVehicle?.id === v.id ? "border-primary/40 bg-primary/5" : "border-border/30 bg-secondary/15"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-medium">Vehicle #{v.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      v.type === "emergency" ? "bg-destructive/15 text-destructive border border-destructive/20" :
                      v.type === "anomaly" ? "bg-accent/15 text-accent border border-accent/20" :
                      "bg-primary/15 text-primary border border-primary/20"
                    }`}>
                      {v.type === "emergency" ? "Emergency" : v.type === "anomaly" ? "Anomaly" : "Key Data"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Score: <span className="text-foreground font-mono font-medium">{v.totalScore.toFixed(2)}</span></span>
                    <span>Speed: <span className="text-foreground font-mono font-medium">{v.speed.toFixed(0)}</span>km/h</span>
                  </div>
                  <div className="mt-2.5 h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${v.totalScore * 100}%` }}
                      transition={{ delay: i * 0.04 + 0.3, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedVehicle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card glow-border p-7 mt-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Cpu className="w-4 h-4 text-primary" /></div>
                  Vehicle #{selectedVehicle.id} — Detailed Analysis
                </h3>
                <button onClick={() => setSelectedVehicle(null)} className="text-muted-foreground hover:text-foreground text-sm px-3 py-1 rounded-lg hover:bg-secondary/50 transition-colors">
                  Close ✕
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {[
                  { label: "Total Score", val: selectedVehicle.totalScore.toFixed(3) },
                  { label: "Anomaly Score", val: selectedVehicle.anomalyScore.toFixed(3) },
                  { label: "Data Quality", val: selectedVehicle.dataQuality.toFixed(3) },
                  { label: "Speed", val: `${selectedVehicle.speed.toFixed(1)} km/h` },
                  { label: "Status", val: selectedVehicle.selected ? "Selected ✓" : "Idle" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-secondary/20 border border-border/20">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="font-mono text-sm font-semibold">{item.val}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/15 text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Algorithm:</strong> Score = (Anomaly × 0.6) + (DataQuality × 0.4).
                Vehicles with emergency events (accidents, unusual congestion) receive anomaly scores &gt; 0.9,
                ensuring they are always selected for the training round.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default VehicleSelection;
