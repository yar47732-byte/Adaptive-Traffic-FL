import { Network, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/30 bg-card/30 backdrop-blur-xl mt-24">
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <Network className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-sm">
              <span className="gradient-text-blue">FL</span>
              <span className="text-foreground/70">-Optimize</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            Optimizing Federated Learning in Dense Traffic Networks — A Final Year Project at Lahore Garrison University.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-3">Quick Links</h4>
          <div className="space-y-2">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/vehicle-selection", label: "Vehicle Selection" },
              { to: "/architecture", label: "Architecture" },
              { to: "/dataset", label: "Dataset Explorer" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="block text-xs text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-3">Team</h4>
          <p className="text-xs text-muted-foreground">Ahmad Ijaz & Asfand Yar Fridi</p>
          <p className="text-xs text-muted-foreground mt-1">Supervised by Ms. Batool Abbas</p>
          <a
            href="https://data.mendeley.com/datasets/5gt4fg4rvp/1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 mt-3 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View Dataset on Mendeley
          </a>
        </div>
      </div>
      <div className="border-t border-border/20 mt-8 pt-6 text-center">
        <p className="text-xs text-muted-foreground/60">
          © 2025–2026 Lahore Garrison University — Department of Computer Science
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
