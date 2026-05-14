import axios from 'https://cdn.skypack.dev/axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5001/api',
    headers: { 'Content-Type': 'application/json' }
});

// Otomatik Token Ekleme
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Global Hata Yönetimi
api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/v4/';
        }
        return Promise.reject(err);
    }
);

export const PostService = {
    getAll: () => api.get('/posts/'),
    create: (data) => {
        const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
        return api.post('/posts/', data, config);
    },
    like: (id) => api.post(`/posts/${id}/like`),
    comment: (id, text) => api.post(`/posts/${id}/comment`, { text })
};

export const AuthService = {
    login: (creds) => api.post('/login', creds),
    register: (data) => api.post('/register', data),
    getMe: () => api.get('/users/me')
};

export default api;
