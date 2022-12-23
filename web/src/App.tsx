import* as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';

import logoImg from './assets/logo.svg'
import CreateAdBanner from './components/CreateAdBanner';
import GameBanner from "./components/GameBanner";
import { CreateAdModal } from './components/form/CreateAdModal';
import axios from 'axios';
import CreateGameBanner from './components/CreateGameBanner';
import { CreateGameModal } from './components/form/CreateGameModal';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3030/games')
        .then(response => { setGames(response.data) })
}, []);


  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-10">
      <img src={logoImg} alt="Logo"  className='max-w-[250px]'/>

      <h1 className="text-6xl font-black text-white ">
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>dou</span> esta aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>

        {games.map(game => {
          return (
            <GameBanner  
              key={game.id}
              bannerUrl={game.bannerUrl}
              gameName={game.title}
              adsCount={game._count.ads} 
              id={''}              
              />
          )
        })}

      </div>
      <Dialog.Root>
        <CreateAdBanner/>

        <CreateAdModal/>
      </Dialog.Root>
      
      <Dialog.Root>
        <CreateGameBanner />

        <CreateGameModal />
      </Dialog.Root>
      
    </div>
  )
}

export default App
