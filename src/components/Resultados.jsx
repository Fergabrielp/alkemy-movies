import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Resultados = ({ addOrRemoveFavs }) => {
  const [searchMovies, setSearchMovies] = useState([]);
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  useEffect(() => {
    const buscarMovie = async () => {
      try {
        const key = "7a2c7516a8be6ba399861eaf5a53ccc3";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=es-ES&query=${keyword}`;
        const res = await axios(url);
        setSearchMovies(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    buscarMovie();
  }, [searchMovies]);

  return (
    <div className="row">
      {searchMovies.map((movie) => {
        return (
          <div className="col-lg-3 col-md-6 mb-2" key={movie.id}>
            <div className="card border-4 border-danger bg-dark h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="card-img-top"
                alt="movie poster"
              />
              <button
                className="btn-favs"
                onClick={addOrRemoveFavs}
                data-id={movie.id}
              >
                🤍
              </button>
              <div className="card-body">
                <h4 className="card-title text-white">{movie.title}</h4>
                <hr className="text-white" />
                <p className="card-text text-white">
                  {movie.overview.substring(0, 250)}...
                </p>
              </div>
              <Link
                to={`/detalle?movieID=${movie.id}`}
                className="btn btn-danger m-3"
              >
                Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Resultados;
