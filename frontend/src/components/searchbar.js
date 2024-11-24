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
const SearchContainer = styled.div`
  display: flex;
  justify-content: center; /* Center the search bar horizontally */
  align-items: center;
  padding: 20px;
  gap: 20px; /* Add space between the search bar and button */
  position: relative;
`;

const SearchInput = styled.input`
  width: 500px; /* Increased width for a larger search bar */
  padding: 15px 50px 15px 20px; /* Added more padding for better aesthetics */
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 1.2rem;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  outline: none;

  &:focus {
    border-color: #67924d;
    box-shadow: 0 0 5px rgba(103, 146, 77, 0.4);
  }
`;

const SearchIconContainer = styled.div`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  cursor: pointer;

  &:hover {
    color: #67924d;
  }
`;


const SuggestionsDropdown = styled.div`
  position: absolute;
  top: 50px;
  width: 300px;
  background-color: #2596be; /* Green background */
  border: 1px solid #2e582f;
  border-radius: 10px;
  outline: 2px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;

  button {
    width: 100%;
    padding: 10px 15px;
    text-align: left;
    background: none;
    border: 1px;
    color: white; /* White text */
    cursor: pointer;

    &:hover {
      background-color:#dcebee; /* Lighter green for hover effect */
    }

    &:focus {
      outline: 1.5px;
    }
  }
`;


const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => { navigate('/transport', {
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
    <SearchContainer>
      <div style={{ position: 'relative' }}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <SearchIconContainer>
          {loading ? (
            <div className="h-5 w-5 border-t-2 border-green-500 rounded-full animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </SearchIconContainer>

        {suggestions.length > 0 && (
          <SuggestionsDropdown>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </button>
            ))}
          </SuggestionsDropdown>
        )}
      </div>
      <ExploreButton onClick={handleSearchClick}>Explore Now</ExploreButton>
    </SearchContainer>
  );
};
export default SearchBox;