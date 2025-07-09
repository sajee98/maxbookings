import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import DataTable from 'react-data-table-component';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import './CurrentMovie.css';


function MovieRequest() {
  const [movie, setMovieList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => await Load())();
  }, []);

  const Load = async (searchQuery = "0") => {
    setLoading(true);
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/movieList", {
        params: { decision: searchQuery }
      });
      setMovieList(result.data.data);
      setFilteredMovies(result.data.data);
    } catch (error) {
      console.error("Error loading Theatres:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredMovies(movie);
    } else {
      const filtered = movie.filter(item =>
        item.movieName.toLowerCase().includes(query.toLowerCase()) ||
        item.theatreName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };
  const handleAccept = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/movieList/${id}`, { decision: "1" });
      setMovieList(movie.filter(item => item.id !== id));
      setFilteredMovies(filteredMovies.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error Deleting Movie:", error);
    }
  };

  const handleDelete = async (id) => {
     try {
       await axios.put(`http://127.0.0.1:8000/api/movieList/${id}`, { decision: "3" });
       setMovieList(movie.filter(item => item.id !== id));
       setFilteredMovies(filteredMovies.filter(item => item.id !== id));
     } catch (error) {
       console.error("Error Deleting Movie:", error);
     }
   };

  

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Theatre Name", selector: row => row.theatreName, sortable: true },
    { name: "Movie Name", selector: row => row.movieName, sortable: true },
    { 
      name: "Movie Pic", 
      selector: row => (
        <img
          src={row.imgUrl || "https://via.placeholder.com/150"} // Fallback image if imgUrl is not available
          alt={row.movieName}
          className="movie-img"
        />
      ),
      sortable: false,
    },
    { name: "Genre", selector: row => row.genre, sortable: true },
    { name: "Language", selector: row => row.language, sortable: true },
    { name: "Duration", selector: row => row.duration, sortable: true },
    { name: "Price", selector: row => row.price, sortable: true },
    {
      name: "Actions",
      cell: row => (
        <div>
          <button 
            onClick={() => handleAccept(row.id)} 
            className="action-button accept-button"
            title="Accept Movie"
          >
            <FaCheckCircle />
          </button>
          <button 
            onClick={() => handleDelete(row.id)} 
            className="action-button delete-button"
            title="Delete Movie"
          >
            <FaTrash />
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title"> Requested Movie Lists</h1>
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
            data={filteredMovies}
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

export default MovieRequest;
