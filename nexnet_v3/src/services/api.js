import axios from 'https://cdn.skypack.dev/axios';

const API_BASE_URL = 'http://127.0.0.1:5001/api';

// Professional Axios Instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Global Request Interceptor (Auth Token ekleme)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global Response Interceptor (Hata Yönetimi)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Bir ağ hatası oluştu';
        console.error('🚀 API Error:', message);
        // Burada Toast notification tetiklenebilir
        return Promise.reject(error);
    }
);

export const PostService = {
    getAll: () => api.get('/posts/'),
    create: (data) => api.post('/posts/', data),
    like: (id) => api.post(`/posts/${id}/like`),
};

export const UserService = {
    login: (creds) => api.post('/login', creds),
    getProfile: (id) => api.get(`/users/${id}`),
    follow: (id) => api.post(`/users/${id}/follow`),
};

export default api;
