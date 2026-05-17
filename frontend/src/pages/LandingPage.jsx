// LexGuard Enhanced Landing Page - v2.0
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Brain, Lock, ArrowRight, Sparkles, CheckCircle2, FileSearch, BarChart2, Scale, Sword, FlaskConical, Handshake, Gavel, ClipboardCheck } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="bg-animated-mesh min-h-screen flex flex-col text-white overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 backdrop-blur-xl border-b border-[#2a2a2a] animate-slide-down" style={{ backgroundColor: 'rgba(15, 15, 15, 0.8)' }}>
                <div
                    className="flex items-center space-x-2.5 text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="relative">
                        <Shield className="text-[#FF8F1C]" size={34} strokeWidth={2.5} />
                        <div className="absolute inset-0 blur-lg bg-[#FF8F1C] opacity-30"></div>
                    </div>
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        LexGuard<span className="text-[#9CA3AF] font-light">X</span>
                    </span>
                </div>
                <div className="flex items-center space-x-10 text-sm font-medium">
                    <a href="#features" className="text-[#9CA3AF] hover:text-white transition-colors duration-300 hidden md:block">Features</a>
                    <a href="#agents" className="text-[#9CA3AF] hover:text-white transition-colors duration-300 hidden md:block">AI Agents</a>
                    <button
                        onClick={() => navigate('/signup')}
                        className="btn-secondary px-6 py-2.5 text-sm"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center px-6 lg:px-16 pt-32 pb-20 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#FF8F1C]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl"></div>

                <div className={`max-w-6xl mx-auto text-center space-y-10 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="space-y-8">
                        <div className="inline-block animate-fade-in-scale">
                            <span className="glass-panel px-5 py-2.5 text-xs font-semibold border border-[#FF8F1C]/30 text-[#FF8F1C] inline-flex items-center space-x-2">
                                <Sparkles size={14} />
                                <span>Powered by Advanced AI</span>
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight">
                            <span className="block mb-2">Next-Generation</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF8F1C] via-[#FFB84D] to-[#FF8F1C] bg-[length:200%_auto] animate-[gradientShift_3s_ease_infinite]">
                                Legal Intelligence
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed font-normal">
                            Upload any contract and let <span className="text-white font-semibold">7 specialized AI agents</span> analyze, debate, and advise on critical risks.
                            Get actionable insights in <span className="text-[#FF8F1C] font-semibold">seconds</span>, not hours.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="btn-primary flex items-center justify-center space-x-2 text-base px-10 py-4 group"
                            style={{ animation: 'pulseGlow 4s infinite' }}
                        >
                            <span>Start Free Trial</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn-secondary px-10 py-4 text-base">
                            Watch Demo
                        </button>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex justify-center gap-3 flex-wrap pt-8">
                        {[
                            { icon: '📄', text: 'PDF/DOCX/TXT' },
                            { icon: '⚡', text: 'Real-time Analysis' },
                            { icon: '🎯', text: 'Risk Scoring' },
                            { icon: '🔒', text: 'Enterprise Security' }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="glass-panel px-5 py-2.5 text-sm border border-[#2a2a2a] hover:border-[#FF8F1C]/50 transition-all duration-300 hover:scale-105 cursor-default"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <span className="mr-2">{feature.icon}</span>
                                <span className="font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Social Proof */}
                    <div className="pt-8 flex items-center justify-center space-x-8 text-sm text-[#6B7280]">
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className="text-[#10B981]" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className="text-[#10B981]" />
                            <span>14-day free trial</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="px-6 lg:px-16 py-24 border-t border-[#2a2a2a]" id="features">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Powerful Features
                        </h2>
                        <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                            Everything you need to analyze contracts with confidence and precision
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Brain,
                                title: 'AI-Powered Analysis',
                                desc: 'Deep learning models trained on thousands of legal contracts and documents',
                                color: 'from-purple-500 to-pink-500',
                                iconColor: 'text-purple-400'
                            },
                            {
                                icon: Zap,
                                title: 'Instant Feedback',
                                desc: 'Get comprehensive analysis results in seconds, not hours or days',
                                color: 'from-yellow-500 to-orange-500',
                                iconColor: 'text-yellow-400'
                            },
                            {
                                icon: Lock,
                                title: 'Enterprise Security',
                                desc: 'End-to-end encryption with SOC 2 and GDPR compliance certification',
                                color: 'from-green-500 to-emerald-500',
                                iconColor: 'text-green-400'
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="glass-panel p-8 border border-[#2a2a2a] hover:border-[#FF8F1C]/40 transition-all duration-300 group card-hover"
                                style={{ animationDelay: `${i * 150}ms` }}
                            >
                                <div className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-15 group-hover:opacity-30 transition-opacity duration-300`}></div>
                                    <feature.icon className={`relative z-10 ${feature.iconColor}`} size={28} strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-[#9CA3AF] text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Agents Section */}
            <div className="px-6 lg:px-16 py-24 border-t border-[#2a2a2a]" id="agents">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Powered by 7 AI Agents
                        </h2>
                        <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                            Collaborative intelligence that thinks and debates like a team of legal experts
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
                        {[
                            { name: 'Parser', role: 'Document Analysis', icon: FileSearch, color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
                            { name: 'Analyst', role: 'Risk Assessment', icon: BarChart2, color: '#FF8F1C', bg: 'rgba(255,143,28,0.12)' },
                            { name: 'Prosecutor', role: 'Critical Review', icon: Sword, color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
                            { name: 'Defense', role: 'Counter Arguments', icon: Scale, color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
                            { name: 'Simulator', role: 'Scenario Testing', icon: FlaskConical, color: '#A855F7', bg: 'rgba(168,85,247,0.12)' },
                            { name: 'Negotiator', role: 'Terms Optimization', icon: Handshake, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
                            { name: 'Judge', role: 'Final Verdict', icon: Gavel, color: '#EC4899', bg: 'rgba(236,72,153,0.12)' },
                            { name: 'Auditor', role: 'Compliance Check', icon: ClipboardCheck, color: '#06B6D4', bg: 'rgba(6,182,212,0.12)' },
                        ].map((agent, i) => (
                            <div
                                key={i}
                                className="glass-panel p-6 text-center border border-[#2a2a2a] hover:border-[#FF8F1C]/50 transition-all duration-300 group card-hover"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: agent.bg, border: `1px solid ${agent.color}30` }}
                                >
                                    <agent.icon size={24} style={{ color: agent.color }} strokeWidth={1.8} />
                                </div>
                                <p className="font-bold text-white mb-1">{agent.name}</p>
                                <p className="text-xs text-[#6B7280]">{agent.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="px-6 lg:px-16 py-24 border-t border-[#2a2a2a]">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Ready to Transform<br />Contract Review?
                        </h2>
                        <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                            Join hundreds of legal teams using LexGuard X to streamline their contract analysis
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="btn-primary px-10 py-4 text-base group"
                        >
                            <span>Start Free Trial</span>
                            <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn-secondary px-10 py-4 text-base">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 lg:px-16 py-8 border-t border-[#2a2a2a] text-center">
                <p className="text-sm text-[#6B7280]">
                    © 2026 LexGuard X. All rights reserved. | Built with ❤️ for legal professionals
                </p>
            </div>
        </div>
    );
}
