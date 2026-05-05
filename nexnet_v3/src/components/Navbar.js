import React from 'https://cdn.skypack.dev/react';
import { useStore } from '../store/useStore.js';

export default function Navbar() {
    const { user, theme } = useStore();
    
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 h-20">
            <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <i data-lucide="shield-check" className="text-white w-5 h-5"></i>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">NexNet</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">V3 Pro</span>
                    </div>
                </div>

                <div className="hidden md:flex flex-1 max-w-lg mx-12">
                    <div className="relative w-full group">
                        <i data-lucide="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-slate-900 transition-colors"></i>
                        <input type="text" placeholder="Gelişmiş ağda ara..." 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-medium focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all" />
                    </div>
                </div>

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-900 leading-none">@{user.username}</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Pro Member</p>
                    </div>
                    <img src={theme.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-100 group-hover:border-slate-300 transition-all shadow-sm" />
                </div>
            </div>
        </nav>
    );
}
