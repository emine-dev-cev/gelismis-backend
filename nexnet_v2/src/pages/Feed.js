import { store } from '../store/index.js';
import { PostService } from '../services/api.js';
import PostCard from '../components/PostCard.js';
import { getTheme } from '../utils/themes.js';

export default function FeedPage() {
    const state = store.getState();
    const posts = state.posts || [];
    const currentUser = state.user || { username: 'Emine' };
    const myTheme = getTheme(currentUser.username);

    // Initial Load
    if (posts.length === 0 && !state.loading) {
        setTimeout(async () => {
            store.dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const res = await PostService.getAll();
                store.dispatch({ type: 'SET_POSTS', payload: res.data });
            } catch (err) { console.error(err); }
            store.dispatch({ type: 'SET_LOADING', payload: false });
        }, 0);
    }

    const Skeleton = () => `
        <div class="elite-card rounded-3xl p-6 mb-8 animate-pulse">
            <div class="flex gap-4 items-center mb-6">
                <div class="w-12 h-12 rounded-full skeleton"></div>
                <div class="space-y-2 flex-1">
                    <div class="h-3 w-1/4 skeleton rounded"></div>
                    <div class="h-2 w-1/6 skeleton rounded"></div>
                </div>
            </div>
            <div class="h-6 w-1/2 skeleton rounded mb-4"></div>
            <div class="h-40 w-full skeleton rounded-2xl"></div>
        </div>
    `;

    return `
    <div class="max-w-[640px] mx-auto pt-4">
        <!-- Elite Stories (More Subtle) -->
        <div class="flex gap-6 overflow-x-auto custom-scroll pb-6 mb-8">
            ${['Emine', 'Ela', 'Lorin', 'Melek', 'Gizem', 'Sude'].map(name => {
                const theme = getTheme(name);
                const assetPath = `/v2/assets/themes/${theme.avatar}`;
                return `
                    <div class="flex flex-col items-center gap-3 min-w-[70px] group cursor-pointer">
                        <div class="relative p-[3px] rounded-full border border-slate-100 group-hover:border-indigo-200 transition-all">
                            <div class="w-14 h-14 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img src="${assetPath}" class="w-full h-full object-cover">
                            </div>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors tracking-tight">${name}</span>
                    </div>
                `;
            }).join('')}
        </div>

        <!-- Clean Create Post Area -->
        <div class="elite-card rounded-[2rem] p-6 mb-12 bg-white/40 backdrop-blur-md">
            <div class="flex gap-4">
                <img src="/v2/assets/themes/${myTheme.avatar}" class="w-12 h-12 rounded-full object-cover">
                <div class="flex-1 pt-2">
                    <input type="text" id="post-title" placeholder="Give it a title..." 
                        class="w-full bg-transparent border-none text-lg font-bold text-slate-800 placeholder:text-slate-300 focus:ring-0 mb-1">
                    <textarea id="post-content" placeholder="What's on your mind?" 
                        class="w-full bg-transparent border-none text-sm text-slate-500 placeholder:text-slate-300 focus:ring-0 resize-none" rows="1"></textarea>
                </div>
            </div>
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-slate-100/50">
                <div class="flex gap-2">
                    <button class="p-2.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all">
                        <i data-lucide="image" class="w-5 h-5"></i>
                    </button>
                    <button class="p-2.5 text-slate-400 hover:text-teal-500 hover:bg-teal-50 rounded-xl transition-all">
                        <i data-lucide="hash" class="w-5 h-5"></i>
                    </button>
                </div>
                <button onclick="window.nexNet.handleCreatePost()" 
                    class="bg-slate-900 text-white px-8 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-sm active:scale-95">
                    Post
                </button>
            </div>
        </div>

        <!-- Elite Feed Content -->
        <div class="flex flex-col">
            ${state.loading ? [1,2,3].map(() => Skeleton()).join('') : posts.map(p => PostCard(p)).join('')}
            ${!state.loading && posts.length === 0 ? `
                <div class="text-center py-20">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i data-lucide="wind" class="text-slate-300 w-8 h-8"></i>
                    </div>
                    <p class="text-slate-400 font-medium">The kingdom is quiet today...</p>
                </div>
            ` : ''}
        </div>
    </div>
    `;
}
