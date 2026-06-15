import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EngageLoop — Agentic FSM Workflow Simulator',
  description: 'A granular Kanban dashboard to coordinate agents using finite state machines, as depicted in the EngageLoop specifications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
