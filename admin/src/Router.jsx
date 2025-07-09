import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Form from "./components/sidebarelmts/Form";
import Mainlayout from "./components/Mainlayout";
import Movies from "./components/sidebarelmts/Movies";

import MyMovies from "./components/sidebarelmts/MyMovies";
import Home from "./components/Home";
import DeletedMovies from "./components/sidebarelmts/DeletedMovies";
import Theatreadd from "./components/sidebarelmts/theatreadd";
import TheatreList from "./components/sidebarelmts/TheatreList";
import PublishMovies from "./components/sidebarelmts/PublishMovies";
import MovieRequest from "./components/sidebarelmts/AdminMovieRequest";
import EditMovies from "./components/sidebarelmts/EditMovies";


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/mymovies" element={<MyMovies />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/deletedmovies" element={<DeletedMovies />} />
        <Route path="/theatreadd" element={<Theatreadd />} />
        <Route path="/theatrelist" element={<TheatreList />} />
        <Route path="/publishMovies" element={<PublishMovies />} />
        <Route path="/MovieRequests" element={<MovieRequest />} />
        <Route path="/EditMovies/:id" element={<EditMovies />} />
      </Route>
      // Mainlayout end
    </Routes>
  );
};

export default AppRouter;
