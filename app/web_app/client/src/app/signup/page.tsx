"use client";

import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import './style.css';
import { signup } from "../services/signupService";


function page() {
  const { register, handleSubmit } = useForm();
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await signup(data.email, data.name, data.surname, data.password);
      setSuccessMessage('Kayıt işlemi başarıyla tamamlandı. Lütfen giriş yapın.');
      setTimeout(() => {
        router.push('/login');
      }, 3000); 
    } catch (err) {
      setErrorMessage('Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
    }
  };


  return (
    <div className="main">
    <div className="mainContainer">
        <div className="titleContainer">
        <div>Kayıt</div>
      </div>
      <br />
      <hr />
      <div className="inputContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <input type="text" {...register("email")}
            placeholder="Email"
            className="inputBox" />
          </div>
          <br />
          <div className="inputContainer">
            <input type="text" {...register("name")}
            placeholder="Adınız"
            className="inputBox" />
          </div>
          <br />
          <div className="inputContainer">
            <input type="text" {...register("surname")}
            placeholder="Soyadınız"
            className="inputBox" />
          </div>
          <br />
          <div className="inputContainer">
            <input type="password" {...register("password")} 
            placeholder="Şifre"
            className="inputBox"/>
          </div>
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="inputButton" >Kayıt ol</button>
          <a href="/login" className="inputButton">Giriş Yap</a>
        </form>
      </div>
      
    </div>
    </div>
  );
}

export default page;