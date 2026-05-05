import { store } from '../store/index.js';

export default function ProfilePage() {
    const state = store.getState();
    const user = state.user || {};

    return `
    <div class="flex flex-col gap-8">
        <div class="glass rounded-[3rem] p-10 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary to-purple-600 opacity-20"></div>
            
            <div class="relative flex flex-col items-center text-center">
                <div class="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1 mb-6 shadow-2xl">
                    <div class="w-full h-full rounded-full bg-dark flex items-center justify-center">
                        <i data-lucide="user" class="w-16 h-16 text-white"></i>
                    </div>
                </div>
                
                <h1 class="text-4xl font-black text-white mb-2">@${user.username}</h1>
                <p class="text-slate-400 max-w-md mb-8">Building the future of decentralized social networking. Passionate about UI/UX and scalable systems.</p>
                
                <div class="flex gap-12 border-t border-white/5 pt-8 w-full justify-center">
                    <div class="text-center">
                        <p class="text-2xl font-black text-white">${user.followers_count || 0}</p>
                        <p class="text-xs text-slate-500 uppercase tracking-widest">Followers</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-black text-white">${user.following_count || 0}</p>
                        <p class="text-xs text-slate-500 uppercase tracking-widest">Following</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-black text-white">42</p>
                        <p class="text-xs text-slate-500 uppercase tracking-widest">Posts</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-between items-center px-4">
            <h2 class="text-2xl font-bold text-white">Your Feed</h2>
            <div class="flex gap-2">
                <button class="bg-white/5 text-slate-400 px-4 py-2 rounded-xl text-sm font-bold">Latest</button>
                <button class="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold">Popular</button>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6">
            <p class="text-center text-slate-600 py-12">No personal posts yet. Start sharing!</p>
        </div>
    </div>
    `;
}
