import React from 'react';
import {
    Home, Building2, Wrench, Star, Shield, Clock, Mail, Phone,
    MapPin, Calendar, ArrowRight, Check, X, Menu, ChevronDown,
    ChevronRight, ChevronLeft, Facebook, Twitter, Instagram, Linkedin,
    Youtube, Award, Sparkles, Flag, Users, Briefcase, MessageSquare,
    FileText, Image, CreditCard, DollarSign, ThumbsUp, User, Send,
    ClipboardCheck, TreePine, Droplets, Hammer, Sun, CloudRain,
    Layout, Square, Building, Plus, Minus, Search, Infinity,
    Volume2, VolumeX, Play, Pause, ChevronUp
} from 'lucide-react';

export const iconMap: Record<string, any> = {
    Home, Building2, Wrench, Star, Shield, Clock, Mail, Phone,
    MapPin, Calendar, ArrowRight, Check, X, Menu, ChevronDown,
    ChevronRight, ChevronLeft, Facebook, Twitter, Instagram, Linkedin,
    Youtube, Award, Sparkles, Flag, Users, Briefcase, MessageSquare,
    FileText, Image, CreditCard, DollarSign, ThumbsUp, User, Send,
    ClipboardCheck, TreePine, Droplets, Hammer, Sun, CloudRain,
    Layout, Square, Building, Plus, Minus, Search, Infinity,
    Volume2, VolumeX, Play, Pause, ChevronUp
};

// Helper component to render icons - Fixed to properly render React components
export const Icon = ({ name, className = "w-5 h-5", ...props }: {
    name: string;
    className?: string;
    [key: string]: any;
}) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }
    // Render the component properly with props
    return React.createElement(IconComponent, { className, ...props });
};