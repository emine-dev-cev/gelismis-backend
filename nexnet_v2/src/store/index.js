class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }
    getState() { return this.state; }
    dispatch(action) {
        switch (action.type) {
            case 'SET_USER': this.state = { ...this.state, user: action.payload, isAuthenticated: !!action.payload }; break;
            case 'SET_POSTS': this.state = { ...this.state, posts: action.payload }; break;
            case 'SET_STORIES': this.state = { ...this.state, stories: action.payload }; break;
            case 'SET_LOADING': this.state = { ...this.state, loading: action.payload }; break;
            case 'ADD_NOTIFICATION': this.state = { ...this.state, notifications: [action.payload, ...this.state.notifications] }; break;
            default: break;
        }
        this.notify();
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => { this.listeners = this.listeners.filter(l => l !== listener); };
    }
    notify() { this.listeners.forEach(listener => listener(this.state)); }
}

export const store = new Store({
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    posts: [],
    stories: [],
    loading: false,
    notifications: []
});
