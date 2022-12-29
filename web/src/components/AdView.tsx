import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { CopySimple } from "phosphor-react";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
}
interface Ads {
  name: string,
  yearsPlaying: string,
  discord: string,
  weekdays: string,
  hoursStart: string,
  hoursEnd: string,
  useVoiceChannel: boolean
}

interface AdViewProps {
  ad: Ads;
}

export default function AdView({ ad }: AdViewProps) {
  const [useVoiceChannel, setUseVoiceChannel] = useState<string[]>([])
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
  // mostrar quantidade de dias somados
  const days = ad.weekdays.length




  return (
    <div className="bg-[#2A2634] hover:bg-[#211e29] px-8 py-6 flex justify-between items-center rounded-md">
      <div>
        <span className="text-zinc-400 block">
          Nome
        </span>
        <strong className="text-1xl text-white font-black block">
          {ad.name}
        </strong>
        <span className="text-zinc-400 block mt-2">
          Tempo de jogo
        </span>
        <span className="text-1xl text-white font-black block">
          Jogando a {ad.yearsPlaying} anos
        </span>
       
        <span className="text-zinc-400 block mt-2">
          Disponibilidade
        </span>
        <span className="text-1xl text-white font-black block">
          {days} ° {ad.hoursStart} - {ad.hoursEnd}
        </span>
        <span className="text-zinc-400 block mt-2">
          Chamada de áudio?
        </span>
        <span className={`text-1xl font-black block ${ad.useVoiceChannel.valueOf() ? 'text-emerald-300' : 'text-red-500'}`}>
          {ad.useVoiceChannel ? "Sim" : "Não"}
        </span>
        <span className="text-zinc-400 block mt-2">
          Discord
        </span>
        <a className="text-zinc-400 block hover:text-zinc-100 hover:cursor-pointer flex gap-2 text-center content-center" onClick={handleCopyClick} >
          <span className="text-white hover:text-yellow-300 flex gap-2">{ad.discord} <CopySimple className="text-lg pt-1"/> </span> 
        </a>

      </div>



    </div>
  );
}
