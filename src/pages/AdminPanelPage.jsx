import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Shield, LogOut, Users, BookOpen, FileText, ImageIcon,
    Settings, BarChart3, PlusCircle, Edit, Eye, Trash2,
    TrendingUp, Clock, Mail, AlertCircle
} from 'lucide-react';

const AdminPanelPage = () => {
    const navigate = useNavigate();
    const [authInfo, setAuthInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication
        const auth = sessionStorage.getItem('adminAuth');
        if (auth) {
            const authData = JSON.parse(auth);
            // Check if session is still valid (1 hour)
            if (authData.authenticated && Date.now() - authData.timestamp < 3600000) {
                setAuthInfo(authData);
                setIsAuthenticated(true);
            } else {
                // Session expired
                sessionStorage.removeItem('adminAuth');
                navigate('/admin');
            }
        } else {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        navigate('/admin');
    };

    // Dashboard stats
    const stats = [
        { label: 'एकूण साहित्य', value: '124', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
        { label: 'लेखक', value: '32', icon: Users, color: 'from-green-500 to-green-600' },
        { label: 'गॅलरी फोटो', value: '48', icon: ImageIcon, color: 'from-purple-500 to-purple-600' },
        { label: 'आजचे भेटी', value: '256', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
    ];

    // Quick actions
    const quickActions = [
        { label: 'नवीन साहित्य जोडा', icon: PlusCircle, to: '#', color: 'bg-[#8B0000]' },
        { label: 'लेखक व्यवस्थापित करा', icon: Users, to: '#', color: 'bg-[#2D5016]' },
        { label: 'गॅलरी अपडेट करा', icon: ImageIcon, to: '/gallery', color: 'bg-purple-600' },
        { label: 'सेटिंग्ज', icon: Settings, to: '#', color: 'bg-gray-600' },
    ];

    // Recent activity (sample)
    const recentActivity = [
        { action: 'नवीन कविता जोडली', user: 'Admin', time: '5 मिनिटांपूर्वी', type: 'add' },
        { action: 'लेखक प्रोफाइल अपडेट', user: 'Editor', time: '1 तासापूर्वी', type: 'edit' },
        { action: 'गॅलरी फोटो जोडले', user: 'Admin', time: '2 तासांपूर्वी', type: 'add' },
        { action: 'कथा प्रकाशित केली', user: 'Editor', time: '1 दिवसापूर्वी', type: 'publish' },
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-100"
        >
            <Helmet>
                <title>Admin Panel - त्रिज्या</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Admin Header */}
            <header className="bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">त्रिज्या Admin Panel</h1>
                                <p className="text-sm text-white/70">प्रशासकीय नियंत्रण पॅनल</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm text-white/70">लॉग इन:</p>
                                <p className="text-sm font-medium">{authInfo?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">बाहेर पडा</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#A52A2A] rounded-xl flex items-center justify-center">
                            <Shield className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                स्वागत आहे, Admin! 👋
                            </h2>
                            <p className="text-gray-600">
                                त्रिज्या मराठी साहित्य मासिकाचे व्यवस्थापन करा
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-[#8B0000]" />
                                द्रुत क्रिया
                            </h3>
                            <div className="space-y-3">
                                {quickActions.map((action, index) => (
                                    <motion.button
                                        key={action.label}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full flex items-center gap-3 p-3 ${action.color} text-white rounded-lg hover:shadow-lg transition-all`}
                                    >
                                        <action.icon className="w-5 h-5" />
                                        <span>{action.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#8B0000]" />
                                अलीकडील क्रियाकलाप
                            </h3>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'add' ? 'bg-green-100 text-green-600' :
                                                activity.type === 'edit' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-purple-100 text-purple-600'
                                            }`}>
                                            {activity.type === 'add' ? <PlusCircle className="w-5 h-5" /> :
                                                activity.type === 'edit' ? <Edit className="w-5 h-5" /> :
                                                    <Eye className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{activity.action}</p>
                                            <p className="text-sm text-gray-500">{activity.user}</p>
                                        </div>
                                        <p className="text-sm text-gray-400">{activity.time}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-gray-500 text-sm"
                >
                    <p>🔒 सुरक्षित Admin Panel | सत्र 1 तासानंतर कालबाह्य होईल</p>
                    <Link to="/" className="text-[#8B0000] hover:underline mt-2 inline-block">
                        ← वेबसाईटवर परत जा
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminPanelPage;
