export const ELITE_THEMES = {
    Rapunzel: {
        name: 'Rapunzel',
        primary: '#8B5CF6',
        secondary: '#DDD6FE',
        bg: '#FDFCFE',
        text: '#1E1B4B',
        accent: '#F59E0B',
        border: '#EDE9FE',
        shadow: 'rgba(139, 92, 246, 0.08)',
        avatar: 'rapunzel_avatar.png', 
        banner: 'rapunzel_post_tower.png'
    },
    // ... Diğerleri aynı kalacak
    Elsa: {
        name: 'Elsa',
        primary: '#0EA5E9',
        secondary: '#BAE6FD',
        bg: '#F0F9FF',
        text: '#0C4A6E',
        accent: '#F8FAFC',
        border: '#E0F2FE',
        shadow: 'rgba(14, 165, 233, 0.08)',
        avatar: 'elsa_portrait.png',
        banner: 'elsa_portrait.png'
    },
    Ariel: {
        name: 'Ariel',
        primary: '#0D9488',
        secondary: '#99F6E4',
        bg: '#F0FDFA',
        text: '#134E4A',
        accent: '#F43F5E',
        border: '#CCFBF1',
        shadow: 'rgba(13, 148, 136, 0.08)',
        avatar: 'ariel_avatar.png',
        banner: 'ariel_post_castle.png'
    }
};

export const getTheme = (username) => {
    const name = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    if (name === 'Emine' || name === 'Rapunzel') return ELITE_THEMES.Rapunzel;
    if (name === 'Ela' || name === 'Elsa') return ELITE_THEMES.Elsa;
    if (name === 'Lorin' || name === 'Ariel') return ELITE_THEMES.Ariel;
    return ELITE_THEMES.Rapunzel; // Default
};
