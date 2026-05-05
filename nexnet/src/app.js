import { store } from './store/index.js';
import { AuthService } from './services/api.js';

// Page Components
import FeedPage from './pages/Feed.js';
import LoginPage from './pages/Login.js';
import RegisterPage from './pages/Register.js';
import ProfilePage from './pages/Profile.js';

// Layout Components
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        window.addEventListener('popstate', () => this.render());
        
        // Subscribe to store changes to re-render UI components if needed
        store.subscribe(() => {
            // Check auth status change
            this.handleAuthChange();
        });

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
            }
        }
        this.render();
    }

    handleAuthChange() {
        // Handle global auth state changes
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.render();
    }

    render() {
        const path = window.location.pathname;
        const state = store.getState();

        // Protected Route Logic
        if (!state.isAuthenticated && path !== '/login' && path !== '/register') {
            this.navigate('/login');
            return;
        }

        if (state.isAuthenticated && (path === '/login' || path === '/register')) {
            this.navigate('/');
            return;
        }

        this.appElement.innerHTML = '';

        // Shared Layout
        if (state.isAuthenticated) {
            const layout = document.createElement('div');
            layout.className = 'min-h-screen bg-slate-50 dark:bg-dark';
            layout.innerHTML = `
                ${Navbar()}
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
                    <div class="hidden lg:block w-72">
                        ${Sidebar()}
                    </div>
                    <div class="flex-1 overflow-hidden" id="page-content">
                    </div>
                </div>
            `;
            this.appElement.appendChild(layout);
            this.renderPage(document.getElementById('page-content'), path);
        } else {
            this.renderPage(this.appElement, path);
        }

        // Re-initialize Lucide icons
        lucide.createIcons();
    }

    renderPage(container, path) {
        if (path === '/login') container.innerHTML = LoginPage();
        else if (path === '/register') container.innerHTML = RegisterPage();
        else if (path === '/profile') container.innerHTML = ProfilePage();
        else container.innerHTML = FeedPage();
        
        lucide.createIcons();
    }

    async handleLogin() {
        const username = document.getElementById('login-user').value;
        const password = document.getElementById('login-pass').value;
        try {
            const res = await AuthService.login({ username, password });
            localStorage.setItem('token', res.data.access_token);
            store.dispatch({ type: 'SET_USER', payload: res.data.user });
            this.navigate('/');
        } catch (err) { alert(err.response?.data?.message || 'Login failed'); }
    }

    async handleRegister() {
        const username = document.getElementById('reg-user').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-pass').value;
        try {
            await AuthService.register({ username, email, password });
            alert('Account created! Please login.');
            this.navigate('/login');
        } catch (err) { alert(err.response?.data?.message || 'Registration failed'); }
    }

    async handleCreatePost() {
        const title = document.getElementById('new-post-title').value;
        const content = document.getElementById('new-post-content').value;
        if (!title || !content) return;

        try {
            const res = await PostService.create({ title, content });
            store.dispatch({ type: 'ADD_POST', payload: res.data });
            this.render(); // Force re-render feed
        } catch (err) { alert('Could not create post'); }
    }

    async handleLike(postId) {
        try {
            await PostService.like(postId);
            const res = await PostService.getAll(); // Refresh feed for optimistic update (simplified)
            store.dispatch({ type: 'SET_POSTS', payload: res.data });
            this.render();
        } catch (err) { console.error(err); }
    }

    logout() {
        localStorage.removeItem('token');
        store.dispatch({ type: 'SET_USER', payload: null });
        this.navigate('/login');
    }
}

const nexNet = new App();
window.nexNet = nexNet;
export default nexNet;
