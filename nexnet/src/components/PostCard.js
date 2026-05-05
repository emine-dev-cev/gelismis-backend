export default function PostCard(post) {
    return `
    <div class="glass rounded-3xl p-6 hover:border-white/20 transition-all group">
        <div class="flex justify-between items-start mb-4">
            <div class="flex gap-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-400 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                    <i data-lucide="user" class="w-6 h-6"></i>
                </div>
                <div>
                    <h4 class="font-bold text-white leading-tight">@${post.author_username}</h4>
                    <p class="text-xs text-slate-500">${new Date(post.created_at).toLocaleDateString()}</p>
                </div>
            </div>
            <button class="p-2 text-slate-500 hover:text-white transition-colors">
                <i data-lucide="more-horizontal" class="w-5 h-5"></i>
            </button>
        </div>

        <h3 class="text-lg font-bold text-slate-100 mb-2">${post.title}</h3>
        <p class="text-slate-400 leading-relaxed mb-6">${post.content}</p>

        <div class="flex items-center gap-6 pt-4 border-t border-white/5">
            <button onclick="window.nexNet.handleLike(${post.id})" 
                class="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-all transform active:scale-95">
                <i data-lucide="heart" class="w-5 h-5"></i>
                <span class="text-sm font-semibold">${post.likes_count || 0}</span>
            </button>
            <button class="flex items-center gap-2 text-slate-500 hover:text-primary transition-all">
                <i data-lucide="message-circle" class="w-5 h-5"></i>
                <span class="text-sm font-semibold">${post.comments_count || 0}</span>
            </button>
            <button class="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-all">
                <i data-lucide="share-2" class="w-5 h-5"></i>
            </button>
            <button class="ml-auto text-slate-500 hover:text-yellow-500 transition-all">
                <i data-lucide="bookmark" class="w-5 h-5"></i>
            </button>
        </div>
    </div>
    `;
}
