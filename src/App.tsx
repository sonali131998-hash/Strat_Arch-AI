import React, { useState } from 'react';
import { Activity, FileText, LayoutDashboard } from 'lucide-react';
import { cn } from './lib/utils';
import { PrototypeView } from './components/PrototypeView';
import { BlueprintView } from './components/BlueprintView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'prototype'>('prototype');

  return (
    <div className="min-h-screen bg-bg-base text-white flex flex-col font-sans selection:bg-accent/30 overflow-hidden">
      {/* Top Navigation Panel */}
      <header className="h-[60px] border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <div className="font-black tracking-[-1px] text-2xl uppercase">
            STRAT_ARCH <span className="text-accent">AI</span>
          </div>
          <div className="flex gap-4">
            <div className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-[4px] border border-current text-success">Engine: Active</div>
            <div className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-[4px] border border-current text-accent">Lat: 42ms</div>
          </div>
        </div>
        
        <nav className="flex items-center gap-4 text-[11px] uppercase tracking-[0.1em] font-semibold text-[#71717a]">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={cn(
              "px-3 py-2 transition-colors",
              activeTab === 'blueprint' 
                ? "text-white border-b-2 border-accent" 
                : "hover:text-white"
            )}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveTab('prototype')}
            className={cn(
              "px-3 py-2 transition-colors",
              activeTab === 'prototype' 
                ? "text-white border-b-2 border-accent" 
                : "hover:text-white"
            )}
          >
            Prototype
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'blueprint' ? (
          <div className="overflow-auto p-8 h-full bg-bg-base"><BlueprintView /></div>
        ) : (
          <PrototypeView />
        )}
      </main>
    </div>
  );
}
