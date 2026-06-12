import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TaskFlow — Streamlined Enterprise Task Management",
  description: "Experience the next generation of task organization. Manage user permissions, approve task requests instantly, track workflows in real-time, and coordinate with live notifications.",
  keywords: "task manager, project management, workflow coordinator, collaborative workspace, SaaS dashboard, admin approvals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
