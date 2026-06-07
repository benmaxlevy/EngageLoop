'use client';

import React from 'react';

export default function Home() {
  return (
    <div className="app-container">
      <div className="bg-glow-left" />

      <header className="app-header">
        <div className="logo-section">
          <h1>EngageLoop</h1>
          <p>Orchestrate multi-agent workflows using finite state machines</p>
        </div>
      </header>

      <main style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div className="panel" style={{ padding: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>
            System Initialized
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            The EngageLoop monorepo is successfully configured with Next.js, NestJS, and shared package workspaces.
            You can now implement your custom business logic, domain folders, and custom FSM coordinators.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ marginBottom: '0.4rem', fontWeight: 600 }}>Next.js Frontend</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>apps/frontend</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ marginBottom: '0.4rem', fontWeight: 600 }}>NestJS Backend</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>apps/backend</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ marginBottom: '0.4rem', fontWeight: 600 }}>Shared FSM</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>packages/fsm</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
