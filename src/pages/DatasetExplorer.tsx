import { motion } from "framer-motion";
import { useState } from "react";
import { Database, Search, Image, Sun, Moon, Sunset, ExternalLink, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Footer from "@/components/Footer";

const datasetStats = {
  totalImages: 16426,
  categories: [
    { name: "Traffic", count: 6200, color: "hsl(210, 100%, 60%)" },
    { name: "Pedestrians", count: 5100, color: "hsl(32, 100%, 55%)" },
    { name: "Motorbikes & Cyclists", count: 5126, color: "hsl(265, 80%, 62%)" },
  ],
  timeDistribution: [
    { time: "Morning", count: 5800 },
    { time: "Evening", count: 5600 },
    { time: "Night", count: 5026 },
  ],
};

const sampleQueries = [
  { query: "Total images in dataset", result: "16,426 urban scene images" },
  { query: "Categories available", result: "Traffic, Pedestrians, Motorbikes & Cyclists" },
  { query: "Time periods covered", result: "Morning, Evening, and Night scenes" },
  { query: "Average images per category", result: "~5,475 images" },
  { query: "Dataset size", result: "3.42 GB (compressed)" },
  { query: "Image format", result: "JPEG/PNG with annotation labels" },
  { query: "Use case for FL", result: "Object detection model training across distributed vehicles" },
  { query: "Privacy benefit", result: "Vehicles train locally on their camera feeds, only model weights shared" },
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

const DatasetExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;
    setIsSearching(true);
    setTimeout(() => {
      const match = sampleQueries.find(
        (sq) => sq.query.toLowerCase().includes(q) || q.includes(sq.query.toLowerCase().split(" ")[0])
      );
      if (match) {
        setQueryResult(match.result);
      } else if (q.includes("total") || q.includes("count") || q.includes("how many")) {
        setQueryResult("The UrbanScene dataset contains 16,426 images across 3 categories.");
      } else if (q.includes("traffic")) {
        setQueryResult("Traffic category: ~6,200 images capturing vehicles in urban settings.");
      } else if (q.includes("pedestrian")) {
        setQueryResult("Pedestrians category: ~5,100 images of pedestrians in morning, evening, and night.");
      } else if (q.includes("motorbike") || q.includes("cyclist") || q.includes("bike")) {
        setQueryResult("Motorbikes & Cyclists: ~5,126 images across various lighting conditions.");
      } else if (q.includes("night") || q.includes("morning") || q.includes("evening")) {
        setQueryResult("Images are captured across Morning (~5,800), Evening (~5,600), and Night (~5,026) scenes.");
      } else if (q.includes("size") || q.includes("gb")) {
        setQueryResult("Total dataset size is 3.42 GB compressed (Traffic: 1.28GB, Pedestrians: 1.06GB, Motorbikes: 1.09GB).");
      } else if (q.includes("federated") || q.includes("fl")) {
        setQueryResult("In our FL system, each vehicle trains a local object detection model on its camera feeds using this dataset, then shares only model parameters with edge servers.");
      } else {
        setQueryResult("Query processed. The UrbanScene dataset supports multi-object detection for traffic analysis, urban planning, and public safety applications.");
      }
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Dataset <span className="gradient-text-blue">Explorer</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            UrbanScene: 16,426 multi-object detection images for vehicular FL training.
          </p>
        </motion.div>

        {/* Search / Query */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card glow-border p-7 mb-10"
        >
          <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><Sparkles className="w-3.5 h-3.5 text-primary" /></div>
            Query the Dataset
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ask about the dataset... (e.g., 'how many images', 'traffic category', 'night scenes')"
              className="flex-1 bg-secondary/40 border border-border/40 rounded-xl px-5 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-secondary/60 transition-all duration-300"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] transition-all"
            >
              {isSearching ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Search className="w-4 h-4" />
                </motion.div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Query
                </>
              )}
            </Button>
          </div>
          {queryResult && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              className="mt-5 p-5 rounded-xl bg-primary/5 border border-primary/15"
            >
              <div className="text-[10px] text-primary font-mono uppercase tracking-wider mb-1.5">Result</div>
              <div className="text-sm text-foreground leading-relaxed">{queryResult}</div>
            </motion.div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Total images", "Traffic category", "Night scenes", "Dataset size", "Federated learning"].map((q) => (
              <button
                key={q}
                onClick={() => { setSearchQuery(q); }}
                className="text-xs px-3.5 py-1.5 rounded-full bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-300"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 mb-10">
          {/* Category distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-primary" /></div>
              Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={datasetStats.categories}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={55}
                  strokeWidth={0}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {datasetStats.categories.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Time distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-display font-semibold mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center"><Sun className="w-3.5 h-3.5 text-accent" /></div>
              Time Period Distribution
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={datasetStats.timeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 18%, 16%)" />
                <XAxis dataKey="time" stroke="hsl(220, 15%, 40%)" fontSize={12} />
                <YAxis stroke="hsl(220, 15%, 40%)" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {datasetStats.timeDistribution.map((_, i) => (
                    <Cell key={i} fill={["hsl(32, 100%, 55%)", "hsl(350, 85%, 60%)", "hsl(265, 80%, 62%)"][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Dataset info cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { icon: <Image className="w-5 h-5" />, title: "Traffic.zip", size: "1.28 GB", count: "~6,200 images", color: "text-primary", bg: "bg-primary/10" },
            { icon: <Image className="w-5 h-5" />, title: "Pedestrians.zip", size: "1.06 GB", count: "~5,100 images", color: "text-accent", bg: "bg-accent/10" },
            { icon: <Image className="w-5 h-5" />, title: "Motorbikes & Cyclist.zip", size: "1.09 GB", count: "~5,126 images", color: "text-electric-violet", bg: "bg-electric-violet/10" },
          ].map((file, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card p-6 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${file.bg} flex items-center justify-center ${file.color} group-hover:scale-110 transition-transform`}>
                  {file.icon}
                </div>
                <div>
                  <div className="text-sm font-display font-semibold">{file.title}</div>
                  <div className="text-xs text-muted-foreground">{file.size}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{file.count}</div>
            </motion.div>
          ))}
        </div>

        {/* External link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://data.mendeley.com/datasets/5gt4fg4rvp/1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2 rounded-xl border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all">
              <Database className="w-4 h-4" />
              View on Mendeley Data
              <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DatasetExplorer;
