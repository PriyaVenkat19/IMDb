const express = require("express");
const router = express.Router();
const movieModel = require("../models/movie");



router.get("/", async (request, response) => {
  try {
    const movie = await movieModel.find();
    response.status(200).json(movie);
  } catch (error) {
    response.send(500).json({ message: error.message });
  }
});

router.post("/", async (request, response) => {
  const newMovie = new movieModel({
    movieName: request.body.movieName,
    genre: request.body.genre,
    language: request.body.language,
    releasedYear:request.body.language,
    rating:request.body.rating
  });
  try {
    const movie = await newMovie.save();
    response.status(201).json(movie);
  } 
  catch (error) {
    response.send(500).json({ message: error.message });
  }
});

router.patch("/:id", getmovie,async(req, res) => {
    if(req.body.name!=null){
        res.movie.movieName=req.body.movieName;
    }
    if(req.body.genre!=null){
        res.movie.genre=req.body.genre;
    }
    if(req.body.language!=null){
        res.movie.language=req.body.language;
    }
    if(req.body.releasedYear!=null){
        res.movie.releasedYear=req.body.releasedYear;
    }
    if(req.body.rating!=null){
        res.movie.rating=req.body.rating;
    }
    try{
        const updatedMovie= await res.movie.save();
        res.status(201).json(updatedMovie);
    }
    catch (error) {
        response.send(500).json({ message: error.message });
      }

});

router.delete("/:id", getmovie,async(req, res) => {
    try{
        await res.movie.deleteOne();
        res.status(204).json({message: 'Deleted the user'})
    }
    catch (error) {
        response.send(400).json({ message: error.message });
      }

});



async function getmovie(req, res, next) {
  let movie;
  try {
    movie = await movieModel.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find user with id ${request.params.id}" });
    }
    res.movie = movie;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = router;