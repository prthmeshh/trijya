import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop'; // ✅ import
import HomePage from './pages/HomePage';
import WorksListing from './pages/WorksListing';
import WorkDetail from './pages/WorkDetail';
import AuthorsDirectory from './pages/AuthorsDirectory';
import AuthorProfile from './pages/AuthorProfile';
import AboutPage from './pages/AboutPage';
import SearchResults from './pages/SearchResults';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ Add this here */}
      <Helmet>
        <title>Sahitya Sagar - Marathi Literary Journal</title>
        <meta name="description" content="Celebrating the rich heritage of Marathi literature through poetry, stories, essays, and cultural narratives" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#FFF8E7] to-[#F5E6D3]">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksListing />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/authors" element={<AuthorsDirectory />} />
          <Route path="/author/:id" element={<AuthorProfile />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
