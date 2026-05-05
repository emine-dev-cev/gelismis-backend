export default function RegisterPage() {
    return `
    <div class="min-h-screen flex items-center justify-center p-4 bg-slate-950">
        <div class="w-full max-w-md relative">
            <div class="text-center mb-10">
                <div class="inline-flex w-16 h-16 bg-primary rounded-2xl items-center justify-center mb-4 shadow-2xl shadow-primary/40">
                    <i data-lucide="zap" class="text-white w-8 h-8"></i>
                </div>
                <h1 class="text-4xl font-extrabold text-white tracking-tight">NexNet</h1>
                <p class="text-slate-500 mt-2">Join the future of networking</p>
            </div>

            <div class="glass rounded-[2.5rem] p-8 shadow-2xl">
                <h2 class="text-2xl font-bold text-white mb-6">Create Account</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Username</label>
                        <input type="text" id="reg-user" placeholder="Choose a username" 
                            class="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Email</label>
                        <input type="email" id="reg-email" placeholder="email@example.com" 
                            class="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
                        <input type="password" id="reg-pass" placeholder="••••••••" 
                            class="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    </div>
                    <button onclick="window.nexNet.handleRegister()" 
                        class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 transform active:scale-[0.98] mt-4">
                        Get Started
                    </button>
                </div>
                
                <p class="text-center text-slate-500 mt-8 text-sm">
                    Already a member? <button onclick="window.nexNet.navigate('/login')" class="text-primary font-bold hover:underline">Sign in instead</button>
                </p>
            </div>
        </div>
    </div>
    `;
}
