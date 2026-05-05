const API_URL = 'http://127.0.0.1:5001/api';
let token = localStorage.getItem('token');
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        initApp();
    }
});

async function initApp() {
    await fetchCurrentUser();
    showFeed();
    loadSuggestions();
}

async function fetchCurrentUser() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            currentUser = await response.json();
            updateSidebar();
        } else {
            logout();
        }
    } catch (err) { console.error(err); }
}

function updateSidebar() {
    document.getElementById('profile-name').innerText = `@${currentUser.username}`;
    document.getElementById('follower-count').innerText = currentUser.followers_count || 0;
    document.getElementById('following-count').innerText = currentUser.following_count || 0;
    document.getElementById('welcome-msg').innerText = `Hi, ${currentUser.username}`;
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            token = data.access_token;
            localStorage.setItem('token', token);
            initApp();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (err) { console.error(err); }
}

function showFeed() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('feed-section').classList.remove('hidden');
    document.getElementById('sidebar').classList.remove('hidden');
    document.getElementById('nav-user').classList.remove('hidden');
    loadPosts();
}

async function loadPosts(query = '') {
    try {
        const url = query ? `${API_URL}/posts/search?q=${query}` : `${API_URL}/posts/`;
        const response = await fetch(url);
        const posts = await response.json();
        renderPosts(posts);
    } catch (err) { console.error(err); }
}

function renderPosts(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'card post';
        postEl.innerHTML = `
            <div class="post-header">
                <div class="avatar"></div>
                <div>
                    <div class="username">@${post.author_username}</div>
                    <div class="post-time">${new Date(post.created_at).toLocaleString()}</div>
                </div>
                ${currentUser && currentUser.username !== post.author_username ? 
                    `<button class="btn btn-sm" onclick="followUser('${post.author_username}')" style="margin-left: auto; font-size: 0.7rem; border: 1px solid var(--primary)">Follow</button>` : ''}
            </div>
            <h3 style="margin: 0.5rem 0">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <div class="post-actions">
                <div class="action-btn" onclick="likePost(${post.id})">❤️ ${post.likes_count || 0}</div>
                <div class="action-btn" onclick="toggleComments(${post.id})">💬 ${post.comments_count || 0}</div>
            </div>
            <div id="comments-${post.id}" class="comment-section hidden">
                <div id="comment-list-${post.id}"></div>
                <div class="comment-input-group">
                    <input type="text" id="input-${post.id}" placeholder="Add a comment...">
                    <button class="btn btn-primary" onclick="addComment(${post.id})">Send</button>
                </div>
            </div>
        `;
        container.appendChild(postEl);
    });
}

async function searchPosts(e) {
    const query = e.target.value;
    if (query.length > 2 || query.length === 0) {
        loadPosts(query);
    }
}

async function toggleComments(postId) {
    const section = document.getElementById(`comments-${postId}`);
    section.classList.toggle('hidden');
    if (!section.classList.contains('hidden')) {
        // In a real app, we'd fetch comments here. 
        // For now, let's assume they are part of post or fetch them.
    }
}

async function addComment(postId) {
    const content = document.getElementById(`input-${postId}`).value;
    if (!content) return;

    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comment`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });
        if (response.ok) {
            document.getElementById(`input-${postId}`).value = '';
            loadPosts();
        }
    } catch (err) { console.error(err); }
}

async function followUser(username) {
    try {
        const response = await fetch(`${API_URL}/users/${username}/follow`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            alert(`Now following @${username}`);
            fetchCurrentUser();
        }
    } catch (err) { console.error(err); }
}

async function loadSuggestions() {
    // Placeholder for suggested users
    const container = document.getElementById('user-suggestions');
    container.innerHTML = '<p style="font-size: 0.8rem; color: var(--text-dim)">Search for users to follow!</p>';
}

function logout() {
    localStorage.removeItem('token');
    location.reload();
}
