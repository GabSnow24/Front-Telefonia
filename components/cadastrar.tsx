import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import CookiesProvider from '../providers/Cookies.provider';
import ClientServices from '../services/ClientServices';

const Cadastrar: NextPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [cpf, setCpf] = useState('');
const [phone, setPhone] = useState(null);
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const handleName = (event: any) => {
    setName(event.target.value);
  };
  const handleCPF = (event: any) => {
    setCpf(event.target.value);
  };
  const handlePhone = (event: any) => {
    const number = parseInt(event.target.value)
    setPhone(number);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const client_service = new ClientServices()
    const data_to_send = {
      email:email,
      password:password,
      name: name,
      cpf: cpf,
      phone: phone,
    }
    console.log(data_to_send)
    const response: any = await client_service.create(data_to_send)
    if(response.created_at){
      window.location.href='/'
    }else{
      alert('Informações de cadastro incorretas!')
    }

  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Calculadora de Custos</title>
        <link rel="icon" href="/gqlogo.png" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <p className="mt-3 lg:text-2xl text-xl">
          Cadastro
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
          <div className="flex gap-x-2">
            <Input size="medium" type='text' placeholder='Nome' onChange={handleName}/>  
           </div>
        </div>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="flex gap-x-2">
            <Input size="medium" type='text' placeholder='CPF' onChange={handleCPF}/>  
           </div>
        </div>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="flex gap-x-2">
            <Input size="medium" type='number' placeholder='Telefone' onChange={handlePhone}/>  
           </div>
        </div>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Button variant="contained" size="large" color="primary" onClick={handleSubmit} >
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

export default Cadastrar;