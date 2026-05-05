import React from 'https://cdn.skypack.dev/react';

export default function Sidebar() {
    const items = [
        { icon: 'home', label: 'Ana Sayfa', active: true },
        { icon: 'compass', label: 'Keşfet' },
        { icon: 'bell', label: 'Bildirimler' },
        { icon: 'mail', label: 'Mesajlar' },
        { icon: 'user', label: 'Profilim' }
    ];

    return (
        <div className="flex flex-col gap-10 sticky top-28">
            <div className="space-y-2">
                {items.map(i => (
                    <button key={i.label} 
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${i.active ? 'bg-white shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-900 hover:bg-white/50'}`}>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${i.active ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 group-hover:bg-slate-100'} transition-all`}>
                            <i data-lucide={i.icon} className="w-5 h-5"></i>
                        </div>
                        <span className="font-bold text-sm tracking-tight">{i.label}</span>
                    </button>
                ))}
            </div>
            
            <div className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden text-white shadow-2xl shadow-slate-200">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                <h4 className="font-bold text-sm mb-2 relative z-10">Pro Analytics</h4>
                <p className="text-[10px] text-slate-400 font-medium mb-6 relative z-10 leading-relaxed">Verilerini derinlemesine analiz et ve krallığını büyüt.</p>
                <button className="w-full py-3 rounded-xl bg-white text-slate-900 text-[10px] font-black tracking-widest uppercase hover:bg-indigo-50 transition-all shadow-sm">
                    İNCELE
                </button>
            </div>
        </div>
    );
}
