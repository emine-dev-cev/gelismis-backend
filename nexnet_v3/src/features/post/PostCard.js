import React from 'https://cdn.skypack.dev/react';
import { motion } from 'https://cdn.skypack.dev/framer-motion';
import { PostService } from '../../services/api.js';

export default function PostCard({ post }) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [likes, setLikes] = React.useState(post.likes_count || 0);

    const handleLike = async () => {
        // Optimistic UI: Backend cevabı gelmeden arayüzü güncelle
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
        
        try {
            await PostService.like(post.id);
        } catch (err) {
            // Hata olursa geri al (Rollback)
            setIsLiked(isLiked);
            setLikes(likes);
        }
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group"
        >
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={post.author_avatar || '/v2/assets/themes/rapunzel_avatar.png'} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-50 shadow-sm" />
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">@{post.author_username}</h4>
                        <span className="text-[10px] text-slate-400 font-medium tracking-tight">Kraliyet Üyesi</span>
                    </div>
                </div>
            </div>

            <div className="px-10 py-6">
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight leading-tight">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{post.content}</p>
                
                {post.image_url && (
                    <div className="rounded-[2rem] overflow-hidden border border-slate-50 shadow-inner group-hover:shadow-md transition-shadow">
                        <img src={post.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                )}
            </div>

            <div className="px-10 pb-8 flex items-center gap-8">
                <button onClick={handleLike} className="flex items-center gap-2 group/btn">
                    <motion.div 
                        whileTap={{ scale: 1.5 }}
                        className={`p-2.5 rounded-2xl ${isLiked ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-300'} group-hover/btn:bg-rose-50 transition-colors`}
                    >
                        <i data-lucide="heart" className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`}></i>
                    </motion.div>
                    <span className="text-xs font-black text-slate-400">{likes}</span>
                </button>
            </div>
        </motion.div>
    );
}
