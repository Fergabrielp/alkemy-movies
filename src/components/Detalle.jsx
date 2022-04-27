import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";

const Detalle = () => {
  const [detail, setDetail] = useState({});
  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  const navigate = useNavigate();

  useEffect(() => {
    //Redireccionar al login si no tenemos token en localStorage
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const movieDetail = async () => {
      try {
        const key = "7a2c7516a8be6ba399861eaf5a53ccc3";
        const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}&language=es-ES`;
        const res = await axios(url);
        setDetail(res.data);
      } catch (error) {
        swal("Error de conexion");
      }
    };
    movieDetail();
  }, []);

  return (
    <>
      <h2>{detail.title}</h2>
      <h4>"{detail.tagline}"</h4>
      <div className="row">
        <div className="col-4">
          <img
            src={`https://image.tmdb.org/t/p/w400/${detail.poster_path}`}
            alt="Poster Image"
            className="img-fluid"
          />
        </div>
        <div className="col-8">
          <h3>Resumen</h3>
          <p>{detail.overview}</p>
          <h5>Fecha de Estreno: {detail.release_date}</h5>
          <h5>Promedio: {detail.vote_average}</h5>
          <h5>
            Homepage:{" "}
            <a target="_blank" href={detail.homepage}>
              {detail.homepage}
            </a>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Detalle;
