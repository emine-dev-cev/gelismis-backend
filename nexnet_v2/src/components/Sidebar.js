import { store } from '../store/index.js';
import { getTheme } from '../utils/themes.js';

export default function Sidebar(path) {
    const user = store.getState().user || { username: 'Emine' };
    const theme = getTheme(user.username);

    const items = [
        { icon: 'home', label: 'Ana Sayfa', path: '/v2/' },
        { icon: 'search', label: 'Keşfet', path: '/v2/explore' },
        { icon: 'bell', label: 'Bildirimler', path: '/v2/notifications' },
        { icon: 'mail', label: 'Mesajlar', path: '/v2/messages' },
        { icon: 'user', label: 'Profilim', path: '/v2/profile' }
    ];

    return `
    <div class="flex flex-col gap-10 sticky top-28 pl-4">
        <div class="space-y-3">
            ${items.map(i => {
                const isActive = path === i.path || (i.path === '/v2/' && path === '/v2');
                return `
                <button onclick="window.nexNet.navigate('${i.path}')" 
                    class="w-full flex items-center gap-4 px-4 py-4 rounded-3xl transition-all group ${isActive ? 'bg-white shadow-xl shadow-slate-100 border border-slate-50' : 'text-slate-400 hover:text-slate-900 hover:bg-white/50'}">
                    <div class="w-11 h-11 flex items-center justify-center rounded-2xl ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-50 group-hover:bg-slate-100'} transition-all">
                        <i data-lucide="${i.icon}" class="w-5 h-5"></i>
                    </div>
                    <span class="font-bold text-sm tracking-tight">${i.label}</span>
                </button>
                `;
            }).join('')}
        </div>
        
        <!-- Premium Card -->
        <div class="elite-card rounded-[2.5rem] p-8 relative overflow-hidden bg-slate-900 text-white shadow-2xl shadow-indigo-100">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <i data-lucide="crown" class="w-8 h-8 text-indigo-400 mb-4"></i>
            <h4 class="font-bold text-sm mb-2 relative z-10">Elite Üyelik</h4>
            <p class="text-[10px] text-slate-400 font-medium mb-6 relative z-10 leading-relaxed">Sınırsız büyü ve özel krallık temalarına erişim kazanın.</p>
            <button class="w-full py-3 rounded-2xl bg-white text-slate-900 text-[10px] font-black tracking-widest uppercase hover:bg-slate-100 transition-all shadow-lg">
                YÜKSELT
            </button>
        </div>
    </div>
    `;
}
