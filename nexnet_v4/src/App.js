import { PostService, AuthService } from './services/api.js';
import { useStore } from './store/index.js';

const { useState, useEffect } = React;

// --- COMPONENTS ---
const Navbar = ({ onNavigate }) => {
    const { user, logout } = useStore();
    return html`
        <nav class="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
            <div class="max-w-screen-md mx-auto px-4 h-14 flex items-center justify-between">
                <div class="text-xl font-bold text-blue-600 cursor-pointer" onClick=${() => onNavigate('feed')}>NexNet</div>
                <div class="flex items-center gap-6 text-sm font-medium">
                    <button onClick=${() => onNavigate('feed')}>Akış</button>
                    <button onClick=${() => onNavigate('profile')}>Profil</button>
                    <button class="text-red-500" onClick=${logout}>Çıkış</button>
                </div>
            </div>
        </nav>
    `;
};

const PostCard = ({ post }) => {
    const { updatePost } = useStore();
    const handleLike = async () => {
        try {
            const res = await PostService.like(post.id);
            updatePost(post.id, { likes_count: res.data.likes_count });
        } catch (err) { console.error(err); }
    };

    return html`
        <div class="card p-5 mb-6">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                    ${post.author_username[0].toUpperCase()}
                </div>
                <div>
                    <div class="font-bold text-sm">@${post.author_username}</div>
                    <div class="text-[11px] text-slate-400">${new Date(post.created_at).toLocaleDateString('tr-TR')}</div>
                </div>
            </div>
            <h3 class="font-bold text-lg mb-2">${post.title}</h3>
            <p class="text-slate-600 text-sm mb-4 leading-relaxed">${post.content}</p>
            ${post.image_url && html`<img src="${post.image_url}" class="w-full rounded-lg mb-4" />`}
            <div class="flex items-center gap-6 border-t border-slate-50 pt-4">
                <button class="text-sm font-semibold text-slate-400 flex items-center gap-1 hover:text-blue-500" onClick=${handleLike}>
                    Like (${post.likes_count || 0})
                </button>
                <button class="text-sm font-semibold text-slate-400 hover:text-blue-500">Yorum Yap</button>
            </div>
        </div>
    `;
};

// --- PAGES ---
const LoginPage = () => {
    const { setUser } = useStore();
    const [formData, setFormData] = useState({ username: '', password: '' });
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await AuthService.login(formData);
            localStorage.setItem('token', res.data.access_token);
            setUser(res.data.user);
        } catch (err) { alert('Hatalı giriş!'); }
    };

    return html`
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="card p-8 w-full max-w-sm">
                <h1 class="text-2xl font-bold mb-6 text-center">Tekrar Hoş Geldin</h1>
                <form class="space-y-4" onSubmit=${handleLogin}>
                    <input class="input-field" placeholder="Kullanıcı Adı" onChange=${e => setFormData({...formData, username: e.target.value})} />
                    <input class="input-field" type="password" placeholder="Şifre" onChange=${e => setFormData({...formData, password: e.target.value})} />
                    <button class="btn-primary w-full py-3" type="submit">Giriş Yap</button>
                </form>
            </div>
        </div>
    `;
};

const FeedPage = () => {
    const { posts, setPosts, addPost, loading, setLoading } = useStore();
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const res = await PostService.getAll();
            setPosts(res.data);
        };
        fetch();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('content', newPost.content);
        if (image) formData.append('image', image);

        try {
            const res = await PostService.create(formData);
            addPost(res.data);
            setNewPost({ title: '', content: '' });
            setImage(null);
            setPreview(null);
        } catch (err) {
            console.error(err);
            alert('Paylaşım yapılamadı!');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return html`
        <div class="pt-20 pb-12 max-w-screen-md mx-auto px-4">
            <form class="card p-5 mb-8" onSubmit=${handleCreate}>
                <input class="input-field mb-3" placeholder="Başlık..." value=${newPost.title} onChange=${e => setNewPost({...newPost, title: e.target.value})} required />
                <textarea class="input-field mb-4 h-24" placeholder="Ne düşünüyorsun?" value=${newPost.content} onChange=${e => setNewPost({...newPost, content: e.target.value})} required></textarea>
                
                ${preview && html`<img src="${preview}" class="w-full h-48 object-cover rounded-lg mb-4" />`}
                
                <div class="flex items-center justify-between">
                    <label class="flex items-center gap-2 text-sm font-semibold text-blue-600 cursor-pointer hover:text-blue-700">
                        <input type="file" class="hidden" accept="image/*" onChange=${handleFileChange} />
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                        </svg>
                        Resim Ekle
                    </label>
                    <button class="btn-primary px-8 py-2" type="submit">Paylaş</button>
                </div>
            </form>
            <div>
                ${loading ? html`<div class="text-center py-10 text-slate-400">Yükleniyor...</div>` : posts.map(p => html`<${PostCard} key=${p.id} post=${p} />`)}
            </div>
        </div>
    `;
};

// --- APP CORE ---
const App = () => {
    const { user } = useStore();
    const [view, setView] = useState('feed');

    if (!user) return html`<${LoginPage} />`;

    return html`
        <div>
            <${Navbar} onNavigate=${setView} />
            ${view === 'feed' ? html`<${FeedPage} />` : html`<div class="pt-20 px-4 text-center">Profil sayfası çok yakında!</div>`}
        </div>
    `;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(html`<${App} />`);
