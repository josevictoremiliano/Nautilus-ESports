import { useRouteError } from "react-router-dom";
import logoImg from './assets/logo.svg'

export default function ErrorPage() {
  //error vindo de useRouteError tipado
  const error = useRouteError() as { message: string; statusText: string;};


  return (
    <div id="error-page">
      <div className="max-w-[1344px] mx-auto flex items-center flex-col my-10">
        <img src={logoImg} alt="Logo"  className='max-w-[250px]'/>

        <h3 className="text-4xl font-black text-white ">
          Ops...
        </h3>
        <h3 className=' text-5xl bg-white bg-clip-text text-transparent py-2'>Aconteceu algo errado</h3>
        <p className='bg-nlw-gradient bg-clip-text text-transparent text-6xl px-2 '>
          <i>{error.statusText || error.message} </i>
        </p>
        <a href="/" className="bg-amber-500 hover:bg-amber-700 py-2 px-4 rounded-md"> Voltar</a>
      </div>      
    </div>
  );
}