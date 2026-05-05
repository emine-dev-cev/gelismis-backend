import { store } from '../store/index.js';
import { PostService } from '../services/api.js';
import PostCard from '../components/PostCard.js';

export default function FeedPage() {
    const state = store.getState();
    const posts = state.posts || [];

    // Trigger initial load if empty
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

    return `
    <div class="flex flex-col gap-6">
        <!-- Create Post -->
        <div class="glass rounded-3xl p-6">
            <div class="flex gap-4">
                <div class="w-12 h-12 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                    <i data-lucide="user" class="w-6 h-6"></i>
                </div>
                <div class="flex-1">
                    <input type="text" id="new-post-title" placeholder="A catchy title..." 
                        class="w-full bg-transparent text-xl font-bold placeholder:text-slate-600 focus:outline-none mb-2">
                    <textarea id="new-post-content" placeholder="What's happening?" 
                        class="w-full bg-transparent text-slate-300 placeholder:text-slate-500 focus:outline-none resize-none" rows="2"></textarea>
                </div>
            </div>
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <div class="flex gap-2">
                    <button class="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all">
                        <i data-lucide="image" class="w-5 h-5"></i>
                    </button>
                    <button class="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all">
                        <i data-lucide="link" class="w-5 h-5"></i>
                    </button>
                </div>
                <button onclick="window.nexNet.handleCreatePost()" 
                    class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                    Post Now
                </button>
            </div>
        </div>

        <!-- Feed List -->
        <div class="flex flex-col gap-6" id="posts-feed">
            ${state.loading ? `
                <div class="glass rounded-3xl p-6 flex flex-col gap-4">
                    <div class="flex gap-4">
                        <div class="w-12 h-12 rounded-full skeleton"></div>
                        <div class="flex-1 space-y-2">
                            <div class="h-4 w-1/4 skeleton rounded"></div>
                            <div class="h-3 w-1/6 skeleton rounded"></div>
                        </div>
                    </div>
                    <div class="h-24 w-full skeleton rounded-2xl"></div>
                </div>
            ` : posts.map(post => PostCard(post)).join('')}
        </div>
    </div>
    `;
}
