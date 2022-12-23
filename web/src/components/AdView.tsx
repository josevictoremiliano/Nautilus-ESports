import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
}

export default function AdView(props : Game  ) {
  const [game, setGame] = useState<Game>({} as Game);

  useEffect(() => {
    axios.get(`http://localhost:3030/games/${game}`).then((response) => {
      setGame(response.data);
    });
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Vendo os anúncios do jogo {game.title}
        </Dialog.Title>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
