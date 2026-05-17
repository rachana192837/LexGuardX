import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';

export default function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            console.log('Google login successful:', credentialResponse);
            // Here you would send the token to your backend for verification
            localStorage.setItem('googleToken', credentialResponse.access_token);
            navigate('/dashboard');
        },
        onError: () => {
            setError('Failed to login with Google. Please try again.');
        },
    });

    const handleEmailSignup = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        // Simulate signup
        setTimeout(() => {
            localStorage.setItem('userEmail', email);
            setLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="bg-animated-mesh min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-[#FF8F1C]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl"></div>

            <div className={`max-w-lg w-full relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header */}
                <div className="text-center mb-10 space-y-4">
                    <div className="flex items-center justify-center space-x-2.5 mb-6 cursor-pointer hover:opacity-80 transition-opacity group" onClick={() => navigate('/')}>
                        <div className="relative">
                            <Shield className="text-[#FF8F1C] group-hover:scale-110 transition-transform" size={36} strokeWidth={2.5} />
                            <div className="absolute inset-0 blur-lg bg-[#FF8F1C] opacity-30"></div>
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            LexGuard<span className="text-[#9CA3AF] font-light">X</span>
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white">Create Account</h2>
                    <p className="text-[#9CA3AF] text-lg">Join the future of legal AI analysis</p>
                </div>

                {/* Main Card */}
                <div className="glass-panel p-10 border-2 border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-300 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm flex items-center space-x-3 animate-fade-in-scale shadow-lg shadow-red-500/10">
                            <AlertTriangle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Google Login Button */}
                    <button
                        onClick={() => handleGoogleLogin()}
                        className="w-full mb-8 flex items-center justify-center space-x-3 bg-white text-black font-semibold py-4 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="flex-1 h-px bg-[#2a2a2a]"></div>
                        <span className="text-[#6B7280] text-xs font-semibold tracking-wider">OR CONTINUE WITH EMAIL</span>
                        <div className="flex-1 h-px bg-[#2a2a2a]"></div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleEmailSignup} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#9CA3AF] mb-2.5">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#FF8F1C] transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    className="input-field pl-12 bg-[#0f0f0f] border-2 border-[#2a2a2a] focus:border-[#FF8F1C] rounded-xl"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#9CA3AF] mb-2.5">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#FF8F1C] transition-colors" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12 bg-[#0f0f0f] border-2 border-[#2a2a2a] focus:border-[#FF8F1C] rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#9CA3AF] mb-2.5">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#FF8F1C] transition-colors" size={20} />
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12 bg-[#0f0f0f] border-2 border-[#2a2a2a] focus:border-[#FF8F1C] rounded-xl"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
                                >
                                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 mt-8 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold group"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-[#9CA3AF] text-sm mt-8">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-[#FF8F1C] hover:text-[#FF7A00] font-semibold transition-colors"
                        >
                            Sign In
                        </button>
                    </p>
                </div>

                {/* Footer Text */}
                <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-center space-x-6 text-sm text-[#6B7280]">
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className="text-[#10B981]" />
                            <span>Free 14-day trial</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} className="text-[#10B981]" />
                            <span>No credit card</span>
                        </div>
                    </div>
                    <p className="text-center text-xs text-[#6B7280]">
                        By signing up, you agree to our <span className="text-[#9CA3AF] hover:text-white cursor-pointer transition-colors">Terms of Service</span> and <span className="text-[#9CA3AF] hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
