import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Buscador = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    if (keyword.trim() === "") {
      swal("Ingrese una palabra para buscar");
    } else {
      e.target.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
    }
  };
  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Movie"
          aria-label="Search"
          name="keyword"
        />
        <button className="btn btn-outline-danger" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Buscador;
