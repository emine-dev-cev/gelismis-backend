import { store } from '../store/index.js';
import { getTheme } from '../utils/themes.js';

export default function Navbar() {
    const user = store.getState().user || { username: 'Emine' };
    const theme = getTheme(user.username);
    const assetPath = `/v2/assets/themes/${theme.avatar}`;

    return `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50">
        <div class="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
            <!-- Professional Logo -->
            <div class="flex items-center gap-3 cursor-pointer group" onclick="window.nexNet.navigate('/v2/')">
                <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <i data-lucide="shield-check" class="text-white w-5 h-5"></i>
                </div>
                <div class="flex flex-col">
                    <span class="text-lg font-extrabold tracking-tight text-slate-900 leading-none">NexNet</span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Elite</span>
                </div>
            </div>

            <!-- Minimal Search -->
            <div class="hidden md:flex flex-1 max-w-lg mx-12">
                <div class="relative w-full group">
                    <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-slate-900 transition-colors"></i>
                    <input type="text" placeholder="Seçkin ağda arama yapın..." 
                        class="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-xs font-medium focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all">
                </div>
            </div>

            <!-- Global Actions -->
            <div class="flex items-center gap-6">
                <button onclick="window.nexNet.navigate('/v2/notifications')" 
                    class="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all relative">
                    <i data-lucide="bell" class="w-5 h-5"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div class="w-px h-8 bg-slate-100 mx-2"></div>

                <div class="flex items-center gap-3 pl-2 cursor-pointer group" onclick="window.nexNet.navigate('/v2/profile')">
                    <div class="text-right hidden sm:block">
                        <p class="text-xs font-bold text-slate-900 leading-none">@${user.username}</p>
                        <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Seçkin Üye</p>
                    </div>
                    <img src="${assetPath}" class="w-10 h-10 rounded-full object-cover border border-slate-100 group-hover:border-slate-300 transition-all shadow-sm">
                </div>
            </div>
        </div>
    </nav>
    `;
}
