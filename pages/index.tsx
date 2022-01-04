import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import CookiesProvider from '../providers/Cookies.provider';
import ClientServices from '../services/ClientServices';

const Home: NextPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const login_service = new ClientServices()
    const data_to_send = {
      email:email,
      password:password
    }
    const response: any = await login_service.login(data_to_send)
    const cookies_provider = new CookiesProvider();
    if(response.auth){
      cookies_provider.saveUserData(response);
      const info = cookies_provider.getUserData()
      window.location.href='/telzir/calculadora'
    }else{
      alert('Informações de login incorretas!')
    }

  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Calculadora de Custos</title>
        <link rel="icon" href="/gqlogo.png" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="lg:text-6xl text-3xl  font-bold">
          Bem vindo(a) à calculadora Telzir
        </h1>
        <p className="mt-3 lg:text-2xl text-xl">
          Login
        </p>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="flex gap-x-2">
            <Input size="medium" type='email' placeholder='Email' onChange={handleEmail}/>  
           </div>
        </div>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="flex gap-x-2">
            <Input size="medium" type='password' placeholder='Senha' onChange={handlePassword}/>  
           </div>
        </div>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Button variant="contained" size="large" color="primary" onClick={handleSubmit} >
              Login
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Button variant="text" size="small" href='/telzir/cadastro' >
              Cadastrar
          </Button>
        </div>
        
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/GabSnow24"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/gqlogo.png" alt="Gabriel Queiroz" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}

export default Home;