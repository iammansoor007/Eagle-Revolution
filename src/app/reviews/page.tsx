"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Icon } from "../../config/icons";
import { useContent } from "../../hooks/useContent";

// ============================================================================
// CONSTANTS
// ============================================================================
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=450&fit=crop&q=80";

const getVideoThumbnail = (videoId: string) => 
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

// ============================================================================
// SMOOTH COUNTER
// ============================================================================
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        
        let start = 0;
        const step = value / 60;
        const timer = setInterval(() => {
            start += step;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        
        return () => clearInterval(timer);
    }, [inView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================
const TestimonialCard = ({ 
    testimonial, 
    index,
    onPlay 
}: { 
    testimonial: any; 
    index: number;
    onPlay?: (id: string, title: string) => void;
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/5 hover:border-primary/20 transition-all duration-300"
        >
            {/* Quote */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-5xl sm:text-6xl text-primary/10 font-serif">"</div>
            
            {/* Stars */}
            <div className="flex gap-0.5 mb-4 sm:mb-6">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                    </svg>
                ))}
            </div>

            {/* Content */}
            <p className="text-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 line-clamp-6">
                {testimonial.text}
            </p>

            {/* Author */}
            <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-white/5">
                <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground text-sm sm:text-base truncate">
                        {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {testimonial.position}, {testimonial.company}
                    </p>
                </div>

                {testimonial.videoId && onPlay && (
                    <button
                        onClick={() => onPlay(testimonial.videoId, testimonial.name)}
                        className="ml-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all flex-shrink-0 group/btn"
                        aria-label="Play video testimonial"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover/btn:text-white transition-colors ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    </button>
                )}
            </div>
        </motion.div>
    );
};

// ============================================================================
// VIDEO CARD
// ============================================================================
const VideoCard = ({ video, index, onClick }: { video: any; index: number; onClick: () => void }) => {
    const [error, setError] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="cursor-pointer group"
            onClick={onClick}
        >
            <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-muted/20">
                <img
                    src={error ? FALLBACK_IMAGE : getVideoThumbnail(video.videoId)}
                    alt={video.title}
                    onError={() => setError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 group-hover:bg-primary group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black group-hover:text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    </div>
                </div>

                <span className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-black/70 backdrop-blur-sm rounded text-white text-[10px] sm:text-xs font-medium">
                    {video.duration}
                </span>
            </div>

            <h4 className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {video.title}
            </h4>
        </motion.div>
    );
};

// ============================================================================
// STAT CARD
// ============================================================================
const StatCard = ({ value, label, suffix = "", index }: { value: number; label: string; suffix?: string; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="text-center p-3 sm:p-4"
        >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 sm:mb-2">
                <Counter value={value} suffix={suffix} />
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                {label}
            </div>
        </motion.div>
    );
};

// ============================================================================
// VIDEO MODAL
// ============================================================================
const VideoModal = ({ isOpen, onClose, videoId, title }: { isOpen: boolean; onClose: () => void; videoId: string; title: string }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/95 backdrop-blur-xl"
                    onClick={onClose}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Close video"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-5xl aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ============================================================================
// SUCCESS MODAL
// ============================================================================
const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-card w-full max-w-sm rounded-2xl p-6 sm:p-8 text-center shadow-2xl border border-white/10"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Thank You!</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Your testimonial has been submitted successfully.
                        </p>

                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ============================================================================
// FORM MODAL
// ============================================================================
const FormModal = ({ isOpen, onClose, onSubmit, isSubmitting }: any) => {
    const [form, setForm] = useState({
        name: "", email: "", company: "", position: "", rating: 5, testimonial: ""
    });
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative bg-card w-full max-w-lg rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border border-white/10 my-4"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close form"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 pr-6">Share Your Experience</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <input
                                type="text"
                                placeholder="Company"
                                value={form.company}
                                onChange={e => setForm({ ...form, company: e.target.value })}
                                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                value={form.position}
                                onChange={e => setForm({ ...form, position: e.target.value })}
                                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm text-muted-foreground mb-2">Rating</label>
                            <div className="flex gap-1 sm:gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setForm({ ...form, rating: star })}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none p-1"
                                    >
                                        <svg
                                            className={`w-6 h-6 sm:w-7 sm:h-7 transition-all ${(hoverRating >= star || form.rating >= star) ? "text-primary scale-110" : "text-muted-foreground/30"}`}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            placeholder="Your testimonial..."
                            rows={4}
                            value={form.testimonial}
                            onChange={e => setForm({ ...form, testimonial: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary/50 transition-colors resize-none"
                            required
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                        </button>

                        <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                            Submitting will open your email client
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function TestimonialsPage() {
    const { testimonials: data } = useContent();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    
    const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { section, testimonials = [], videos = [], stats = {} } = data || {};
    
    // Safe stats with proper fallbacks
    const safeStats = {
        reviews: (stats as any)?.totalReviews || 150,
        rating: (stats as any)?.averageRating || 5.0,
        customers: (stats as any)?.subscribers || 500,
        videos: (stats as any)?.totalVideos || 8,
    };

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    const handleSubmit = async (formData: any) => {
        setIsSubmitting(true);
        
        try {
            const subject = encodeURIComponent(`Testimonial - ${formData.name}`);
            const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Position: ${formData.position}
Rating: ${formData.rating}/5

${formData.testimonial}
            `);
            window.location.href = `mailto:banderson@eaglerevolution.com?subject=${subject}&body=${body}`;
            setShowForm(false);
            setShowSuccess(true);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main ref={containerRef} className="relative min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
                <motion.div style={{ y, opacity }} className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-primary/5 rounded-full blur-[80px] sm:blur-[120px]" />
                </motion.div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium tracking-wider text-primary uppercase bg-primary/5 rounded-full border border-primary/10 mb-4 sm:mb-6 md:mb-8">
                            {section?.badge || "Testimonials"}
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6">
                            <span className="text-foreground">What Our</span>
                            <br className="sm:hidden" />
                            <span className="sm:inline"> </span>
                            <span className="text-primary">Customers Say</span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-sm sm:max-w-md md:max-w-xl mx-auto mb-6 sm:mb-8 md:mb-12 px-4">
                            {section?.description || "Real stories from people who've experienced the difference"}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-2xl sm:text-3xl font-bold text-foreground">
                                    <Counter value={safeStats.rating} />
                                </span>
                                <div className="text-left">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-xs sm:text-sm text-muted-foreground">{safeStats.reviews}+ reviews</span>
                                </div>
                            </div>
                            <div className="hidden sm:block w-px h-8 md:h-12 bg-white/10" />
                            <div className="block sm:hidden w-20 h-px bg-white/10 my-1" />
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                Share Your Story
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                        {[
                            { value: safeStats.reviews, label: "Reviews", suffix: "+" },
                            { value: safeStats.rating, label: "Rating", suffix: "" },
                            { value: safeStats.customers, label: "Customers", suffix: "+" },
                            { value: safeStats.videos, label: "Video Stories", suffix: "+" },
                        ].map((stat, i) => (
                            <StatCard key={i} {...stat} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-primary/3 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        {testimonials.slice(0, 4).map((item: any, i: number) => (
                            <TestimonialCard
                                key={i}
                                testimonial={item}
                                index={i}
                                onPlay={(id, title) => setSelectedVideo({ id, title })}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Videos Section */}
            {videos.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-8 sm:mb-10 md:mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
                                Watch <span className="text-primary">Customer Stories</span>
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Hear directly from our customers
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                            {videos.map((item: any, i: number) => (
                                <VideoCard
                                    key={i}
                                    video={item}
                                    index={i}
                                    onClick={() => setSelectedVideo({ id: item.videoId, title: item.title })}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 text-center">
                <div className="max-w-xl sm:max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to share your story?</h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                        Join hundreds of satisfied customers and tell us about your experience
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Write a Testimonial
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                    <a
                        href="https://g.page/r/eaglerevolution"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                        <Icon name="Google" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Read all reviews on Google
                    </a>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <span>Veteran Owned</span>
                        <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                        <span>{safeStats.rating} ★ Rating</span>
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoId={selectedVideo?.id || ""}
                title={selectedVideo?.title || ""}
            />

            <FormModal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />

            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
            />
        </main>
    );
}