import { create } from 'https://cdn.skypack.dev/zustand';

// Prenses Tema Verileri (Elite Versiyon)
export const PRINCESS_THEMES = {
    Rapunzel: {
        name: 'Rapunzel',
        primary: '#8B5CF6',
        bg: '#FDFCFE',
        avatar: '/v2/assets/themes/rapunzel_avatar.png',
        banner: '/v2/assets/themes/rapunzel_post_tower.png'
    },
    Elsa: {
        name: 'Elsa',
        primary: '#0EA5E9',
        bg: '#F0F9FF',
        avatar: '/v2/assets/themes/elsa_portrait.png',
        banner: '/v2/assets/themes/elsa_portrait.png'
    },
    Ariel: {
        name: 'Ariel',
        primary: '#0D9488',
        bg: '#F0FDFA',
        avatar: '/v2/assets/themes/ariel_avatar.png',
        banner: '/v2/assets/themes/ariel_post_castle.png'
    }
};

export const useStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || { username: 'Emine' },
    isAuthenticated: !!localStorage.getItem('token'),
    theme: PRINCESS_THEMES.Rapunzel,
    
    // Actions
    setUser: (user) => {
        const theme = PRINCESS_THEMES[user.username] || PRINCESS_THEMES.Rapunzel;
        set({ user, theme, isAuthenticated: true });
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.clear();
    }
}));
