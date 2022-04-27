import { useEffect } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //Redireccionar al login si no tenemos token en localStorage
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      navigate("/listado");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //Validacion
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email === "" || password === "") {
      swal(<h2>Los campos no pueden estar vacios</h2>);
      return;
    }

    if (email !== "" && !regex.test(email)) {
      swal(<h2>Escribe una direccion valida</h2>);
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal(<h2>Login no valido</h2>);
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swal(<h2>Bienvenido!</h2>);

        //Guardo el token en localstorage
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        navigate("/listado");
      });
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-6 offset-3 border border-5 border-danger bg-dark rounded-3 p-5">
          <h2 className="text-white text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <label className="form-label d-block mt-2" htmlFor="email">
              <span className="fw-bold fs-5 text-white">Email</span>
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="correo@correo.com"
            />
            <label className="form-label d-block mt-2" htmlFor="password">
              <span className="fw-bold fs-5 text-white">Password</span>
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Text your password"
            />
            <button type="submit" className="btn btn-danger fw-bold mt-3">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
