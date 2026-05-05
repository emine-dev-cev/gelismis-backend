import { create } from 'https://cdn.skypack.dev/zustand';

export const useStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    posts: [],
    loading: false,
    
    // Auth Actions
    setUser: (user) => {
        set({ user });
        localStorage.setItem('user', JSON.stringify(user));
    },
    logout: () => {
        set({ user: null });
        localStorage.clear();
        window.location.href = '/v4/';
    },
    
    // Post Actions
    setPosts: (posts) => set({ posts, loading: false }),
    setLoading: (status) => set({ loading: status }),
    addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
    updatePost: (id, data) => set((state) => ({
        posts: state.posts.map(p => p.id === id ? { ...p, ...data } : p)
    }))
}));
