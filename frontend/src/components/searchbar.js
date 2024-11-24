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
  justify-content: center; /* Center the search bar */
  align-items: center;
  padding: 2px;
  gap: 20px;
  position: relative;
  width: 100%;
`;
const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white; /* White background for the search bar */
  border: none !important; /* Ensure no border */
  border-radius: 35px; /* Fully rounded ends */
  padding: 0 5px; /* Inner padding */
  width: 700px;
  height: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
  overflow: hidden;

  /* Reset any inherited or external styles */
  border-width: 0 !important;
  border-style: none !important;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none !important; /* Remove border */
  outline: none !important; /* Remove outline */
  padding: 0 20px;
  font-size: 1rem;
  color: #333; /* Dark text */
  background-color: transparent; /* Match the wrapper's background */
  border-radius: 30px; /* Match the wrapper's rounded ends */
  margin: 0; /* Remove any browser default margin */
  appearance: none; /* Remove any default styling on input */

  /* Reset focus/active states */
  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  &:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;



const SearchIconContainer = styled.div`
  background-color:  #2e582f; /* Blue background for the icon */
  color: white; /* White icon */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 100%;
  border-top-right-radius: 35px; /* Rounded right end */
  border-bottom-right-radius: 35px; /* Rounded right end */
  cursor: pointer;
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: 60px;
  width: 700px;
  background-color: #ffffff; /* White background for the dropdown */
  border: none;
  color: #000000; /* Black text for better contrast */
  border-radius: 15px; /* Smoothly rounded corners */
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15); /* Stronger shadow for depth */
  max-height: 250px;
  overflow-y: auto;
  z-index: 10;
  padding: 10px; /* Add padding for spacing inside the dropdown */

  /* Smooth fade-in animation */
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  button {
    width: 100%;
    padding: 12px 20px;
    text-align: left;
    background-color: transparent;
    border: none;
    border-radius: 10px; /* Rounded button corners */
    color: #000000; /* Black text for the button */
    font-size: 1rem; 
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1); /* Light grey hover effect */
      transform: scale(1.02); 
    }

    &:focus {
      outline: none;
      background-color: rgba(0, 0, 0, 0.15); /* Slightly darker grey for focus */
    }
  }

  /* Add a scrollbar with a custom style */
  ::-webkit-scrollbar {
    width: 8px; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3); /* Black thumb for contrast */
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5); /* Darker thumb on hover */
  }

  ::-webkit-scrollbar-track {
    background-color: transparent; 
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
    <SearchContainer>
        <SearchInputWrapper>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <SearchIconContainer>
          {loading ? (
            <div className="h-5 w-7 border-t-2 border-green-500 rounded-full animate-spin" />
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
        </SearchInputWrapper>
      <ExploreButton onClick={handleSearchClick}>Explore Now</ExploreButton>
    </SearchContainer>
  );
};

export default SearchBox;