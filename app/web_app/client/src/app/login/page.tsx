"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from 'react-google-login';
import './style.css';

function page() {
  const { register, handleSubmit } = useForm();

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
      .then((response) => response.json())
      .then((data) => {});

      console.log(data);

  };

  return (
    <div className="mainContainer">
        <div className="titleContainer">
        <div>Kullanıcı Girişi</div>
      </div>
      <br />
      <hr />
      <div className="inputContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <label>Email:</label>
            <input type="text" {...register("email")}
            placeholder="Enter your email here"
            className="inputBox" />
          </div>
          <br />
          <div className="inputContainer">
            <label>Password:</label>
            <input type="password" {...register("password")} 
            placeholder="Enter your password here"
            className="inputBox"/>
          </div>
          <br />
          <button type="submit" className="inputButton">Giriş Yap</button>
        </form>
      </div>
      <GoogleLogin 
      clientId="481729939558-s74nks3clojfdup270nsmst09be3jcl0.apps.googleusercontent.com"
      onSuccess={LoginSuccess}
      onFailure={LoginFail}
      />
    </div>
 
  );
}

export default page;
