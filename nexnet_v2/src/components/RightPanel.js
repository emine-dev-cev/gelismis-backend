export default function RightPanel() {
    const trends = [
        { tag: '#VibrantLife', posts: '125K' },
        { tag: '#NexNetV2', posts: '89K' },
        { tag: '#SocialFuture', posts: '45K' },
        { tag: '#CreativeCoding', posts: '22K' }
    ];

    return `
    <div class="flex flex-col gap-6 sticky top-24">
        <div class="vibrant-card p-6">
            <h4 class="font-black text-slate-800 text-lg mb-4">Trends for you</h4>
            <div class="space-y-4">
                ${trends.map(t => `
                    <div class="group cursor-pointer">
                        <p class="text-xs text-slate-400 font-bold mb-0.5">Trending</p>
                        <h5 class="font-extrabold text-slate-800 group-hover:text-primary transition-colors">${t.tag}</h5>
                        <p class="text-[10px] text-slate-500 font-bold">${t.posts} vibrant posts</p>
                    </div>
                `).join('')}
            </div>
            <button class="w-full mt-6 py-3 rounded-2xl bg-slate-50 text-primary font-black text-xs hover:bg-slate-100 transition-colors">
                Show More
            </button>
        </div>

        <div class="vibrant-card p-6">
            <h4 class="font-black text-slate-800 text-lg mb-4">Suggested Users</h4>
            <div class="space-y-4">
                ${[1, 2, 3].map(i => `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img src="https://i.pravatar.cc/150?u=sug${i}" class="w-10 h-10 rounded-full border border-slate-100">
                            <div>
                                <h5 class="text-xs font-bold text-slate-800">User_${i}</h5>
                                <p class="text-[10px] text-slate-400 font-bold">Suggested for you</p>
                            </div>
                        </div>
                        <button class="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all">
                            Follow
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="px-6 flex flex-wrap gap-x-4 gap-y-2">
            <span class="text-[10px] text-slate-400 font-bold cursor-pointer hover:underline">Privacy Policy</span>
            <span class="text-[10px] text-slate-400 font-bold cursor-pointer hover:underline">Terms of Service</span>
            <span class="text-[10px] text-slate-400 font-bold cursor-pointer hover:underline">Cookies</span>
            <span class="text-[10px] text-slate-400 font-bold mt-2">© 2026 NexNet Vibrant</span>
        </div>
    </div>
    `;
}
