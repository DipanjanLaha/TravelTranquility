import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ExploreButton = styled.button`
  background-color: #2e582f;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #67924d;
  }

  &:focus {
    outline: none;
  }
`;

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/transport', {
      state: { searchQuery: query },
    });
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/suggestions?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API calls
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* Search Input */}
        <div style={{
          display: "flex", // Enables flexbox
          justifyContent: "center", // Centers content horizontally
          alignItems: "center", // Centers content vertically
          height: "10vh", // Full viewport height for vertical centering
        }}>
          <div className="px-2 pr-10 absolute right-3 top-2.5 text-gray-400">
            {loading ? (
              <div className="h-5 w-5 border-t-2 border-blue-500 rounded-full animate-spin" />
            ) : (
              <Search size={30} />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ width: "800px", height: "55px" }}
          />
          <div className="px-2 pr-10">
          <ExploreButton onClick={handleSearchClick}>Explore Now</ExploreButton>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SearchBox;