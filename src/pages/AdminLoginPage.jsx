import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, ChevronRight, AlertCircle, CheckCircle, Loader2, KeyRound } from 'lucide-react';

// Backend API URL
const API_URL = 'http://localhost:5000/api';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('email'); // 'email', 'otp', 'success'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);

    // Timer for OTP expiry
    useEffect(() => {
        let interval;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    // Handle email submission - Send OTP via backend
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase().trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'OTP पाठवताना त्रुटी आली');
                setLoading(false);
                return;
            }

            setOtpTimer(300); // 5 minutes
            setStep('otp');
            setLoading(false);

        } catch (err) {
            console.error('API Error:', err);
            setError('सर्व्हरशी संपर्क होत नाही. कृपया सर्व्हर चालू असल्याची खात्री करा.');
            setLoading(false);
        }
    };

    // Handle OTP verification via backend
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (otpTimer === 0) {
            setError('OTP कालबाह्य झाला. कृपया पुन्हा प्रयत्न करा.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.toLowerCase().trim(),
                    otp: otp
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'OTP सत्यापित करताना त्रुटी आली');
                setLoading(false);
                return;
            }

            // Success - store auth in sessionStorage
            sessionStorage.setItem('adminAuth', JSON.stringify({
                email: data.email,
                token: data.token,
                authenticated: true,
                timestamp: Date.now()
            }));

            setStep('success');
            setLoading(false);

            // Redirect to admin panel after 2 seconds
            setTimeout(() => {
                navigate('/admin/panel');
            }, 2000);

        } catch (err) {
            console.error('API Error:', err);
            setError('सर्व्हरशी संपर्क होत नाही. कृपया पुन्हा प्रयत्न करा.');
            setLoading(false);
        }
    };

    // Resend OTP via backend
    const handleResendOtp = async () => {
        setLoading(true);
        setOtp('');
        setError('');

        try {
            const response = await fetch(`${API_URL}/auth/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase().trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'OTP पाठवताना त्रुटी आली');
                setLoading(false);
                return;
            }

            setOtpTimer(300);
            setLoading(false);

        } catch (err) {
            console.error('API Error:', err);
            setError('सर्व्हरशी संपर्क होत नाही.');
            setLoading(false);
        }
    };

    // Format timer
    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center py-12 px-4"
        >
            <Helmet>
                <title>Admin Login - त्रिज्या</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="w-full max-w-md">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="text-center mb-8"
                >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#8B0000] to-[#A52A2A] rounded-2xl flex items-center justify-center shadow-xl mb-4">
                        <Shield className="w-10 h-10 text-[#D4AF37]" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#8B0000]">Admin Login</h1>
                    <p className="text-[#5D4037] mt-2">त्रिज्या - प्रशासकीय प्रवेश</p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Progress Steps */}
                    <div className="bg-gradient-to-r from-[#8B0000] to-[#A52A2A] p-4">
                        <div className="flex items-center justify-center gap-4">
                            <div className={`flex items-center gap-2 ${step === 'email' ? 'text-[#D4AF37]' : 'text-white/60'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'email' ? 'bg-[#D4AF37] text-[#8B0000]' : step === 'otp' || step === 'success' ? 'bg-green-500 text-white' : 'bg-white/30'}`}>
                                    {step === 'otp' || step === 'success' ? <CheckCircle className="w-5 h-5" /> : '1'}
                                </div>
                                <span className="text-sm font-medium hidden sm:inline">ई-मेल</span>
                            </div>
                            <div className="w-8 h-0.5 bg-white/30" />
                            <div className={`flex items-center gap-2 ${step === 'otp' ? 'text-[#D4AF37]' : 'text-white/60'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'otp' ? 'bg-[#D4AF37] text-[#8B0000]' : step === 'success' ? 'bg-green-500 text-white' : 'bg-white/30'}`}>
                                    {step === 'success' ? <CheckCircle className="w-5 h-5" /> : '2'}
                                </div>
                                <span className="text-sm font-medium hidden sm:inline">OTP</span>
                            </div>
                            <div className="w-8 h-0.5 bg-white/30" />
                            <div className={`flex items-center gap-2 ${step === 'success' ? 'text-[#D4AF37]' : 'text-white/60'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'success' ? 'bg-[#D4AF37] text-[#8B0000]' : 'bg-white/30'}`}>
                                    3
                                </div>
                                <span className="text-sm font-medium hidden sm:inline">प्रवेश</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {/* Email Step */}
                            {step === 'email' && (
                                <motion.form
                                    key="email"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleEmailSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            अधिकृत ई-मेल पत्ता
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="admin@trijya.in"
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                                        >
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                OTP पाठवा
                                                <ChevronRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}

                            {/* OTP Step */}
                            {step === 'otp' && (
                                <motion.form
                                    key="otp"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleOtpSubmit}
                                    className="space-y-4"
                                >
                                    <div className="text-center mb-4">
                                        <div className="w-16 h-16 mx-auto bg-[#FFF8E7] rounded-full flex items-center justify-center mb-3">
                                            <KeyRound className="w-8 h-8 text-[#8B0000]" />
                                        </div>
                                        <p className="text-gray-600">
                                            OTP पाठवला गेला आहे:
                                        </p>
                                        <p className="font-medium text-[#8B0000]">{email}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            6-अंकी OTP प्रविष्ट करा
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                placeholder="123456"
                                                maxLength={6}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all text-center text-2xl tracking-widest font-mono"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between mt-2 text-sm">
                                            <span className={otpTimer > 60 ? 'text-green-600' : otpTimer > 0 ? 'text-orange-600' : 'text-red-600'}>
                                                ⏱️ {formatTimer(otpTimer)}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleResendOtp}
                                                disabled={loading}
                                                className="text-[#8B0000] hover:underline disabled:opacity-50"
                                            >
                                                पुन्हा OTP पाठवा
                                            </button>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                                        >
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => { setStep('email'); setOtp(''); setError(''); }}
                                            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                                        >
                                            मागे
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading || otp.length !== 6}
                                            className="flex-1 py-3 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    सत्यापित करा
                                                    <ChevronRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {/* Success Step */}
                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4"
                                    >
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-green-600 mb-2">
                                        प्रवेश यशस्वी!
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        Admin Panel वर पुनर्निर्देशित करत आहे...
                                    </p>
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8B0000]" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Info Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center text-sm text-gray-500"
                >
                    <p>🔒 सुरक्षित प्रशासकीय प्रवेश</p>
                    <p className="mt-1">केवळ अधिकृत व्यक्तींसाठी</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminLoginPage;
