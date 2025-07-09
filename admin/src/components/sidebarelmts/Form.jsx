import axios from "axios";
import { useState } from "react";
import "./AddMovie.css";

function Form() {
  const [theatreName, setTheatreName] = useState("");
  const [movieName, setMovieName] = useState("");
  const [moviePoster, setMoviePoster] = useState(null);
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [firstShow, setFirstShow] = useState("");
  const [secondShow, setSecondShow] = useState("");
  const [thirdShow, setThirdShow] = useState("");
  const [price, setPrice] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [decision, setDecision] = useState("");

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setMoviePoster(file); // Update the movieName state with the selected file
  //   }
  // };

  const save = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("theatreName", theatreName);
    formData.append("movieName", movieName);
    formData.append("moviePoster", moviePoster);
    formData.append("genre", genre);
    formData.append("language", language);
    formData.append("duration", duration);
    formData.append("firstShow", firstShow);
    formData.append("secondShow", secondShow);
    formData.append("thirdShow", thirdShow);
    formData.append("price", price);
    formData.append("imgUrl", imgurl);
    formData.append("decision", decision);
    // if (moviePoster) {
    //   formData.append("moviePoster", moviePoster); // Attach the movie file
    // }

    try {
      await axios.post("http://127.0.0.1:8000/api/movieList", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Movie Request Sent successfully");
      // Reset all state values to their initial values
      setTheatreName("");
      setMovieName("");
      setMoviePoster(null);
      setGenre("");
      setLanguage("");
      setDuration("");
      setFirstShow("");
      setSecondShow("");
      setThirdShow("");
      setPrice("");
      setDecision("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <h2>Movie upload</h2>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2> Movie Upload </h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={save}>
                
              <div className="input_field">
                  <span>  <i aria-hidden="true" className="fa fa-film"></i>  </span>
                  <input type="text"  placeholder="Theatre Name" onChange={(event) => setTheatreName(event.target.value)} required />
                </div>
                <div className="input_field">
                  <span>  <i aria-hidden="true" className="fa fa-id-card"></i>  </span>
                  <input type="text"  placeholder="Movie Name" onChange={(event) => setMovieName(event.target.value)} required />
                </div>
              <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-tags"></i>
                  </span>
                  <input type="text"  placeholder="Genre" value={genre} onChange={(event) => {setGenre(event.target.value); }} required />
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-language"></i>
                  </span>
                  <input type="text"  placeholder="Language" value={language} onChange={(event) => {setLanguage(event.target.value); }} required />
                </div>
                <div className="input_field">                  <span>
                    <i aria-hidden="true" className="fa fa-clock"></i>
                  </span>
                  <input type="text"  placeholder="Duration" value={duration} onChange={(event) => {setDuration(event.target.value); }} required />
                </div>
               <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-clock"></i>
                  </span>
                  <input type="text"  placeholder="First Show" value={firstShow} onChange={(event) => {setFirstShow(event.target.value); }} required />
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-clock"></i>
                  </span>
                  <input type="text"  placeholder="Second Show" value={secondShow} onChange={(event) => {setSecondShow(event.target.value); }} required />
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-clock"></i>
                  </span>
                  <input type="text"  placeholder="Third Show" value={thirdShow} onChange={(event) => {setThirdShow(event.target.value); }} required />
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-clock"></i>
                  </span>
                  <input type="text"  placeholder="Ticket Price" value={price} onChange={(event) => {setPrice(event.target.value); }} required />
                </div>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-clock"></i>
                  </span>
                  <input type="text"  placeholder="Image URL" value={imgurl} onChange={(event) => {setImgUrl(event.target.value); }} required />
                </div>
                {/* <div className="input_field">
                  <input type="file"  placeholder="Movie Pic"  onChange={handleImageChange} required  />
                </div> */}
              

                <div className="row clearfix">
                  <div className="input_field">
                    <input
                      type="text"
                      hidden
                      name="Decisionpending"
                      placeholder="Decision pending"
                      value={decision}
                      onChange={(event) => {
                        setDecision(event.target.value);
                      }}
                    />
                  </div>
                </div>
              <input className="button" type="submit" value="Upload Movie" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
