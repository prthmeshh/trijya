import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Shield, LogOut, Users, BookOpen, PlusCircle, Edit3, Eye, Trash2,
    Search, ExternalLink, X, CheckCircle2, AlertCircle,
    Calendar, User, Image, Sparkles, RefreshCw, Layers
} from 'lucide-react';
import { authors } from '../data/sampleData';
import { getWorks, createWork, updateWork, deleteWork } from '../services/api';

const CATEGORIES = [
    { key: 'Poetry', marathi: 'कविता / कथा / ललित लेख' },
    { key: 'Drama', marathi: 'अनुवादित साहित्य' },
    { key: 'Translations', marathi: 'पुस्तक परीक्षण' },
    { key: 'All', marathi: 'शोधनिबंध / समीक्षा लेख' }
];

const PRESET_IMAGES = [
    { label: 'काव्य / रात्रीचे आकाश', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800' },
    { label: 'निसर्ग / पायवाट', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
    { label: 'पुस्तके / अभ्यास', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800' },
    { label: 'ग्रंथालय / चिंतन', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800' },
    { label: 'साहित्य / जुनी पाने', url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800' },
    { label: 'लेखणी व कागद', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800' }
];

const defaultFormState = {
    title: '',
    titleEnglish: '',
    authorId: '1',
    authorName: 'डॉ. अनुराधा देशपांडे',
    category: 'Poetry',
    categoryMarathi: 'कविता / कथा / ललित लेख',
    publishDate: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'
};

const AdminPanelPage = () => {
    const navigate = useNavigate();
    const [authInfo, setAuthInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Works state
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

    // Modal state
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState(null); // null means new work
    const [formData, setFormData] = useState(defaultFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }

    // Delete confirmation modal
    const [workToDelete, setWorkToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Custom author toggle
    const [isCustomAuthor, setIsCustomAuthor] = useState(false);

    // Authentication check
    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth) {
            try {
                const authData = JSON.parse(auth);
                if (authData.authenticated) {
                    setAuthInfo(authData);
                    setIsAuthenticated(true);
                } else {
                    navigate('/admin');
                }
            } catch (e) {
                navigate('/admin');
            }
        } else {
            navigate('/admin');
        }
    }, [navigate]);

    // Load works from API
    const loadWorks = async () => {
        setIsLoading(true);
        try {
            const data = await getWorks();
            setWorks(data);
        } catch (err) {
            console.error('Failed to load works:', err);
            showNotification('error', 'साहित्य लोड करताना त्रुटी आली');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadWorks();
        }
    }, [isAuthenticated]);

    // Show temporary toast notification
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 4000);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        navigate('/admin');
    };

    // Open Modal for Create
    const handleOpenCreateModal = () => {
        setEditingWork(null);
        setIsCustomAuthor(false);
        setFormData({
            ...defaultFormState,
            publishDate: new Date().toISOString().split('T')[0]
        });
        setIsFormModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEditModal = (work) => {
        setEditingWork(work);
        const matchedAuthor = authors.find(a => a.id === work.authorId);
        setIsCustomAuthor(!matchedAuthor && Boolean(work.authorName));
        setFormData({
            title: work.title || '',
            titleEnglish: work.titleEnglish || '',
            authorId: work.authorId || (matchedAuthor ? matchedAuthor.id : 'custom'),
            authorName: work.authorName || matchedAuthor?.name || '',
            category: work.category || 'Poetry',
            categoryMarathi: (work.categoryMarathi === 'कविता' || work.category === 'Poetry') ? 'कविता / कथा / ललित लेख' : (work.categoryMarathi || 'कविता / कथा / ललित लेख'),
            publishDate: work.publishDate ? work.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
            excerpt: work.excerpt || '',
            content: work.content || '',
            coverImage: work.coverImage || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'
        });
        setIsFormModalOpen(true);
    };

    // Form input handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            const matched = CATEGORIES.find(c => c.key === value);
            setFormData(prev => ({
                ...prev,
                category: value,
                categoryMarathi: matched ? matched.marathi : prev.categoryMarathi
            }));
        } else if (name === 'authorSelect') {
            if (value === 'custom') {
                setIsCustomAuthor(true);
                setFormData(prev => ({ ...prev, authorId: 'custom', authorName: '' }));
            } else {
                setIsCustomAuthor(false);
                const author = authors.find(a => a.id === value);
                setFormData(prev => ({
                    ...prev,
                    authorId: value,
                    authorName: author ? author.name : prev.authorName
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            showNotification('error', 'साहित्याचे शीर्षक आवश्यक आहे');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            ...formData,
            title: formData.title.trim(),
            titleEnglish: formData.titleEnglish.trim(),
            authorName: (formData.authorName || 'त्रिज्या लेखक').trim(),
            excerpt: formData.excerpt.trim() || formData.content.slice(0, 100) + '...',
            content: formData.content.trim(),
            coverImage: formData.coverImage.trim()
        };

        try {
            if (editingWork) {
                // Update
                const result = await updateWork(editingWork.id, payload);
                setWorks(prev => prev.map(w => String(w.id) === String(editingWork.id) ? result.work : w));
                showNotification('success', `"${payload.title}" साहित्य यशस्वीरित्या अद्ययावत केले!`);
            } else {
                // Create
                const result = await createWork(payload);
                setWorks(prev => [result.work, ...prev]);
                showNotification('success', `"${payload.title}" साहित्य मुख्य पृष्ठावर प्रकाशित झाले!`);
            }
            setIsFormModalOpen(false);
        } catch (err) {
            console.error('Error submitting work:', err);
            showNotification('error', err.message || 'कृती पूर्ण करताना त्रुटी आली');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Confirm Delete
    const handleDeleteConfirm = async () => {
        if (!workToDelete) return;
        setIsDeleting(true);
        try {
            await deleteWork(workToDelete.id);
            setWorks(prev => prev.filter(w => String(w.id) !== String(workToDelete.id)));
            showNotification('success', `"${workToDelete.title}" साहित्य यशस्वीरित्या हटवले गेले`);
            setWorkToDelete(null);
        } catch (err) {
            console.error('Error deleting work:', err);
            showNotification('error', err.message || 'साहित्य हटवताना त्रुटी आली');
        } finally {
            setIsDeleting(false);
        }
    };

    // Filtered works
    const filteredWorks = useMemo(() => {
        return works.filter(w => {
            const matchesCategory = selectedCategoryFilter === 'ALL' || w.category === selectedCategoryFilter || (selectedCategoryFilter === 'Poetry' && (w.category === 'कविता' || w.category === 'Short Stories' || w.category === 'कथा' || w.categoryMarathi === 'कविता' || w.categoryMarathi === 'कथा' || w.categoryMarathi === 'कविता/कथा/ललित लेख' || w.categoryMarathi === 'कविता / कथा / ललित लेख'));
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q ||
                (w.title && w.title.toLowerCase().includes(q)) ||
                (w.titleEnglish && w.titleEnglish.toLowerCase().includes(q)) ||
                (w.authorName && w.authorName.toLowerCase().includes(q)) ||
                (w.excerpt && w.excerpt.toLowerCase().includes(q));

            return matchesCategory && matchesSearch;
        });
    }, [works, selectedCategoryFilter, searchQuery]);

    // Statistics counts
    const stats = useMemo(() => {
        const total = works.length;
        const poetry = works.filter(w => w.category === 'Poetry' || w.category === 'Short Stories' || w.category === 'कथा' || w.categoryMarathi === 'कविता' || w.categoryMarathi === 'कथा' || w.categoryMarathi === 'कविता/कथा/ललित लेख' || w.categoryMarathi === 'कविता / कथा / ललित लेख').length;
        const drama = works.filter(w => w.category === 'Drama' || w.categoryMarathi === 'अनुवादित साहित्य').length;
        const others = total - (poetry + drama);
        return { total, poetry, drama, others };
    }, [works]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
            <Helmet>
                <title>साहित्य व्यवस्थापन | Admin Panel - त्रिज्या</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="fixed top-5 right-5 z-[99999] max-w-md shadow-2xl rounded-xl overflow-hidden"
                    >
                        <div className={`p-4 flex items-center gap-3 text-white ${
                            notification.type === 'success'
                                ? 'bg-gradient-to-r from-emerald-600 to-green-700'
                                : 'bg-gradient-to-r from-red-600 to-rose-700'
                        }`}>
                            {notification.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            )}
                            <p className="text-sm font-semibold">{notification.message}</p>
                            <button
                                onClick={() => setNotification(null)}
                                className="ml-auto text-white/80 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Admin Header */}
            <header className="bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000] text-white shadow-xl sticky top-0 z-30 border-b border-[#D4AF37]/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/50 shadow-inner">
                                <Shield className="w-6 h-6 text-[#FFD700]" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-lg sm:text-xl font-bold tracking-wide">त्रिज्या Admin Panel</h1>
                                    <span className="hidden sm:inline-block text-[11px] bg-[#D4AF37] text-[#8B0000] font-bold px-2 py-0.5 rounded-full">
                                        साहित्य संपादक
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-amber-100/80">साहित्य व्यवस्थापन व थेट प्रकाशन</p>
                                    {authInfo?.email && (
                                        <span className="hidden md:inline-block text-[11px] bg-black/25 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/30">
                                            {authInfo.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link
                                to="/works"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs sm:text-sm font-medium transition-all border border-white/20 hover:border-[#D4AF37]"
                                title="साहित्य मुख्य पृष्ठ पाहा"
                            >
                                <ExternalLink className="w-4 h-4 text-[#FFD700]" />
                                <span className="hidden sm:inline">साहित्य पृष्ठ पाहा</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-950/70 text-rose-200 hover:text-white rounded-lg text-xs sm:text-sm font-medium transition-all border border-red-400/30"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">बाहेर पडा</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
                
                {/* Top Banner & Quick Add Callout */}
                <div className="bg-gradient-to-br from-white to-[#FFF8E7] rounded-2xl p-5 sm:p-6 shadow-md border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">📚</span>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#8B0000]">
                                साहित्य व्यवस्थापन (Literature CMS)
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600">
                            येथे भरलेली माहिती थेट <strong>/works</strong> साहित्य पृष्ठावर आणि मुख्य पृष्ठावर तात्काळ दिसेल.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={loadWorks}
                            disabled={isLoading}
                            className="p-2.5 bg-white text-gray-700 hover:text-[#8B0000] rounded-xl border border-gray-200 hover:border-[#D4AF37] shadow-sm transition-all flex items-center justify-center cursor-pointer"
                            title="रिफ्रेश करा"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#8B0000]' : ''}`} />
                        </button>

                        <button
                            onClick={handleOpenCreateModal}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] hover:from-[#720000] hover:to-[#8B0000] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border border-[#D4AF37]/50 cursor-pointer"
                        >
                            <PlusCircle className="w-5 h-5 text-[#FFD700]" />
                            <span>+ नवीन साहित्य जोडा</span>
                        </button>
                    </div>
                </div>

                {/* Live Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#D4AF37]/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">एकूण साहित्य</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-[#8B0000] mt-1">{stats.total}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
                                <BookOpen className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-emerald-300 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">कविता / कथा / ललित लेख</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{stats.poetry}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                                <Sparkles className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-amber-300 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">अनुवादित साहित्य</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-1">{stats.drama}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                                <Layers className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-purple-300 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">शोधनिबंध व इतर</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-purple-700 mt-1">{stats.others}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/80 space-y-3">
                    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="शीर्षक, लेखक किंवा मजकुराद्वारे शोधा..."
                                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category filter count */}
                        <div className="text-xs sm:text-sm text-gray-500 font-medium px-1 flex items-center justify-between">
                            <span>
                                एकूण सापडले: <strong className="text-[#8B0000] font-bold">{filteredWorks.length}</strong>
                            </span>
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs sm:text-sm">
                        <button
                            onClick={() => setSelectedCategoryFilter('ALL')}
                            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                                selectedCategoryFilter === 'ALL'
                                    ? 'bg-[#8B0000] text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            सर्व ({works.length})
                        </button>
                        {CATEGORIES.map(cat => {
                            const count = works.filter(w => w.category === cat.key || (cat.key === 'Poetry' && (w.category === 'Short Stories' || w.category === 'कथा' || w.categoryMarathi === 'कविता' || w.categoryMarathi === 'कथा' || w.categoryMarathi === 'कविता/कथा/ललित लेख' || w.categoryMarathi === 'कविता / कथा / ललित लेख'))).length;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setSelectedCategoryFilter(cat.key)}
                                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                                        selectedCategoryFilter === cat.key
                                            ? 'bg-[#8B0000] text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat.marathi} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Works Table / Card Listing */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                            <div className="w-8 h-8 border-3 border-[#8B0000] border-t-transparent rounded-full animate-spin mb-3"></div>
                            <p className="text-sm font-medium">साहित्य लोड होत आहे...</p>
                        </div>
                    ) : filteredWorks.length === 0 ? (
                        <div className="py-16 text-center px-4">
                            <div className="w-16 h-16 mx-auto mb-4 bg-amber-50 text-[#8B0000] rounded-full flex items-center justify-center">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">कोणतेही साहित्य सापडले नाही</h3>
                            <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                                {searchQuery
                                    ? `"${searchQuery}" या शोधासाठी कोणतेही साहित्य उपलब्ध नाही.`
                                    : 'या विभागात सध्या साहित्य उपलब्ध नाही. कृपया नवीन साहित्य जोडा.'}
                            </p>
                            <button
                                onClick={handleOpenCreateModal}
                                className="px-4 py-2 bg-[#8B0000] text-white text-sm font-semibold rounded-lg hover:bg-[#700000] transition-colors"
                            >
                                + नवीन साहित्य जोडा
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/80 text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        <th className="py-3.5 px-4 sm:px-6">साहित्य / कव्हर</th>
                                        <th className="py-3.5 px-4 hidden md:table-cell">श्रेणी</th>
                                        <th className="py-3.5 px-4">लेखक</th>
                                        <th className="py-3.5 px-4 hidden sm:table-cell">प्रकाशन दिनांक</th>
                                        <th className="py-3.5 px-4 sm:px-6 text-right">क्रिया (Actions)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {filteredWorks.map((work) => {
                                        return (
                                            <tr
                                                key={work.id}
                                                className="hover:bg-amber-50/40 transition-colors group"
                                            >
                                                {/* Cover & Title */}
                                                <td className="py-3.5 px-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 relative shadow-xs">
                                                            <img
                                                                src={work.coverImage || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'}
                                                                alt={work.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800';
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="min-w-0 max-w-xs sm:max-w-md">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-bold text-gray-900 group-hover:text-[#8B0000] transition-colors truncate">
                                                                    {work.title}
                                                                </h4>
                                                                <span className="md:hidden text-[10px] bg-amber-100 text-[#8B0000] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                                                                    {(work.category === 'Poetry' || work.category === 'Short Stories' || work.categoryMarathi === 'कविता' || work.categoryMarathi === 'कथा') ? 'कविता / कथा / ललित लेख' : (work.categoryMarathi || work.category)}
                                                                </span>
                                                            </div>
                                                            {work.titleEnglish && (
                                                                <p className="text-xs text-gray-400 italic truncate">{work.titleEnglish}</p>
                                                            )}
                                                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                                                {work.excerpt || (work.content ? work.content.slice(0, 80) : '')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Category */}
                                                <td className="py-3.5 px-4 hidden md:table-cell whitespace-nowrap">
                                                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#8B0000] border border-[#D4AF37]/30">
                                                        {(work.category === 'Poetry' || work.category === 'Short Stories' || work.categoryMarathi === 'कविता' || work.categoryMarathi === 'कथा') ? 'कविता / कथा / ललित लेख' : (work.categoryMarathi || work.category)}
                                                    </span>
                                                </td>

                                                {/* Author */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5 text-gray-700">
                                                        <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                        <span className="font-medium text-xs sm:text-sm">
                                                            {work.authorName || 'त्रिज्या लेखक'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Publish Date */}
                                                <td className="py-3.5 px-4 hidden sm:table-cell text-xs text-gray-500 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                        <span>
                                                            {work.publishDate
                                                                ? new Date(work.publishDate).toLocaleDateString('mr-IN', {
                                                                      day: 'numeric',
                                                                      month: 'short',
                                                                      year: 'numeric'
                                                                  })
                                                                : 'उपलब्ध नाही'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-1">
                                                        {/* View on Site */}
                                                        <Link
                                                            to={`/work/${work.id}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="वेबसाईटवर पाहा"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>

                                                        {/* Edit */}
                                                        <button
                                                            onClick={() => handleOpenEditModal(work)}
                                                            className="p-1.5 text-gray-500 hover:text-[#8B0000] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                                            title="संपादित करा"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            onClick={() => setWorkToDelete(work)}
                                                            className="p-1.5 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                            title="हटवा"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer instructions */}
                <div className="bg-amber-50/70 border border-[#D4AF37]/30 rounded-xl p-4 text-xs text-[#5D4037] flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p>
                        💡 <strong>टीप:</strong> साहित्य जोडल्यानंतर किंवा अपडेट केल्यानंतर ते त्वरित मुख्य संकेतस्थळावर (
                        <Link to="/works" target="_blank" className="text-[#8B0000] underline font-semibold">
                            /works
                        </Link>
                        ) प्रकाशित होते.
                    </p>
                    <span className="text-[11px] text-gray-400">त्रिज्या साहित्य मासिक CMS v2.0</span>
                </div>
            </main>

            {/* ============================================================== */}
            {/* ADD / EDIT LITERATURE MODAL DIALOG                              */}
            {/* ============================================================== */}
            <AnimatePresence>
                {isFormModalOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSubmitting && setIsFormModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37]/40 w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 flex flex-col my-auto"
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white px-5 sm:px-6 py-4 flex items-center justify-between z-20 shadow-md">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-[#D4AF37]/50">
                                        <BookOpen className="w-4 h-4 text-[#FFD700]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg">
                                            {editingWork ? 'साहित्य संपादन करा' : 'नवीन साहित्य जोडा'}
                                        </h3>
                                        <p className="text-[11px] text-amber-100/80">
                                            {editingWork ? `ID: ${editingWork.id}` : 'तपशील भरा व मुख्य पृष्ठावर प्रकाशित करा'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => !isSubmitting && setIsFormModalOpen(false)}
                                    className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body Form */}
                            <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 space-y-5">
                                
                                {/* Row 1: Title & English Title */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                            साहित्याचे शीर्षक (मराठी) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="उदा. आकाशातील तारे, गावातली वाट..."
                                            required
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                            इंग्रजी शीर्षक (पर्यायी)
                                        </label>
                                        <input
                                            type="text"
                                            name="titleEnglish"
                                            value={formData.titleEnglish}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Stars in the Sky"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Category & Publish Date */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                            साहित्य श्रेणी (Category) <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat.key} value={cat.key}>
                                                    {cat.marathi} ({cat.key})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                            प्रकाशन दिनांक (Publish Date) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="publishDate"
                                            value={formData.publishDate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Author Select / Custom Name */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                            लेखक निवडा (Select Author)
                                        </label>
                                        <select
                                            name="authorSelect"
                                            value={isCustomAuthor ? 'custom' : formData.authorId}
                                            onChange={handleInputChange}
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                                        >
                                            {authors.map(a => (
                                                <option key={a.id} value={a.id}>
                                                    {a.name}
                                                </option>
                                            ))}
                                            <option value="custom">✏️ इतर / नवीन लेखक नाव टाका</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                            लेखकाचे नाव (Author Name) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="authorName"
                                            value={formData.authorName}
                                            onChange={handleInputChange}
                                            placeholder="लेखकाचे नाव प्रविष्ट करा"
                                            required
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Cover Image with Quick Presets */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                        <span>कव्हर फोटो URL (Cover Image URL)</span>
                                        <span className="text-[11px] text-gray-400 font-normal">किंवा खालीलपैकी एक निवडा</span>
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <div className="relative flex-1">
                                            <Image className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                            <input
                                                type="url"
                                                name="coverImage"
                                                value={formData.coverImage}
                                                onChange={handleInputChange}
                                                placeholder="https://images.unsplash.com/..."
                                                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        {formData.coverImage && (
                                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
                                                <img
                                                    src={formData.coverImage}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Preset Quick Image Badges */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {PRESET_IMAGES.map((preset, idx) => (
                                            <button
                                                type="button"
                                                key={idx}
                                                onClick={() => setFormData(p => ({ ...p, coverImage: preset.url }))}
                                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border ${
                                                    formData.coverImage === preset.url
                                                        ? 'bg-[#8B0000] text-white border-[#8B0000]'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
                                                }`}
                                            >
                                                📷 {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Row 5: Excerpt / Summary */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                        संक्षिप्त सारांश (Short Excerpt)
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        rows={2}
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        placeholder="मुख्य पृष्ठावरील कार्डवर दिसणारा २-३ ओळींचा सारांश..."
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all resize-y"
                                    />
                                </div>

                                {/* Row 6: Full Literature Content */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                                        संपूर्ण साहित्य मजकूर (Full Content / Poem / Article) <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="content"
                                        rows={8}
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="येथे संपूर्ण कविता, कथा किंवा शोधनिबंधाचा मजकूर प्रविष्ट करा..."
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] focus:bg-white focus:border-transparent outline-none transition-all font-serif resize-y"
                                    />
                                </div>

                                {/* Modal Actions */}
                                <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => setIsFormModalOpen(false)}
                                        className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-sm transition-all"
                                    >
                                        रद्द करा (Cancel)
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2.5 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] hover:from-[#720000] hover:to-[#8B0000] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>जतन होत आहे...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                                                <span>{editingWork ? 'बदल जतन करा' : 'साहित्य प्रकाशित करा'}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ============================================================== */}
            {/* DELETE CONFIRMATION DIALOG                                     */}
            {/* ============================================================== */}
            <AnimatePresence>
                {workToDelete && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isDeleting && setWorkToDelete(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-red-200 z-10 space-y-4"
                        >
                            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                                <Trash2 className="w-6 h-6" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-bold text-gray-900">
                                    साहित्य हटवायचे आहे का?
                                </h3>
                                <p className="text-sm text-gray-500">
                                    तुम्ही <strong>"{workToDelete.title}"</strong> हे साहित्य कायमचे हटवू इच्छिता? ही कृती पूर्ववत केली जाऊ शकत नाही.
                                </p>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    disabled={isDeleting}
                                    onClick={() => setWorkToDelete(null)}
                                    className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                                >
                                    रद्द करा
                                </button>
                                <button
                                    disabled={isDeleting}
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'होय, हटवा'
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanelPage;
