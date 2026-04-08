import { motion } from "framer-motion";
import { Users, GraduationCap, BookOpen, Mail, Award, Calendar } from "lucide-react";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Ahmad Ijaz",
    reg: "Fall 2022-BSCS-184",
    email: "fa22-bscs-184@lgu.edu.pk",
    role: "Developer & Researcher",
    initials: "AI",
  },
  {
    name: "Asfand Yar Fridi",
    reg: "Fall 2022-BSCS-192",
    email: "fa22-bscs-192@lgu.edu.pk",
    role: "Developer & Researcher",
    initials: "AF",
  },
];

const milestones = [
  { id: "M1", title: "Project Proposal & Defense", duration: "Oct–Nov 2025", status: "done" },
  { id: "M2", title: "Requirement Analysis", duration: "Nov 2025", status: "done" },
  { id: "M3", title: "Literature Review", duration: "Nov–Dec 2025", status: "done" },
  { id: "M4", title: "Dataset Collection", duration: "Dec 2025", status: "done" },
  { id: "M5", title: "Data Preprocessing", duration: "Dec 2025–Jan 2026", status: "done" },
  { id: "M6", title: "Baseline ML Models", duration: "Jan 2026", status: "done" },
  { id: "M7", title: "Federated Learning Setup", duration: "Jan–Feb 2026", status: "done" },
  { id: "M8", title: "Integration with Anomaly Detection", duration: "Feb–Mar 2026", status: "done" },
  { id: "M9", title: "Application Development", duration: "Mar 2026", status: "done" },
  { id: "M10", title: "System Integration", duration: "Mar–Apr 2026", status: "current" },
  { id: "M11", title: "Testing & Validation", duration: "Apr 2026", status: "upcoming" },
  { id: "M12", title: "Deployment & Documentation", duration: "Apr–May 2026", status: "upcoming" },
];

const references = [
  "M. Raftopoulou, et al., \"Federated Learning over MU-MIMO Vehicular Networks,\" Entropy, Sep. 2025.",
  "W. Marfo, et al., \"Reducing Communication Overhead in Federated Learning for Network Anomaly Detection,\" Mar. 2025.",
  "M. Ghamri, et al., \"Federated Learning for Secure In-Vehicle Communication,\" Telecom, Sep. 2025.",
  "M. Usman and Y. Lee, \"DFDG: Adaptive Federated Learning for Dynamic Graph-Based Traffic Forecasting.\"",
];

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            About the <span className="gradient-text-blue">Project</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Final Year Project at Lahore Garrison University — Department of Computer Science.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><Users className="w-4.5 h-4.5 text-primary" /></div>
            Team Members
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card p-7 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-electric-violet/20 border border-primary/20 flex items-center justify-center text-primary text-lg font-display font-bold flex-shrink-0 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground font-mono mt-0.5">{member.reg}</p>
                    <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                    <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-xs text-muted-foreground mt-3 hover:text-primary transition-colors">
                      <Mail className="w-3 h-3" /> {member.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supervisor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card p-7 mt-6"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-violet/20 to-accent/20 border border-electric-violet/20 flex items-center justify-center text-electric-violet text-lg font-display font-bold flex-shrink-0">
                BA
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-lg">Ms. Batool Abbas</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-electric-violet/10 text-electric-violet border border-electric-violet/20">Supervisor</span>
                </div>
                <p className="text-sm text-muted-foreground">Department of Computer Science — Lahore Garrison University</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center"><Calendar className="w-4.5 h-4.5 text-accent" /></div>
            Project Timeline
          </h2>
          <div className="glass-card p-7">
            <div className="space-y-1">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-4 p-2.5 rounded-xl transition-colors ${
                    m.status === "current" ? "bg-accent/5 border border-accent/15" : "hover:bg-secondary/20"
                  }`}
                >
                  <span className="font-mono text-xs text-muted-foreground/60 w-8 flex-shrink-0">{m.id}</span>
                  <div className="relative flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      m.status === "done" ? "bg-electric-emerald" :
                      m.status === "current" ? "bg-accent" :
                      "bg-muted-foreground/20"
                    }`} />
                    {m.status === "current" && (
                      <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm ${
                      m.status === "current" ? "text-accent font-semibold" :
                      m.status === "done" ? "text-foreground" :
                      "text-muted-foreground"
                    }`}>
                      {m.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground/60 font-mono hidden sm:block flex-shrink-0">{m.duration}</span>
                  {m.status === "done" && (
                    <Award className="w-3.5 h-3.5 text-electric-emerald/50 flex-shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* References */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-electric-violet/10 flex items-center justify-center"><BookOpen className="w-4.5 h-4.5 text-electric-violet" /></div>
            References
          </h2>
          <div className="glass-card p-7 space-y-4">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 text-sm text-muted-foreground p-3 rounded-xl hover:bg-secondary/20 transition-colors"
              >
                <span className="text-primary font-mono font-semibold flex-shrink-0">[{i + 1}]</span>
                <span className="leading-relaxed">{ref}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
