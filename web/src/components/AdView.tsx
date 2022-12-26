import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
}
interface Ads {
  name: string,
  yearsPlaying: string,
  discord: string,
  weekDays: number,
  hourStart: string,
  hourEnd: string,
  useVoiceChannel: boolean
}

interface AdViewProps {
  ad: Ads;
}

export default function AdView({ ad }: AdViewProps) {
  const [ads, setAds] = useState<AdViewProps[]>([]);

  useEffect(() => {
    const gameId = window.location.pathname.split('/')[2]
    axios.get(`http://localhost:3030/games/${gameId}/ads`).then((response) => {
      setAds(response.data);
    });
  }, []);

  //copiar texto e notificar a copia após alert aparecer sumir alert apos 5s
  function handleCopyClick() {
    navigator.clipboard.writeText(ad.discord);
    alert("Copiado com sucesso! "+ ad.discord)
    
  }
 


  
  return (
    <div className="bg-[#2A2634] hover:bg-[#211e29] px-8 py-6 flex justify-between items-center rounded-md">
      <div>
        <strong className="text-2xl text-white font-black block">
          {ad.name}
        </strong>
        <span className="text-zinc-400 block">
          Jogando a {ad.yearsPlaying} anos
        </span>
        <a className="text-zinc-400 block hover:text-zinc-100 hover:cursor-pointer" onClick={handleCopyClick} >
          Discord: <span className="text-white hover:text-yellow-300">{ad.discord}</span>
        </a>
        <span className="text-zinc-400 block">
          {ad.weekDays}
        </span>
        <span className="text-zinc-400 block">
          {ad.hourStart}
        </span>
        <span className="text-zinc-400 block">
          {ad.hourEnd}
        </span>
        <span className="text-zinc-400 block">
          {ad.useVoiceChannel}
        </span>
      </div>



    </div>
  );
}
