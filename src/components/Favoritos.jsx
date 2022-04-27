import { Link } from "react-router-dom";

const Favoritos = ({ addOrRemoveFavs, favoritos }) => {
  return (
    <div className="row">
      {favoritos == "" && (
        <h3 className="col-12 text-center mt-5">Aun no agregaste favoritos</h3>
      )}
      {favoritos.map((movie) => {
        return (
          <div className="col-lg-3 col-md-6 mb-2" key={movie.id}>
            <div className="card border-4 border-danger bg-dark h-100">
              <img
                src={movie.imgURL}
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

export default Favoritos;
