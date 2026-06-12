"use client";

import React from "react";
import { ShieldCheck, Layers, Activity, BellRing } from "lucide-react";

const featureItems = [
  {
    icon: <ShieldCheck size={22} />,
    title: "Fine-Grained Permissions",
    desc: "Define designations with distinct access boundaries. Grant roles authority to approve tasks, oversee logs, verify accounts, or send broadcast alerts safely.",
  },
  {
    icon: <Layers size={22} />,
    title: "Multi-Tiered Workspaces",
    desc: "Personalized user views for Admins, CTOs, and Standard Employees. Focus on core tasks, pending bottlenecks, and progress metrics relevant to your role.",
  },
  {
    icon: <Activity size={22} />,
    title: "Seamless Approval Pipelines",
    desc: "Empower your workforce to register tasks, request reviews, and submit updates. Managers receive live action lists to approve, defer, or flag tasks in one click.",
  },
  {
    icon: <BellRing size={22} />,
    title: "Real-Time Notifications",
    desc: "No page refreshes needed. Updates, messages, and manager actions publish instantly across the organization via standard WebSocket connections.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="text-gradient-teal">Tailored for Operational Integrity</h2>
          <p>TaskFlow is engineered to keep managers informed, databases secure, and operations highly synchronized.</p>
        </div>

        {/* Feature Cards */}
        <div className="features-grid">
          {featureItems.map((f, i) => (
            <div key={i} className="glass-panel feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
