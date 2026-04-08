"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Home, Layout, TreePine, Building2, Building, Droplets, 
  ArrowRight, Star, Shield, Clock, Award, Users, CheckCircle,
  Phone, Calendar, ArrowUpRight, Play, ChevronRight
} from 'lucide-react';
import servicesData from '../../src/data/completeData.json';

import roofingImg from '@/assets/portfolio1.png';
import windowsImg from '@/assets/portfolio2.jpg';
import decksImg from '@/assets/portfolio3.jpg';
import commercialImg from '@/assets/portfolio4.jpg';
import sidingImg from '@/assets/portfolio5.jpg';
import heroBg from '@/assets/bgfair.jpg';

const iconMap = { Home, Layout, TreePine, Building2, Building, Droplets };

const imageMap = {
  'Residential Roofing': roofingImg,
  'Windows & Doors': windowsImg,
  'Custom Decks': decksImg,
  'Commercial Roofing': commercialImg,
  'Siding, Soffit & Fascia': sidingImg,
  'Gutters & Protection': sidingImg,
};

// Premium Service Card Component
const ServiceCard = ({ service, index }) => {
  const IconComponent = iconMap[service.icon] || Home;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/services/${service.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white transition-all duration-700 ease-out group-hover:shadow-2xl group-hover:shadow-black/10 group-hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image 
                src={service.image} 
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>
            
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            
            {/* Top Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="px-4 py-2 bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold rounded-full tracking-wider shadow-lg"
              >
                {service.tag}
              </motion.span>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl"
              >
                <IconComponent className="w-6 h-6 text-gray-900" />
              </motion.div>
            </div>
            
            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 z-10">
              <motion.div
                animate={{ y: isHovered ? 0 : 0, opacity: 1 }}
                className="space-y-4"
              >
                <h3 className="text-3xl font-bold text-white leading-tight tracking-tight">
                  {service.title}
                </h3>
                
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    height: isHovered ? 'auto' : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <span className="inline-flex items-center text-white font-semibold text-sm group/link">
                    <span className="relative">
                      Discover More
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-white scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, label, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
        {isInView ? value : '0'}{suffix}
      </div>
      <div className="text-white/50 text-sm uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const titleY = useTransform(scrollY, [0, 500], [0, 100]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.6, 0.9]);
  
  const services = servicesData.services.services.map(service => ({
    ...service,
    slug: service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    image: imageMap[service.title] || roofingImg
  }));

  return (
    <main className="bg-white">
      {/* Hero Section - Cinematic */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={heroBg} 
            alt="Premium Exterior Solutions" 
            fill 
            className="object-cover object-center"
            priority
            quality={100}
          />
        </motion.div>
        
        {/* Dynamic Overlay */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"
        />
        
        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity, y: titleY }}
          className="relative z-20 w-full max-w-[1600px] mx-auto px-6 lg:px-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 mb-12">
              <div className="w-12 h-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-white fill-white" />
                <span className="text-white/80 text-sm font-medium tracking-[0.3em] uppercase">
                  Veteran Owned & Operated
                </span>
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="w-12 h-px bg-white/30" />
            </div>
            
            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[1.1] tracking-tight mb-8">
              Crafting
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 mt-4">
                Excellence
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Military precision meets architectural mastery. 
              Transforming homes across St. Louis with uncompromising quality.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="group relative px-12 py-5 bg-white text-gray-900 rounded-full text-lg font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-white/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
              
              <Link
                href="tel:636-449-9714"
                className="group flex items-center gap-3 px-8 py-5 text-white/80 hover:text-white transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg">636-449-9714</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Stats Section */}
      <section className="relative -mt-32 z-30 px-6 lg:px-20 pb-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15+', label: 'Years of Excellence' },
              { value: '2.5K', label: 'Projects Delivered' },
              { value: '50+', label: 'Expert Craftsmen' },
              { value: '4.9', label: 'Client Rating' }
            ].map((stat, idx) => (
              <AnimatedCounter key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Grid Section */}
      <section className="px-6 lg:px-20 pb-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-px bg-gray-300" />
              <span className="text-gray-500 text-sm font-medium tracking-[0.2em] uppercase">
                Our Expertise
              </span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight max-w-3xl">
                Premium Exterior
                <span className="block text-gray-400">Solutions</span>
              </h2>
              
              <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                Comprehensive services delivered with precision and care, 
                backed by industry-leading warranties and military-grade standards.
              </p>
            </div>
          </motion.div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-40 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        
        {/* Animated Gradient */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/20 blur-3xl"
        />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary text-sm font-bold tracking-[0.3em] uppercase mb-8">
              Limited Time Offer
            </span>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-8">
              Ready to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                Transform
              </span>
            </h2>
            
            <p className="text-white/50 text-xl max-w-2xl mx-auto mb-12">
              Schedule your free consultation today and receive 15% off your project 
              plus a comprehensive estimate with no obligation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="group relative px-14 py-6 bg-white text-gray-900 rounded-full text-lg font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-white/30"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Free Estimate
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-0.5 transition-all duration-500" />
                </span>
              </Link>
              
              <Link
                href="tel:636-449-9714"
                className="px-14 py-6 border border-white/20 rounded-full text-white text-lg font-medium hover:bg-white/5 transition-all duration-500"
              >
                Call 636-449-9714
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}