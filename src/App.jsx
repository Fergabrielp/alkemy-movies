import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

import "../src/styles.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    //Redireccionar al login si no tenemos token en localStorage
    const token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favsLocal = localStorage.getItem("favs");
    if (favsLocal != null) {
      const favsArray = JSON.parse(favsLocal);
      setFavoritos(favsArray);
    }
  }, []);

  const addOrRemoveFavs = (e) => {
    const favs = localStorage.getItem("favs");

    let tempfavs;

    if (favs === null) {
      tempfavs = [];
    } else {
      tempfavs = JSON.parse(favs);
    }
    const btn = e.currentTarget.parentElement;
    const imgURL = btn.querySelector("img").getAttribute("src");
    const title = btn.querySelector("h4").innerText;
    const overview = btn.querySelector("p").innerText;
    const id = btn.querySelector("button").getAttribute("data-id");
    const movieData = {
      imgURL,
      title,
      overview,
      id,
    };

    let isInArray = tempfavs.find((onefav) => {
      return onefav.id === movieData.id;
    });
    if (!isInArray) {
      tempfavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempfavs));
      setFavoritos(tempfavs);
    } else {
      let favsLeft = tempfavs.filter((onefav) => {
        return onefav.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(favsLeft));
      setFavoritos(favsLeft);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-3 d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/listado"
            element={<Listado addOrRemoveFavs={addOrRemoveFavs} />}
          />
          <Route path="/detalle" element={<Detalle />} />
          <Route
            path="/resultados"
            element={<Resultados addOrRemoveFavs={addOrRemoveFavs} />}
          />
          <Route
            path="/favoritos"
            element={
              <Favoritos
                addOrRemoveFavs={addOrRemoveFavs}
                favoritos={favoritos}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
