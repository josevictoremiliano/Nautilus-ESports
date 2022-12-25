import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';

import logoImg from './assets/logo.svg'
import CreateAdBanner from './components/CreateAdBanner';
import GameBanner from "./components/GameBanner";
import { CreateAdModal } from './components/form/CreateAdModal';
import axios from 'axios';
import CreateGameBanner from './components/CreateGameBanner';
import { CreateGameModal } from './components/form/CreateGameModal';
import AdView from './components/AdView';
import { ArrowBendDoubleUpLeft, ArrowCircleLeft, ArrowCircleUpLeft } from 'phosphor-react';

interface Game {
    title: string;
    
}

interface Ads{
    name: string,
    yearsPlaying: string,
    discord: string,
    weekDays: number,
    hourStart: string,
    hourEnd: string,
    useVoiceChannel: boolean
}

export default function AdsPage() {
    //Ver a url do game clicado e mostrar as ads 
    const [ads, setAds] = useState<Ads[]>([])
    const [game, setGame] = useState<Game[]>([])


    useEffect(() => {
        const gameId = window.location.pathname.split('/')[2]
        axios.get(`http://localhost:3030/games/${gameId}`)
            .then(response => {
                setGame(response.data)
            })
        axios.get(`http://localhost:3030/games/${gameId}/ads`)
            .then(response => {
                setAds(response.data)
            })
    }, [])
    

    return (
        <div className="max-w-[1344px] mx-auto flex items-center flex-col my-10">
            <img src={logoImg} alt="Logo" className='max-w-[250px]' />

            <div className='flex gap-2'>
                <a href="/" className='btn bg-violet-700 hover:bg-violet-500 rounded-md p-2 flex gap-1 justify-center self-center text-center'>
                    <ArrowCircleLeft className='text-2xl' />
                    Voltar
                </a>
            <h1 className="text-3xl font-black text-white ">
                Você esta vendo os anuncios do jogo <span className='bg-nlw-gradient bg-clip-text text-transparent'>{game.title}</span>
            </h1>

            </div>
        
            <div className=' mt-16 flex gap-3'>
                    {ads.map((ad: Ads) => (
                        <AdView ad={ad} />  
                    ))}

            </div>

        </div>
    )

}

