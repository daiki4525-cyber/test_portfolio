"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Users, MessageCircle, Eye, Heart, Star, Sparkles, Crown, Menu } from 'lucide-react';



export default function App() {
    const [viewers, setViewers] = useState(1247);
    
    useEffect(() => {
        const viewerTimer = setInterval(() => {
            setViewers(prev => prev + Math.floor(Math.random() * 5) - 1);
        }, 3000);
        return () => clearInterval(viewerTimer);
    }, []);


    return (
    <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
            <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-gray-900/30">
            <div className="md:px-4 md:py-6">
                {/* 女の子の待機画面 */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative md:rounded-3xl overflow-hidden mb-6 shadow-2xl shadow-purple-900/50"
                >
                <div className="relative aspect-video">
                    <ImageWithFallback
                    src="https://images.unsplash.com/photo-1748015879337-ef95556c3749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc3R1ZGlvfGVufDF8fHx8MTc2NzY4NTI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="配信者"
                    className="w-full h-full object-cover"
                    />
                    
                    {/* グラデーションオーバーレイ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/30 to-black/40" />
                    
                    {/* 待機中の人数 */}
                    <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-pink-400/30"
                    >
                    <Users className="w-5 h-5 text-pink-300" />
                    <span className="text-white font-semibold">{viewers.toLocaleString()}</span>
                    <span className="text-pink-200 text-sm">待機中</span>
                    </motion.div>

                    {/* まもなく開始メッセージ */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        まもなく開始
                        </h2>
                    </motion.div>
                    </div>

                    {/* キラキラエフェクト */}
                    <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-1/4 w-20 h-20 bg-pink-500/20 rounded-full blur-3xl"
                    />
                    <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
                    />
                </div>
                </motion.div>

                {/* アイコンと配信タイトル */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-3 mb-4 px-4"
                >
                <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-400 p-1">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-2xl">
                        💕
                    </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    VIP
                    </div>
                </div>
                
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-white mb-1">
                    夜のおしゃべり配信 ✨
                    </h1>
                    <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium border border-pink-400/30">
                        雑談
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-400/30">
                        癒し系
                    </span>
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium flex items-center gap-1 border border-pink-400/30">
                        <Star className="w-3 h-3 fill-pink-400" />
                        初見さん歓迎
                    </span>
                    </div>
                </div>
                </motion.div>

                {/* チャット入出とのぞき入出のボタン */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 gap-3 mb-6 px-4"
                >
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/30 transition-all"
                >
                    <motion.div
                    animate={{
                        x: ['-100%', '100%']
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    <div className="relative flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>チャット入室</span>
                    </div>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-purple-500/30 transition-all border-2 border-white/20"
                >
                    <div className="relative flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>のぞき入室</span>
                    </div>
                </motion.button>
                </motion.div>

                {/* 女の子の情報 */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-black/40 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-pink-500/20 mx-4"
                >
                <div className="flex items-start justify-between mb-5">
                    <div>
                    <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                        さくら
                        <span className="text-pink-400">♡</span>
                    </h2>
                    <p className="text-pink-300 text-sm">@sakura_chan</p>
                    </div>
                    
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-md text-sm"
                    >
                    <Heart className="w-4 h-4" />
                    フォロー
                    </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-400/20">
                    <div className="text-xl font-bold text-pink-300 mb-1">12.5K</div>
                    <div className="text-xs text-gray-400">フォロワー</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/20">
                    <div className="text-xl font-bold text-pink-300 mb-1 flex items-center justify-center gap-1">
                        <Heart className="w-4 h-4 fill-pink-400" />
                        8.2K
                    </div>
                    <div className="text-xs text-gray-400">いいね</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-400/20">
                    <div className="text-xl font-bold text-purple-300 mb-1">156</div>
                    <div className="text-xs text-gray-400">配信回数</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                    <h3 className="text-sm font-semibold text-pink-200 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        自己紹介
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                        こんにちは！さくらです🌸 毎晩21時から雑談配信してます✨
                        みんなと楽しくおしゃべりしたいな💕 初見さんも大歓迎です！
                    </p>
                    </div>

                    <div>
                    <h3 className="text-sm font-semibold text-pink-200 mb-2">配信スケジュール</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-lg text-xs border border-pink-400/30">
                        月・水・金 21:00〜
                        </span>
                        <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-xs border border-purple-400/30">
                        土曜日 20:00〜
                        </span>
                    </div>
                    </div>
                </div>
                </motion.div>
                </div>
            </div>
        </main>

        <Footer />
        </div>
    );
}

