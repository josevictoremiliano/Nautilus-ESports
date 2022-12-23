import { Check, GameController } from "phosphor-react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Input } from "./Input";
import SelectGameModal from "./SelectGameModal";
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";

export interface Game {
    id: string;
    title: string;
    }

export function CreateGameModal() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios('http://localhost:3030/games')
            .then(response => { setGames(response.data) })
    }, []);

    async function handleCreateGame(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.game) {
            alert('Nome é obrigatório');
            return;
        }
        if (!data.linkFoto) {
            alert('Link da foto é obrigatório');
            return;
        }
        if (data.game) {
            const gameExists = games.find(game => game.title === data.game);
            if (gameExists) {
                alert('Jogo já cadastrado');
                return;
            }
        }

        try {
            await axios.post(`http://localhost:3030/games`, {
                
                title: data.game,
                bannerUrl: data.linkFoto,
            
            })
            alert('Anúncio criado com sucesso!')
        } catch (error) {
            alert('Erro ao criar anúncio!')
        }

        console.log(data);
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 bg-black/60' />
            <Dialog.Content className='fixed flex flex-col items-center justify-center py-8 px-10 bg-[#2A2634] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[486px] shadow-black/25'>
                <Dialog.Title className='text-3xl font-bold text-white'>
                    Publique um Jogo
                </Dialog.Title>

                <form onSubmit={handleCreateGame} action="" className=" text-white mt-4 flex flex-col gap-4 w-full">
                    <div className='flex flex-col  gap-2'>
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <Input type="text" name="game" id="game" placeholder='Nome do Jogo' />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <label htmlFor="linkFoto" className="font-semibold">O link da foto</label>
                        <Input type="text" name="linkFoto" id="linkFoto" placeholder='Link da foto' />
                    </div>


                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close type='button' className='bg-zinc-500 text-white font-semibold py-2 px-5 h-12 rounded-md hover:bg-zinc-600'>
                            Cancelar
                        </Dialog.Close>
                        <button type='submit' className='bg-violet-500 font-semibold px-5 h-12 rounded-md flex items-center gap-3 hover:bg-violet-600'>
                            <GameController className="self-center  w-6 h-6" />
                            Cadastrar
                        </button>

                    </footer>
                </form>


            </Dialog.Content>
        </Dialog.Portal>
    )
}