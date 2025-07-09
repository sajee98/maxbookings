import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaCheckCircle, FaTrash } from "react-icons/fa"; // Added for icons
import './CurrentMovie.css';

function MyMovies() {
  const [movie, setMovieList] = useState([]); // Store the full list of movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store the filtered list
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      cell: (row) => <span>{row.id}</span>
    },
    {
      name: "Theatre Name",
      selector: (row) => row.theatreName,
      sortable: true
    },
    {
      name: "Movie Name",
      selector: (row) => row.movieName,
      sortable: true
    },
    {
      name: "Movie Poster",
      selector: (row) => (
        <img
          src={row.imgUrl || "https://via.placeholder.com/150"} 
          alt={row.name}
          className="movie-img"
        />
      ),
      sortable: false
    },
    {
      name: "genre",
      selector: (row) => row.genre,
      sortable: true
    },
    {
      name: "Show Times",
      selector: (row) => (
        <div>
          {row.firstShow && <div>{row.firstShow}</div>}
          {row.secondShow && <div>{row.secondShow}</div>}
          {row.thirdShow && <div>{row.thirdShow}</div>}
        </div>
      ),
      sortable: false
    },
    {
        name: "Price",
        selector: (row) => row.price,
        sortable: true
      },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
        
          <button 
            onClick={() => handleDelete(row.id)} 
            className="action-button delete-button"
            title="Delete Movie"
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  useEffect(() => {
    // Initial load of all movies
    Load();
  }, []);

  const Load = async (searchQuery = "2") => {
    setLoading(true);
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/acceptMovie", {
        params: { decision: searchQuery }
      });
      setMovieList(result.data.data);
      setFilteredMovies(result.data.data);
    } catch (error) {
      console.error("Error loading movies:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    // Find the movie that needs to be updated
    const updatedMovies = movie.map(item => {
      if (item.id === id) {
        // Change the movie name from 'running' to 'deleted'
        return { ...item, decision: item.decision === "1" ? "3" : item.decision };
      }
      return item;
    });
  
    // Update both the filteredMovies and movie state with the updated list
    setMovieList(updatedMovies);
    setFilteredMovies(updatedMovies); // If you want to update the filtered list as well
  
    try {
      // Send request to update the movie name in the backend
      await axios.put(`http://127.0.0.1:8000/api/movieList/${id}`, {
        decision: "2"
      });
      console.log(`Movie with ID: ${id} deleted .`);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    Load(query);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">MY Movie List</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-message">Loading movies...</div>
      ) : (
        <div className="table-container">
          <DataTable 
            columns={columns}
            data={filteredMovies} // Use filtered data here
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent={<div>No Movies Available</div>}
          />
        </div>
      )}
    </div>
  );
}

export default MyMovies;
