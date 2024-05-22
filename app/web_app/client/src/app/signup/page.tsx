"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import './style.css';
import { STATUS_CODES } from "http";


function page() {
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const onSubmit = (data: any) => {
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.ok) {
        console.log("Kayıt başarılı!");
        // Kayıt başarılıysa giriş sayfasına yönlendirme yapabilirsiniz.
        window.location.href = "/login";
      } else {
        console.error("Kayıt başarısız!");
      }
    })
    .catch((error) => {
      // Hata durumunda
      console.error('Error:', error);
    });
  
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
          <button type="submit" className="inputButton" >Kayıt ol</button>

        </form>
      </div>
      
    </div>
    </div>
  );
}

export default page;