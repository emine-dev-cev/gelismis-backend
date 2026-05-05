import React from 'https://cdn.skypack.dev/react';
import { useStore } from './store/useStore.js';
import { PostService } from './services/api.js';
import { motion, AnimatePresence } from 'https://cdn.skypack.dev/framer-motion';

// Professional Components
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import PostCard from './features/post/PostCard.js';
import Skeleton from './components/Skeleton.js';

export default function App() {
    const { user, theme } = useStore();
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // React Query Mantığı (Basitleştirilmiş Versiyon)
    React.useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await PostService.getAll();
                setPosts(res.data);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen transition-colors duration-700" style={{ backgroundColor: theme.bg }}>
            <Navbar />
            
            <main className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_350px] gap-10 pt-28">
                <Sidebar />
                
                <section className="space-y-8">
                    {/* Page Transition Wrapper */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: 'circOut' }}
                        >
                            {loading ? (
                                [1, 2, 3].map(i => <Skeleton key={i} />)
                            ) : (
                                posts.map(post => <PostCard key={post.id} post={post} />)
                            )}
                        </motion.div>
                    </AnimatePresence>
                </section>
                
                <aside className="hidden lg:block">
                    {/* Right Panel - Suggestions etc. */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm sticky top-28">
                        <h4 className="font-bold text-slate-800 mb-6">Krallığın Önerileri</h4>
                        <div className="space-y-6">
                            {['Lorin', 'Ela', 'Gizem'].map(name => (
                                <div key={name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-50 overflow-hidden">
                                            <img src={`/v2/assets/themes/${name.toLowerCase()}_avatar.png`} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">@{name}</span>
                                    </div>
                                    <button className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-700 tracking-widest">Takip Et</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
