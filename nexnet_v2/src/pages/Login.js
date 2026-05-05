export default function LoginPage() {
    return `
    <div class="min-h-screen flex items-center justify-center p-4 bg-vibrant-bg relative overflow-hidden">
        <!-- Abstract Shapes for UI Depth -->
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"></div>

        <div class="w-full max-w-md relative">
            <div class="text-center mb-10">
                <div class="inline-flex w-16 h-16 bg-main-gradient rounded-[1.5rem] items-center justify-center mb-6 shadow-2xl shadow-primary/40 rotate-6">
                    <i data-lucide="zap" class="text-white w-8 h-8"></i>
                </div>
                <h1 class="text-4xl font-black bg-main-gradient bg-clip-text text-transparent tracking-tighter">NexNet V2</h1>
                <p class="text-slate-500 font-bold mt-2">Where vibrant souls meet.</p>
            </div>

            <div class="vibrant-card p-10 bg-white/70 backdrop-blur-2xl border-white">
                <h2 class="text-2xl font-black text-slate-800 mb-8">Ready to shine?</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Your Username</label>
                        <input type="text" id="login-user" placeholder="vibrant_user" 
                            class="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all font-bold">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Secret Code</label>
                        <input type="password" id="login-pass" placeholder="••••••••" 
                            class="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all font-bold">
                    </div>
                    <button onclick="window.nexNet.handleLogin()" 
                        class="w-full bg-main-gradient text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 transform active:scale-[0.97] transition-all mt-4">
                        Launch Experience
                    </button>
                </div>
            </div>
            
            <p class="text-center text-slate-400 mt-10 text-xs font-bold">
                Not vibrant yet? <button class="text-primary font-black hover:underline">Join the network</button>
            </p>
        </div>
    </div>
    `;
}
