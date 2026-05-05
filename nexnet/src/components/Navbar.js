import { store } from '../store/index.js';

export default function Navbar() {
    const state = store.getState();
    const user = state.user || { username: 'Guest' };

    return `
    <nav class="sticky top-0 z-50 glass border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center gap-2 cursor-pointer" onclick="window.nexNet.navigate('/')">
                    <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <i data-lucide="zap" class="text-white w-6 h-6"></i>
                    </div>
                    <span class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">NexNet</span>
                </div>
                
                <div class="hidden md:flex items-center flex-1 max-w-md mx-8">
                    <div class="relative w-full">
                        <i data-lucide="search" class="absolute left-3 top-2.5 text-slate-400 w-5 h-5"></i>
                        <input type="text" placeholder="Search the network..." 
                            class="w-full bg-slate-800/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <button class="p-2 text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="bell" class="w-6 h-6"></i>
                    </button>
                    <div class="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div class="text-right hidden sm:block">
                            <p class="text-sm font-semibold">@${user.username}</p>
                            <p class="text-xs text-slate-500">Pro Member</p>
                        </div>
                        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-0.5 cursor-pointer" onclick="window.nexNet.navigate('/profile')">
                            <div class="w-full h-full rounded-full bg-dark flex items-center justify-center">
                                <i data-lucide="user" class="w-5 h-5"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;
}
