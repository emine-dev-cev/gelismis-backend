const { useState, useEffect } = React;

// 1. ELITE GLOBAL STORE (Zustand)
const useStore = createStore((set) => ({
    user: { username: 'Emine' },
    theme: {
        primary: '#8B5CF6',
        bg: '#FDFCFE',
        avatar: '/v2/assets/themes/rapunzel_avatar.png'
    },
    posts: [],
    loading: true,
    setPosts: (posts) => set({ posts, loading: false })
}));

// 2. PROFESSIONAL COMPONENTS
const Navbar = () => {
    const { user, theme } = useStore();
    return html`
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 h-20">
            <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <i data-lucide="shield-check" className="text-white w-5 h-5"></i>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">NexNet</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ELITE PRO</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-900">@${user.username}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Seçkin Üye</p>
                    </div>
                    <img src="${theme.avatar}" className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
                </div>
            </div>
        </nav>
    `;
};

const PostCard = ({ post }) => {
    return html`
        <${motion.div} 
            initial=${{ opacity: 0, y: 20 }}
            animate=${{ opacity: 1, y: 0 }}
            className="elite-card rounded-[2.5rem] bg-white overflow-hidden mb-8"
        >
            <div className="p-6 flex items-center gap-3 border-b border-slate-50">
                <img src="${post.author_avatar || '/v2/assets/themes/rapunzel_avatar.png'}" className="w-10 h-10 rounded-full object-cover" />
                <span className="text-sm font-bold text-slate-800">@${post.author_username}</span>
            </div>
            <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 mb-2">${post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">${post.content}</p>
                ${post.image_url && html`
                    <div className="rounded-[2rem] overflow-hidden border border-slate-50">
                        <img src="${post.image_url}" className="w-full h-full object-cover" />
                    </div>
                `}
            </div>
        <//>
    `;
};

const Skeleton = () => html`
    <div className="bg-white rounded-[2.5rem] p-8 space-y-6 mb-8 border border-slate-50">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full skeleton"></div>
            <div className="h-3 w-1/4 skeleton rounded-lg"></div>
        </div>
        <div className="h-40 w-full skeleton rounded-[2rem]"></div>
    </div>
`;

// 3. MAIN APPLICATION
const App = () => {
    const { posts, loading, setPosts, theme } = useStore();

    useEffect(() => {
        axios.get('http://127.0.0.1:5001/api/posts/')
            .then(res => setPosts(res.data))
            .catch(err => console.error(err));
            
        const interval = setInterval(() => lucide.createIcons(), 1000);
        return () => clearInterval(interval);
    }, []);

    return html`
        <div className="min-h-screen" style=${{ backgroundColor: theme.bg }}>
            <${Navbar} />
            <main className="max-w-[1200px] mx-auto px-6 pt-28 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">
                <aside className="space-y-4 hidden md:block">
                    ${['Ana Sayfa', 'Keşfet', 'Bildirimler', 'Profilim'].map((label, i) => html`
                        <div className="p-4 rounded-2xl flex items-center gap-4 text-slate-400 font-bold hover:bg-white hover:text-slate-900 transition-all cursor-pointer">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                                <i data-lucide="${['home', 'search', 'bell', 'user'][i]}" className="w-5 h-5"></i>
                            </div>
                            <span className="text-sm">${label}</span>
                        </div>
                    `)}
                </aside>
                
                <section>
                    ${loading ? [1, 2].map(() => html`<${Skeleton} />`) : posts.map(post => html`<${PostCard} post=${post} />`)}
                </section>
            </main>
        </div>
    `;
};

// BOOTSTRAP
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(html`<${App} />`);
