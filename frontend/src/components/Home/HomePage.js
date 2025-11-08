import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { instituteAPI } from '../../services/api';
import './HomePage.css';

const HomePage = () => {
  const [featuredInstitutes, setFeaturedInstitutes] = useState([]);
  const [stats, setStats] = useState({
    institutes: 0,
    reviews: 0,
    students: 0,
    cities: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      const response = await instituteAPI.getAll();
      const institutes = response.data;
      
      // Set featured institutes (first 6 approved institutes)
      const approvedInstitutes = institutes.filter(inst => inst.status === 'approved');
      setFeaturedInstitutes(approvedInstitutes.slice(0, 6));
      
      // Calculate dynamic stats from actual data
      const uniqueCities = new Set(institutes.map(inst => inst.city)).size;
      
      setStats({
        institutes: institutes.length,
        reviews: Math.floor(institutes.length * 3.5), // Estimated based on institutes
        students: Math.floor(institutes.length * 95), // Estimated students per institute
        cities: uniqueCities
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching institutes:', error);
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Schools', icon: '🏫', count: Math.floor(stats.institutes * 0.35) },
    { name: 'Colleges', icon: '🎓', count: Math.floor(stats.institutes * 0.25) },
    { name: 'Universities', icon: '🏛️', count: Math.floor(stats.institutes * 0.15) },
    { name: 'Coaching Centers', icon: '📚', count: Math.floor(stats.institutes * 0.20) },
    { name: 'Preschools', icon: '👶', count: Math.floor(stats.institutes * 0.05) }
  ];

  const features = [
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Find institutes by location, category, fees, and facilities with advanced filters'
    },
    {
      icon: '⭐',
      title: 'Authentic Reviews',
      description: 'Read genuine reviews from students and parents to make informed decisions'
    },
    {
      icon: '📊',
      title: 'Compare Institutes',
      description: 'Side-by-side comparison of multiple institutes based on your preferences'
    },
    {
      icon: '💬',
      title: 'Direct Enquiry',
      description: 'Contact institutes directly with your questions and requirements'
    }
  ];

  if (loading) {
    return (
      <div className="homepage-loading">
        <div className="loading-spinner"></div>
        <p>Loading amazing educational opportunities...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your Perfect
              <span className="highlight"> Educational Institution</span>
            </h1>
            <p className="hero-subtitle">
              Discover, compare, and choose from thousands of schools, colleges, and coaching centers 
              with authentic reviews and ratings from students and parents.
            </p>
            
            <div className="hero-buttons">
              <Link to="/institutes" className="btn-primary">Explore Institutes</Link>
              <Link to="/register" className="btn-secondary">List Your Institute</Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <strong>{stats.institutes}+</strong>
                <span>Institutes</span>
              </div>
              <div className="stat-item">
                <strong>{stats.reviews}+</strong>
                <span>Reviews</span>
              </div>
              <div className="stat-item">
                <strong>{stats.students}+</strong>
                <span>Students Helped</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="floating-card card-1">
                <div className="card-icon">🏆</div>
                <h4>Top Rated</h4>
                <p>Best institutes based on authentic reviews</p>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">⭐</div>
                <h4>Verified</h4>
                <p>All institutes are verified and authentic</p>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">🚀</div>
                <h4>Easy Search</h4>
                <p>Find exactly what you're looking for</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Explore educational institutions across different categories</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/institutes?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.count} Institutes</p>
                </div>
                <div className="category-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Institutes */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Institutes</h2>
            <p>Discover some of our top-rated educational institutions</p>
          </div>
          
          <div className="institutes-grid">
            {featuredInstitutes.map(institute => (
              <div key={institute._id} className="institute-card">
                <div className="card-image">
                  <div className="image-placeholder">
                    {institute.name.charAt(0)}
                  </div>
                  <div className="card-badge">{institute.category}</div>
                  <div className="card-overlay">
                    <Link to={`/institutes/${institute._id}`} className="view-button">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{institute.name}</h3>
                  <p className="institute-location">
                    📍 {institute.city}, {institute.state}
                  </p>
                  <p className="institute-affiliation">{institute.affiliation}</p>
                  <div className="institute-meta">
                    <span className="rating">
                      ⭐ 4.5
                    </span>
                    <span className="reviews">(25 reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {featuredInstitutes.length > 0 && (
            <div className="view-all-container">
              <Link to="/institutes" className="btn-outline-large">
                View All Institutes
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How EduList Works</h2>
            <p>Your journey to finding the perfect educational institution in 4 simple steps</p>
          </div>
          
          <div className="steps-container">
            <div className="step-line"></div>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Search & Discover</h3>
                  <p>Use our advanced search to find institutes by location, category, fees, and facilities</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Compare & Analyze</h3>
                  <p>Read authentic reviews, compare multiple options, and check detailed profiles</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Connect & Enquire</h3>
                  <p>Send enquiries directly to institutes and get your questions answered</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Share Experience</h3>
                  <p>Help other students by sharing your reviews and experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose EduList?</h2>
            <p>We're committed to making your educational journey easier and more informed</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.institutes}+</div>
              <div className="stat-label">Educational Institutes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.reviews}+</div>
              <div className="stat-label">Authentic Reviews</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.students}+</div>
              <div className="stat-label">Students Helped</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.cities}+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Institute?</h2>
            <p>Join thousands of students and parents who have found their ideal educational institutions through EduList</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary-large">
                Get Started Free
              </Link>
              <Link to="/institutes" className="btn-outline-large">
                Browse Institutes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;