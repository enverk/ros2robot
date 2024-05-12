"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from 'next/navigation';
import './style.css';


function page() {
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const LoginSuccess = (res: any) => {
    console.log(res)

    
  }

  const LoginFail = (res: any) => {
    console.log(res)
  }

  const onSubmit = (data: any) => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.ok) {
        // Başarılı bir HTTP yanıt alındığında
        router.push('/main');

      } else {
        // Başarısız bir HTTP yanıt alındığında
        console.log(response.statusText);
        alert('Your username or password is incorrect. Please try again.');
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
          <div>Kullanıcı Girişi</div>
        </div>
        <br />
        <hr />
        <div className="inputContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputContainer">

              <input type="email" {...register("email")}
                placeholder="Enter your email here"
                className="inputBox"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />
            <div className="inputContainer">

              <input type="password" {...register("password")}
                placeholder="Enter your password here"
                className="inputBox"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <button type="submit" className="inputButton">Giriş Yap</button>
            <a href="/signup" className="a">
              Üye ol
            </a>
          </form>
        </div>
        <br />
        

      </div>
    </div>
  );
}

export default page;
