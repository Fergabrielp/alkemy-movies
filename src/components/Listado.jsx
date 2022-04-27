import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

const Listado = ({ addOrRemoveFavs }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    //Redireccionar al login si no tenemos token en localStorage
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const listadoMovies = async () => {
      try {
        const key = "7a2c7516a8be6ba399861eaf5a53ccc3";
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=es-ES&sort_by=popularity.desc&page=${page}&with_watch_monetization_types=flatrate`;
        const res = await axios(url);
        setMovies(res.data.results);
      } catch (error) {
        swal("Hubo un error en la conexión");
      }
    };
    listadoMovies();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <div className="row">
        {movies.map((movie) => {
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
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-3">
          <li className="page-item">
            {page > 1 ? (
              <button
                className="btn btn-outline-danger me-2"
                onClick={previousPage}
              >
                Previous
              </button>
            ) : null}
          </li>
          <li className="page-item">
            <button className="btn btn-outline-danger ms-2" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Listado;
