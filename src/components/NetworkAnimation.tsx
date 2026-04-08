import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const NetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    interface Node {
      x: number; y: number; vx: number; vy: number; r: number; type: "vehicle" | "edge" | "cloud";
    }

    const nodes: Node[] = [];
    // Cloud
    nodes.push({ x: w / 2, y: 50, vx: 0, vy: 0, r: 10, type: "cloud" });
    // Edge nodes
    for (let i = 0; i < 5; i++) {
      nodes.push({
        x: 60 + i * (w - 120) / 4,
        y: 130 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.15,
        r: 6,
        type: "edge",
      });
    }
    // Vehicle nodes
    for (let i = 0; i < 25; i++) {
      nodes.push({
        x: 20 + Math.random() * (w - 40),
        y: 200 + Math.random() * (h - 240),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.4,
        r: 2.5,
        type: "vehicle",
      });
    }

    let animId: number;
    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        if (n.type === "cloud") return;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 10 || n.x > w - 10) n.vx *= -1;
        if (n.y < (n.type === "edge" ? 100 : 180) || n.y > h - 10) n.vy *= -1;
      });

      const edges = nodes.filter((n) => n.type === "edge");
      const vehicles = nodes.filter((n) => n.type === "vehicle");
      const cloud = nodes[0];

      // Edge to cloud connections
      edges.forEach((e) => {
        const alpha = 0.12 + Math.sin(t * 1.5) * 0.04;
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(e.x, e.y);
        ctx.lineTo(cloud.x, cloud.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Vehicle to edge connections
      vehicles.forEach((v, vi) => {
        let minDist = Infinity;
        let nearest = edges[0];
        edges.forEach((e) => {
          const d = Math.hypot(v.x - e.x, v.y - e.y);
          if (d < minDist) { minDist = d; nearest = e; }
        });
        if (minDist < 180) {
          const alpha = 0.04 + (vi % 5 === 0 ? Math.sin(t * 2 + vi) * 0.06 : 0);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(v.x, v.y);
          ctx.lineTo(nearest.x, nearest.y);
          ctx.stroke();
        }
      });

      // Cloud node
      ctx.fillStyle = "rgba(59, 130, 246, 0.9)";
      ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Edge nodes
      edges.forEach((e) => {
        ctx.fillStyle = "rgba(139, 92, 246, 0.7)";
        ctx.shadowColor = "rgba(139, 92, 246, 0.4)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Vehicles
      vehicles.forEach((v, i) => {
        const isSelected = i % 5 === 0;
        ctx.fillStyle = isSelected ? "rgba(245, 158, 11, 0.8)" : "rgba(59, 130, 246, 0.2)";
        if (isSelected) {
          ctx.shadowColor = "rgba(245, 158, 11, 0.4)";
          ctx.shadowBlur = 8;
        }
        ctx.beginPath();
        ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Data packets
      for (let i = 0; i < 6; i++) {
        const progress = (t * 0.4 + i / 6) % 1;
        const vi = (i * 4) % vehicles.length;
        const vehicle = vehicles[vi];
        let nearest = edges[0];
        let minDist = Infinity;
        edges.forEach((e) => {
          const d = Math.hypot(vehicle.x - e.x, vehicle.y - e.y);
          if (d < minDist) { minDist = d; nearest = e; }
        });
        const px = vehicle.x + (nearest.x - vehicle.x) * progress;
        const py = vehicle.y + (nearest.y - vehicle.y) * progress;
        ctx.fillStyle = `rgba(59, 130, 246, ${0.7 - progress * 0.5})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.5 }} />
    </motion.div>
  );
};

export default NetworkAnimation;
