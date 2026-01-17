
"use client";

import React from 'react';
import {
    Palette,
    Layout,
    TrendingUp,
    Share2,
    PenTool,
    FileText,
    Sparkles,
    Zap,
    Search,
    Edit2,
    Trash2,
    Loader2,
    X,
    Calendar,
    ChevronRight,
    ArrowRight,
    Briefcase,
    Target,
    BarChart3,
    ExternalLink,
    Clock,
    User,
    ArrowLeft,
    ArrowUpRight,
    Star,
    Globe,
    CheckCircle,
    CheckCircle2,
    Mail,
    Phone,
    Building2,
    RefreshCcw,
    Plus,
    Menu,
    Shield,
    Activity,
    LogOut,
    MessageSquare,
    BookOpen
} from 'lucide-react';

const icons: Record<string, any> = {
    Palette,
    Layout,
    TrendingUp,
    Share2,
    PenTool,
    FileText,
    Sparkles,
    Zap,
    Search,
    Edit2,
    Trash2,
    Loader2,
    X,
    Calendar,
    ChevronRight,
    ArrowRight,
    Briefcase,
    Target,
    BarChart3,
    ExternalLink,
    Clock,
    User,
    ArrowLeft,
    ArrowUpRight,
    Star,
    Globe,
    CheckCircle,
    CheckCircle2,
    Mail,
    Phone,
    Building2,
    RefreshCcw,
    Plus,
    Menu,
    Shield,
    Activity,
    LogOut,
    MessageSquare,
    BookOpen
};

interface IconMapperProps {
    name: string;
    size?: number;
    className?: string;
    strokeWidth?: number;
    fill?: string;
}

const IconMapper: React.FC<IconMapperProps> = ({ name, size = 24, className = "", strokeWidth, fill }) => {
    const IconComponent = icons[name] || Zap;
    return <IconComponent size={size} className={className} strokeWidth={strokeWidth} fill={fill} />;
};

export default IconMapper;
