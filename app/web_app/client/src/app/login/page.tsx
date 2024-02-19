"use client";

import React from "react";
import { useForm } from "react-hook-form";

function page() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    fetch("http://localhost:5172/login", {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
      </div>
      <button type="submit">Giriş Yap</button>
    </form>
  );
}

export default page;