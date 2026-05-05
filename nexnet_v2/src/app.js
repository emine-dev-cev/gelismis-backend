import { store } from './store/index.js';
import { AuthService, PostService, UserService } from './services/api.js';

// Pages
import FeedPage from './pages/Feed.js';
import ProfilePage from './pages/Profile.js';
import LoginPage from './pages/Login.js';
import ExplorePage from './pages/Explore.js';
import NotificationsPage from './pages/Notifications.js';

// Layouts
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import RightPanel from './components/RightPanel.js';

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        window.addEventListener('popstate', () => this.render());
        
        // Initial setup
        this.init();
    }

    async init() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await AuthService.getMe();
                store.dispatch({ type: 'SET_USER', payload: res.data });
            } catch (err) { 
                localStorage.removeItem('token'); 
                store.dispatch({ type: 'SET_USER', payload: null });
            }
        }
        this.render();
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.render();
        window.scrollTo(0, 0);
    }

    render() {
        const path = window.location.pathname;
        const state = store.getState();

        // Auth Guard
        if (!state.isAuthenticated && (path !== '/login' && path !== '/register')) {
            this.renderPage(this.appElement, '/login');
            return;
        }

        this.appElement.innerHTML = '';
        
        if (state.isAuthenticated) {
            const layout = document.createElement('div');
            layout.className = 'min-h-screen bg-vibrant-bg';
            layout.innerHTML = `
                ${Navbar()}
                <div class="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_350px] gap-8 pt-24 pb-12">
                    <div class="hidden md:block">${Sidebar(path)}</div>
                    <div id="page-content" class="w-full max-w-[700px] mx-auto"></div>
                    <div class="hidden lg:block">${RightPanel()}</div>
                </div>
            `;
            this.appElement.appendChild(layout);
            this.renderPage(document.getElementById('page-content'), path);
        } else {
            this.renderPage(this.appElement, path);
        }
        
        lucide.createIcons();
    }

    renderPage(container, path) {
        if (path === '/v2/login') container.innerHTML = LoginPage();
        else if (path === '/v2/explore') container.innerHTML = ExplorePage();
        else if (path === '/v2/notifications') container.innerHTML = NotificationsPage();
        else if (path.includes('/profile')) container.innerHTML = ProfilePage();
        else container.innerHTML = FeedPage();
    }

    // --- FUNCTIONAL HANDLERS ---

    async handleLike(postId) {
        const state = store.getState();
        const posts = [...state.posts];
        const postIndex = posts.findIndex(p => p.id === postId);
        
        // Optimistic UI Update
        if (postIndex > -1) {
            posts[postIndex] = { ...posts[postIndex], likes_count: (posts[postIndex].likes_count || 0) + 1 };
            store.dispatch({ type: 'SET_POSTS', payload: posts });
            this.render();
        }

        try {
            await PostService.like(postId);
            // Real data sync
            const res = await PostService.getAll();
            store.dispatch({ type: 'SET_POSTS', payload: res.data });
        } catch (err) {
            console.error('Like failed', err);
            this.init(); // Rollback on error
        }
    }

    async handleFollow(username) {
        try {
            await UserService.follow(username);
            const res = await AuthService.getMe();
            store.dispatch({ type: 'SET_USER', payload: res.data });
            this.render();
        } catch (err) { alert('Follow failed'); }
    }

    async handleCreatePost() {
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        if (!title || !content) return;

        store.dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await PostService.create({ title, content });
            const res = await PostService.getAll();
            store.dispatch({ type: 'SET_POSTS', payload: res.data });
            this.navigate('/'); // Back to feed
        } catch (err) { alert('Post creation failed'); }
        store.dispatch({ type: 'SET_LOADING', payload: false });
    }

    logout() {
        localStorage.removeItem('token');
        location.reload();
    }
}

window.nexNet = new App();
export default window.nexNet;
