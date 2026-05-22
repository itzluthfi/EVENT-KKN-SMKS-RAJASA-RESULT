import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MediaItem = ({ item, className, onClick }) => {
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const options = { root: null, rootMargin: '50px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setIsInView(entry.isIntersecting));
        }, options);

        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;
            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) videoRef.current.oncanplay = resolve;
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{ opacity: isBuffering ? 0.8 : 1, transition: 'opacity 0.2s' }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url}
            alt={item.title}
            className={`${className} object-cover cursor-pointer`}
            onClick={onClick}
            loading="lazy"
            decoding="async"
        />
    );
};

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="fixed inset-0 w-full h-[100dvh] backdrop-blur-2xl bg-white/20 dark:bg-black/40 z-[9999] flex flex-col justify-center items-center"
            >
                <div className="absolute inset-0" onClick={onClose} />
                
                <div className="w-full max-w-5xl px-4 flex flex-col items-center justify-center relative pointer-events-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedItem.id}
                            className="relative w-full aspect-[16/9] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto border border-black/5 dark:border-white/10"
                            initial={{ y: 20, scale: 0.97, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } }}
                            exit={{ y: 20, scale: 0.97, opacity: 0, transition: { duration: 0.15 } }}
                        >
                            <MediaItem item={selectedItem} className="w-full h-full object-contain bg-slate-900/10 dark:bg-black/50" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white text-lg sm:text-2xl font-bold">{selectedItem.title}</h3>
                                <p className="text-white/80 text-sm sm:text-base mt-1">{selectedItem.desc}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.button
                    className="absolute top-4 right-4 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md transition-all border border-white/10 z-[10000]"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className="w-5 h-5" />
                </motion.button>
            </motion.div>

            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed z-[10000] left-1/2 bottom-8 -translate-x-1/2 touch-none"
            >
                <motion.div className="relative rounded-2xl bg-white/30 dark:bg-slate-900/40 backdrop-blur-2xl border border-black/10 dark:border-white/20 shadow-2xl p-2 cursor-grab active:cursor-grabbing flex gap-2">
                    {mediaItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                            }}
                            className={`relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group ${
                                selectedItem.id === item.id ? 'ring-2 ring-emerald-500 shadow-xl' : 'opacity-60 hover:opacity-100 hover:ring-2 hover:ring-white/50'
                            }`}
                            initial={{ rotate: index % 2 === 0 ? -5 : 5 }}
                            animate={{
                                scale: selectedItem.id === item.id ? 1.1 : 1,
                                rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -5 : 5,
                                y: selectedItem.id === item.id ? -10 : 0,
                            }}
                            whileHover={{ scale: 1.15, rotate: 0, y: -8 }}
                        >
                            <MediaItem item={item} className="w-full h-full pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </>
    );
};

const InteractiveBentoGallery = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-10 text-center">
                <motion.h2
                    className="text-2xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[120px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative overflow-hidden rounded-2xl cursor-move shadow-sm border border-black/5 dark:border-white/5 ${item.span}`}
                                onClick={() => !isDragging && setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: { y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 } }
                                }}
                                whileHover={{ scale: 1.02 }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={1}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={(e, info) => {
                                    setIsDragging(false);
                                    const moveDistance = info.offset.x + info.offset.y;
                                    if (Math.abs(moveDistance) > 50) {
                                        const newItems = [...items];
                                        const draggedItem = newItems[index];
                                        const targetIndex = moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
                                        newItems.splice(index, 1);
                                        newItems.splice(targetIndex, 0, draggedItem);
                                        setItems(newItems);
                                    }
                                }}
                            >
                                <MediaItem item={item} className="absolute inset-0 w-full h-full pointer-events-none" />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <h3 className="relative text-white text-sm md:text-lg font-bold">{item.title}</h3>
                                    <p className="relative text-white/80 text-xs mt-1 line-clamp-2">{item.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
