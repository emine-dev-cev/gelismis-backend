export default function NotificationsPage() {
    const notifications = [
        { type: 'like', user: 'alice_wonder', time: '2m ago', content: 'liked your vibrant post' },
        { type: 'follow', user: 'bob_builder', time: '15m ago', content: 'started following you' },
        { type: 'comment', user: 'sarah_creative', time: '1h ago', content: 'commented on your photo' },
        { type: 'mention', user: 'mike_tech', time: '3h ago', content: 'mentioned you in a post' }
    ];

    const getIcon = (type) => {
        if (type === 'like') return { icon: 'heart', color: 'text-red-500', bg: 'bg-red-50' };
        if (type === 'follow') return { icon: 'user-plus', color: 'text-blue-500', bg: 'bg-blue-50' };
        if (type === 'comment') return { icon: 'message-circle', color: 'text-green-500', bg: 'bg-green-50' };
        return { icon: 'at-sign', color: 'text-purple-500', bg: 'bg-purple-50' };
    };

    return `
    <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center mb-2 px-2">
            <h1 class="text-3xl font-black text-slate-800">Notifications</h1>
            <button class="text-primary font-black text-sm hover:underline">Mark all as read</button>
        </div>

        <div class="vibrant-card overflow-hidden">
            <div class="flex flex-col divide-y divide-slate-50">
                ${notifications.map(n => {
                    const style = getIcon(n.type);
                    return `
                    <div class="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div class="w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <i data-lucide="${style.icon}" class="w-6 h-6 ${style.color} ${n.type === 'like' ? 'fill-current' : ''}"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-slate-600">
                                <span class="font-black text-slate-900">@${n.user}</span> 
                                ${n.content}
                            </p>
                            <p class="text-[10px] text-slate-400 font-bold mt-1">${n.time}</p>
                        </div>
                        <div class="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    </div>
    `;
}
