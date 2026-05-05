import { store } from '../store/index.js';
import { getTheme } from '../utils/themes.js';

export default function ProfilePage() {
    const user = store.getState().user || { username: 'Emine' };
    const theme = getTheme(user.username);
    const assetPath = `/v2/assets/themes/${theme.avatar}`;
    const bannerPath = `/v2/assets/themes/${theme.banner}`;

    return `
    <div class="flex flex-col gap-8 animate-fade-in">
        <!-- Elite Profile Header -->
        <div class="elite-card rounded-[2.5rem] overflow-hidden bg-white relative">
            <!-- Banner with Blur Overlay -->
            <div class="h-64 w-full relative overflow-hidden">
                <img src="${bannerPath}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            </div>
            
            <!-- Profile Info Area -->
            <div class="px-10 pb-10 -mt-20 relative z-10 flex flex-col items-center sm:items-start sm:flex-row sm:gap-8">
                <div class="relative group">
                    <div class="w-40 h-40 rounded-[2.5rem] p-1 bg-white shadow-2xl transition-transform group-hover:scale-105">
                        <img src="${assetPath}" class="w-full h-full rounded-[2.2rem] object-cover border-2 border-slate-50">
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <i data-lucide="crown" class="w-5 h-5"></i>
                    </div>
                </div>
                
                <div class="mt-24 sm:mt-24 text-center sm:text-left flex-1">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">@${user.username}</h1>
                        <button class="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                            Profili Düzenle
                        </button>
                    </div>
                    <p class="text-slate-500 font-medium max-w-lg leading-relaxed">
                        Royal Member of NexNet Elite. Living a fairy tale in the digital kingdom. ✨
                    </p>
                    
                    <div class="flex gap-10 mt-8 pt-8 border-t border-slate-50 justify-center sm:justify-start">
                        <div class="text-center sm:text-left">
                            <p class="text-xl font-bold text-slate-900">1.2k</p>
                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Takipçi</p>
                        </div>
                        <div class="text-center sm:text-left">
                            <p class="text-xl font-bold text-slate-900">840</p>
                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Takip</p>
                        </div>
                        <div class="text-center sm:text-left">
                            <p class="text-xl font-bold text-slate-900">128</p>
                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gönderi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Media Grid Title -->
        <div class="flex items-center gap-4 px-4">
            <h2 class="text-lg font-bold text-slate-800">Tüm Paylaşımlar</h2>
            <div class="h-px flex-1 bg-slate-100"></div>
        </div>

        <!-- Professional Post Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
            ${[1, 2, 3, 4, 5, 6].map(i => `
                <div class="aspect-square rounded-[2rem] bg-white border border-slate-50 overflow-hidden group cursor-pointer relative shadow-sm hover:shadow-xl transition-all duration-500">
                    <img src="https://picsum.photos/seed/profile${i}/600/600" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-indigo-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <div class="flex gap-4 text-white">
                            <div class="flex items-center gap-1"><i data-lucide="heart" class="w-4 h-4 fill-white"></i> <span class="text-xs font-bold">42</span></div>
                            <div class="flex items-center gap-1"><i data-lucide="message-circle" class="w-4 h-4"></i> <span class="text-xs font-bold">12</span></div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}
