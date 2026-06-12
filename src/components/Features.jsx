import React from "react";
import { ShieldCheck, Layers, Activity, BellRing } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="section" style={{ background: "var(--bg-darker)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
      <div className="container">
        <div className="section-header">
          <h2 className="text-gradient-teal">Tailored for Operational Integrity</h2>
          <p>TaskFlow is engineered to keep managers informed, databases secure, and operations highly synchronized.</p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="glass-panel feature-card">
            <div className="feature-icon">
              <ShieldCheck size={24} />
            </div>
            <h3>Fine-Grained Permissions</h3>
            <p>
              Define designations with distinct access boundaries. Grant roles authority to approve tasks, 
              oversee logs, verify accounts, or send broadcast alerts safely.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel feature-card">
            <div className="feature-icon">
              <Layers size={24} />
            </div>
            <h3>Multi-Tiered Workspaces</h3>
            <p>
              Personalized user views for Admins, CTOs, and Standard Employees. Focus on the core tasks, 
              pending bottlenecks, and progress metrics relevant to your role.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel feature-card">
            <div className="feature-icon">
              <Activity size={24} />
            </div>
            <h3>Seamless Approval Pipelines</h3>
            <p>
              Empower your workforce to register tasks, request reviews, and submit updates. Managers receive 
              live action lists to approve, defer, or flag tasks in one click.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-panel feature-card">
            <div className="feature-icon">
              <BellRing size={24} />
            </div>
            <h3>Real-Time Notifications</h3>
            <p>
              No page refreshes needed. Updates, messages, and manager actions publish instantly across 
              the organization via standard WebSocket connections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
