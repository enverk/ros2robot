"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { login } from '../services/authService'; // authService dosyanızın yolunu belirtin
import './style.css';

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      router.push('/main');
    } catch (err) {
      setError('Your username or password is incorrect. Please try again.');
    }
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
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email here"
                className="inputBox"
              />
            </div>
            <br />
            <div className="inputContainer">
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password here"
                className="inputBox"
              />
            </div>
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="inputButton">Giriş Yap</button>
            <a href="/signup" className="a">Üye ol</a>
          </form>
        </div>
        <br />
      </div>
    </div>
  );
}

export default LoginPage;