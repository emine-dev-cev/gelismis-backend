const API_BASE_URL = 'http://127.0.0.1:5001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const AuthService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getMe: () => api.get('/auth/me')
};

export const PostService = {
    getAll: () => api.get('/posts/'),
    create: (postData) => api.post('/posts/', postData),
    like: (postId) => api.post(`/posts/${postId}/like`),
    comment: (postId, content) => api.post(`/posts/${postId}/comment`, { content }),
};

export const UserService = {
    getProfile: (username) => api.get(`/users/${username}/profile`),
    follow: (username) => api.post(`/users/${username}/follow`),
    unfollow: (username) => api.post(`/users/${username}/unfollow`),
    search: (query) => api.get(`/users/search?q=${query}`)
};

export default api;
