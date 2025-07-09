<?php

namespace App\Http\Controllers;

use App\Models\MovieList;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    protected $movieList;
    
    public function __construct()
    {
        $this->movieList = new movieList();
    }

    /**
     * Fetch movies with a pending decision (decision = 0).
     */
    public function index()
    {
        $movieList = MovieList::where('decision', 0)->get();
        return response()->json(['data' => $movieList], 200);
    }

    /**
     * Store a new movie.
     */
    public function store(Request $request)
    {
        $request->validate([
            'theatreName' => 'required',
            'movieName' => 'required',
            //'moviePoster' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'genre' => 'required',
            'imgUrl' => 'required',
            'language' => 'required',
            'duration' => 'required',

       
        
        
        ]);

       // $path = $request->file('moviePoster')->store('images', 'public');

        $movie = MovieList::create([
            'theatreName' => $request->theatreName,
            'movieName' => $request->movieName,
            //'moviePoster' => $path,
            'genre' => $request->genre,
            'language' => $request->language,
            'duration' => $request->duration,
            'firstShow' => $request->firstShow,
            'secondShow' => $request->secondShow,
            'thirdShow' => $request->thirdShow,
            'price' => $request->price,
            'imgUrl' => $request->imgUrl,
        ]);

        return response()->json([
            'message' => 'Movie added successfully!',
            'data' => $movie
        ], 201);
    }

    /**
     * Display a specific movie.
     */
    public function show($id)
    {
        $movieList = MovieList::findOrFail($id);
        return response()->json($movieList, 200);
    }

    /**
     * Update an existing movie.
     */
    public function update(Request $request, $id)
    {
        $movieList = $this->movieList->find($id);
        $movieList->update($request->all());
        return $movieList;

    }

    /**
     * Accept a movie by updating the decision field to 1.
     */
    public function acceptMovie($id)
    {
        $movieListmovieList = MovieList::findOrFail($id);
        $movieListmovieList->update(['decision' => 1]);

        return response()->json([
            'message' => 'Movie accepted successfully!',
            'data' => $movieListmovieList
        ], 200);
    }

    /**
     * Delete a movie.
     */
    public function destroy($id)
    {
        $movieList = MovieList::findOrFail($id);
        $movieList->delete();

        return response()->json(['message' => 'Movie deleted successfully!'], 200);
    }
}
