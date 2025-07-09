import React, { useState, useEffect } from "react";
import axios from "axios"; 
import TripData from "./MovieData";

function Movie() {
  // State to store movie data
  const [movieData, setMovieList] = useState([]); // Store the full list of movies
  const [loading, setLoading] = useState(false);

  // Fetch movie data from API or database
  useEffect(() => {
    Load(); 
  }, []);

  const Load = async (searchQuery = "2") => {
    setLoading(true);
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/acceptMovie", {
        params: { decision: searchQuery },
        withCredentials: true // Include credentials for CORS
      });
      const uniqueMovies = removeDuplicateMovies(result.data.data);
      setMovieList(uniqueMovies); 
    } catch (error) {
      console.error("Error loading movies:", error);
    }
    setLoading(false);
  };

  // Function to filter out duplicate movie names
  const removeDuplicateMovies = (movies) => {
    const seen = new Set();
    return movies.filter((movie) => {
      if (seen.has(movie.movieName)) {
        return false; // Skip duplicate movie names
      } else {
        seen.add(movie.movieName);
        return true;
      }
    });
  };

  return (
    <>
      <div className="trip">
        <h1>New Releases</h1>
        <p>You can find the best movies around Sri Lanka</p>
      </div>  
      <div className="tripcard">
        {loading ? (
          <p>Loading movies...</p> // Show loading message while fetching
        ) : (
          movieData.length > 0 ? (
            movieData.map((movie) => (
              <TripData
                key={movie.id} // Use a unique key from the movie
                image={movie.imgUrl} // Ensure you use the correct image path field
                movieName={movie.movieName}
              />
            ))
          ) : (
            <p>No movies found.</p> // Handle case where there are no movies
          )
        )}
      </div>
    </>
  );
}

export default Movie;
