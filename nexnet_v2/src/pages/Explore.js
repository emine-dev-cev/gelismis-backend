import { PostService } from '../services/api.js';

export default function ExplorePage() {
    const trends = ['Technology', 'Architecture', 'Premium UI', 'Branding', 'Photography', 'Minimalism'];
    
    return `
    <div class="max-w-[1200px] mx-auto pt-4">
        <!-- Minimal Explore Header -->
        <div class="mb-12">
            <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Explore</h1>
            <p class="text-slate-500 font-medium tracking-tight">Discover high-end content from across the elite network.</p>
        </div>

        <!-- Professional Tags -->
        <div class="flex gap-3 overflow-x-auto pb-8 custom-scroll">
            ${trends.map(t => `
                <button class="px-6 py-2.5 rounded-xl bg-white border border-slate-100 text-slate-600 font-bold text-xs hover:border-slate-900 hover:text-slate-900 transition-all whitespace-nowrap shadow-sm">
                    ${t}
                </button>
            `).join('')}
        </div>

        <!-- Pinterest-Style Masonry Grid (Simulated with columns) -->
        <div class="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            ${[...Array(16)].map((_, i) => {
                const height = [48, 64, 80, 56, 72][i % 5]; // Varied heights for masonry feel
                return `
                <div class="break-inside-avoid elite-card rounded-[2rem] overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                    <img src="https://picsum.photos/seed/explore${i}/600/${height * 10}" 
                        class="w-full object-cover transition-transform duration-700 group-hover:scale-110">
                    
                    <!-- Professional Blur Overlay on Hover -->
                    <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <div class="flex items-center justify-between text-white">
                            <div class="flex items-center gap-2">
                                <i data-lucide="heart" class="w-4 h-4 fill-white"></i>
                                <span class="text-xs font-bold">${Math.floor(Math.random() * 900) + 100}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                                <span class="text-xs font-bold">${(Math.random() * 10).toFixed(1)}k</span>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    </div>
    `;
}
