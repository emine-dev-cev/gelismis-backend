import { getTheme } from '../utils/themes.js';

export default function PostCard(post) {
    const theme = getTheme(post.author_username);
    const assetPath = `/v2/assets/themes/${theme.avatar}`; // Correct path for Flask static serving

    return `
    <div class="elite-card rounded-3xl overflow-hidden mb-8 group transition-all duration-500">
        <!-- Minimal Post Header -->
        <div class="p-4 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-slate-50">
            <div class="flex items-center gap-3">
                <div class="relative w-10 h-10">
                    <img src="${assetPath}" class="w-full h-full rounded-full object-cover border border-slate-100 shadow-sm">
                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] shadow-sm">✨</div>
                </div>
                <div>
                    <h4 class="text-sm font-semibold text-slate-800 tracking-tight">@${post.author_username}</h4>
                    <p class="text-[10px] text-slate-400 font-medium">Verified Royal • ${new Date(post.created_at).toLocaleDateString()}</p>
                </div>
            </div>
            <button class="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                <i data-lucide="more-horizontal" class="w-4 h-4"></i>
            </button>
        </div>

        <!-- Post Content Area -->
        <div class="px-8 py-6">
            <h3 class="text-xl font-bold text-slate-900 mb-2 leading-tight tracking-tight">${post.title}</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium mb-4">${post.content}</p>
            
            <!-- Elegant Media Container -->
            <div class="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-sm border border-slate-50 group-hover:shadow-md transition-shadow">
                <img src="${post.image_url || 'https://picsum.photos/seed/' + post.id + '/1200/800'}" 
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                <!-- Subtle Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
        </div>

        <!-- Balanced Interactions -->
        <div class="px-8 pb-6 flex items-center justify-between">
            <div class="flex items-center gap-8">
                <button onclick="window.nexNet.handleLike(${post.id})" 
                    class="flex items-center gap-2.5 text-slate-400 hover:text-indigo-500 transition-all group/btn">
                    <div class="p-2 rounded-full group-hover/btn:bg-indigo-50 transition-colors">
                        <i data-lucide="heart" class="w-5 h-5 group-hover/btn:fill-indigo-500 transition-all"></i>
                    </div>
                    <span class="text-xs font-bold tracking-tight">${post.likes_count || 0}</span>
                </button>
                <button class="flex items-center gap-2.5 text-slate-400 hover:text-teal-500 transition-all group/btn">
                    <div class="p-2 rounded-full group-hover/btn:bg-teal-50 transition-colors">
                        <i data-lucide="message-circle" class="w-5 h-5"></i>
                    </div>
                    <span class="text-xs font-bold tracking-tight">${post.comments_count || 0}</span>
                </button>
            </div>
            <button class="p-2 text-slate-300 hover:text-slate-600 transition-all">
                <i data-lucide="bookmark" class="w-5 h-5"></i>
            </button>
        </div>
    </div>
    `;
}
