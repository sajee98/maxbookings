import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EditMovies() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the movie object from location.state
  const movie = location.state?.movie;

  if (!movie) {
    return <h2>No movie data available</h2>;
  }

  // Displaying movie poster URL
  const imageUrl = `http://localhost:8000/storage/${movie.moviePoster}`;

  // Add state for editable fields (showtimes)
  const [firstShow, setFirstShow] = useState(movie.firstShow || "");
  const [secondShow, setSecondShow] = useState(movie.secondShow || "");
  const [thirdShow, setThirdShow] = useState(movie.thirdShow || "");
  const [price, setPrice] = useState(movie.price || "");

  const handlePublish = async () => {
    // Create the updated movie object with decision set to "2"
    const updatedMovie = {
      firstShow,
      secondShow,
      thirdShow,
      decision: "2", // Changing decision from "1" to "2"
    };

    try {
      // Send a PUT request to update the movie data
      await axios.put(`http://localhost:8000/api/movieList/${movie.id}`, updatedMovie);
      alert("Movie updated successfully and published!");
      navigate("/"); // Redirect to movies list
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Error updating movie.");
    }
  };

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie Details</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Movie Name:</label>
          <input type="text" value={movie.movieName} readOnly />
        </div>

        <div>
          <label>Theatre Name:</label>
          <input type="text" value={movie.theatreName} readOnly />
        </div>

        <div>
          <label>Genre:</label>
          <input type="text" value={movie.genre} readOnly />
        </div>

        <div>
          <label>Language:</label>
          <input type="text" value={movie.language} readOnly />
        </div>

        <div>
          <label>Duration:</label>
          <input type="text" value={movie.duration} readOnly />
        </div>

        <div>
          <label>Movie Poster:</label>
          <div>
            <img 
              src={movie.imgUrl || imageUrl} 
              alt={movie.movieName} 
              style={{ width: "150px", height: "auto" }} 
            />
          </div>
        </div>

        <div>
          <label>First Show:</label>
          <input 
            type="text" 
            value={firstShow} 
            onChange={(e) => setFirstShow(e.target.value)} 
          />
        </div>

        <div>
          <label>Second Show:</label>
          <input 
            type="text" 
            value={secondShow} 
            onChange={(e) => setSecondShow(e.target.value)} 
          />
        </div>

        <div>
          <label>Third Show:</label>
          <input 
            type="text" 
            value={thirdShow} 
            onChange={(e) => setThirdShow(e.target.value)} 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="text" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>

        <button type="button" onClick={handlePublish}>Publish</button>
      </form>
    </div>
  );
}

export default EditMovies;
