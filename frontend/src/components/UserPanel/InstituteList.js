import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { Link } from 'react-router-dom';
import { instituteAPI } from '../../services/api';
import './UserPanel.css';

const InstituteList = () => {
  const [institutes, setInstitutes] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    city: '',
    minFees: '',
    maxFees: '',
    facilities: ''
  });

  // Fixed: Added useCallback for applyFilters
  const applyFilters = useCallback(() => {
    let filtered = institutes;

    if (filters.search) {
      filtered = filtered.filter(inst =>
        inst.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        inst.city.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(inst => inst.category === filters.category);
    }

    if (filters.city) {
      filtered = filtered.filter(inst =>
        inst.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setFilteredInstitutes(filtered);
  }, [filters, institutes]); // Added filters and institutes dependencies

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await instituteAPI.getAll();
        setInstitutes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching institutes:', error);
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]); // Added applyFilters to dependencies

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      city: '',
      minFees: '',
      maxFees: '',
      facilities: ''
    });
  };

  if (loading) {
    return <div className="loading">Loading institutes...</div>;
  }


  return (
    <div className="institute-list-page">
      <div className="page-header">
        <h1>Find Educational Institutes</h1>
        <p>Discover the perfect institution for your educational journey</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name or city..."
            />
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="School">School</option>
              <option value="College">College</option>
              <option value="University">University</option>
              <option value="Coaching Center">Coaching Center</option>
              <option value="Preschool">Preschool</option>
            </select>
          </div>

          <div className="filter-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Enter city..."
            />
          </div>

          <div className="filter-group">
            <label>Actions</label>
            <button onClick={clearFilters} className="btn-outline">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="results-section">
        <div className="results-header">
          <h2>
            {filteredInstitutes.length} Institute{filteredInstitutes.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        <div className="institutes-grid">
          {filteredInstitutes.map(institute => (
            <div key={institute._id} className="institute-card">
              <div className="card-header">
                <div className="card-image">
                  <div className="image-placeholder">
                    {institute.name.charAt(0)}
                  </div>
                </div>
                <div className="card-badge">{institute.category}</div>
              </div>
              
              <div className="card-content">
                <h3>{institute.name}</h3>
                <p className="affiliation">{institute.affiliation}</p>
                <p className="location">
                  📍 {institute.address}, {institute.city}, {institute.state}
                </p>
                <p className="contact">
                  📞 {institute.phone} | 📧 {institute.email}
                </p>
                
                {institute.facilities && institute.facilities.length > 0 && (
                  <div className="facilities">
                    <strong>Facilities:</strong>
                    <div className="facilities-list">
                      {institute.facilities.slice(0, 3).map((facility, index) => (
                        <span key={index} className="facility-tag">
                          {facility}
                        </span>
                      ))}
                      {institute.facilities.length > 3 && (
                        <span className="facility-tag">
                          +{institute.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="card-actions">
                
                                <Link 
  to={`/institutes/${institute._id}`}
  className="btn-primary"
>
  View Details
</Link>
              </div>
            </div>
          ))}
        </div>

        {filteredInstitutes.length === 0 && (
          <div className="no-results">
            <h3>No institutes found</h3>
            <p>Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteList;