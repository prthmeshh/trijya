import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // ✅ import
import HomePage from './pages/HomePage';
import WorksListing from './pages/WorksListing';
import WorkDetail from './pages/WorkDetail';
import AuthorsDirectory from './pages/AuthorsDirectory';
import AuthorProfile from './pages/AuthorProfile';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPanelPage from './pages/AdminPanelPage';
import SearchResults from './pages/SearchResults';
import { Toaster } from './components/ui/toaster';

// Layout wrapper to conditionally show header/footer
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Helmet>
        <title>Sahitya Sagar - Marathi Literary Journal</title>
        <meta name="description" content="Celebrating the rich heritage of Marathi literature through poetry, stories, essays, and cultural narratives" />
      </Helmet>
      <div className={`min-h-screen ${isAdminRoute ? 'bg-gray-100' : 'bg-gradient-to-br from-[#F5E6D3] via-[#FFF8E7] to-[#F5E6D3]'} flex flex-col`}>
        {!isAdminRoute && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/works" element={<WorksListing />} />
            <Route path="/work/:id" element={<WorkDetail />} />
            <Route path="/authors" element={<AuthorsDirectory />} />
            <Route path="/author/:id" element={<AuthorProfile />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/panel" element={<AdminPanelPage />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
        <Toaster />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;
