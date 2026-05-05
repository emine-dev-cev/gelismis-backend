import { store } from '../store/index.js';

export default function Sidebar() {
    const state = store.getState();
    const user = state.user || {};

    const menuItems = [
        { icon: 'home', label: 'Feed', path: '/' },
        { icon: 'compass', label: 'Explore', path: '/explore' },
        { icon: 'message-square', label: 'Messages', path: '/messages' },
        { icon: 'bookmark', label: 'Bookmarks', path: '/bookmarks' },
        { icon: 'user', label: 'Profile', path: '/profile' },
        { icon: 'settings', label: 'Settings', path: '/settings' }
    ];

    return `
    <div class="flex flex-col gap-6">
        <div class="glass rounded-3xl p-6">
            <div class="flex flex-col gap-4">
                ${menuItems.map(item => `
                    <button onclick="window.nexNet.navigate('${item.path}')" 
                        class="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all group">
                        <i data-lucide="${item.icon}" class="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors"></i>
                        <span class="font-medium text-slate-300 group-hover:text-white">${item.label}</span>
                    </button>
                `).join('')}
                
                <div class="h-px bg-white/5 my-2"></div>
                
                <button onclick="window.nexNet.logout()" class="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-500/10 group transition-all">
                    <i data-lucide="log-out" class="w-6 h-6 text-slate-400 group-hover:text-red-500 transition-colors"></i>
                    <span class="font-medium text-slate-300 group-hover:text-red-500">Logout</span>
                </button>
            </div>
        </div>

        <div class="glass rounded-3xl p-6">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Your Stats</h4>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/5 rounded-2xl p-4 text-center">
                    <p class="text-xl font-bold text-white">${user.followers_count || 0}</p>
                    <p class="text-xs text-slate-500 uppercase">Followers</p>
                </div>
                <div class="bg-white/5 rounded-2xl p-4 text-center">
                    <p class="text-xl font-bold text-white">${user.following_count || 0}</p>
                    <p class="text-xs text-slate-500 uppercase">Following</p>
                </div>
            </div>
        </div>
    </div>
    `;
}
