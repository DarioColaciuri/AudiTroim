import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./CSS_Auth/Signup.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { email, contraseña } = formData;

      if (contraseña.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      if (formData.contraseña !== formData.confirmarContraseña) {
        toast.error("Las contraseñas no coinciden.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        contraseña
      );
      const user = userCredential.user;

      toast.success("Usuario creado");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("El formato del correo electrónico no es válido.");
          break;
        case "auth/email-already-in-use":
          toast.error(
            "El correo electrónico ya está en uso. Por favor, utiliza otro."
          );
          break;
        default:
          toast.error("Error al crear usuario. Por favor, inténtalo de nuevo.");
          break;
      }
      console.error("Error al crear usuario:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-general">
      <div className="signup-container">
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
          />
          <label>Telefono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Telefono"
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmarContraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
          />
          <button type="submit" className="register-btn" disabled={isLoading}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
