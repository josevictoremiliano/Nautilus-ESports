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
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios('http://localhost:3030/games')
            .then(response => { setGames(response.data) })
    }, []);

    async function handleCreateGame(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.name) {
            alert('Nome é obrigatório');
            return;
        }

        try {
            await axios.post(`http://localhost:3030/games/`, {
                
                name: data.name,
                yearsPlaying: Number(data.yearsPlayed),
                discord: data.discord,
                weekdays: weekDays.map(Number),
                hoursStart: data.hoursStart,
                hoursEnd: data.hoursEnd,
                useVoiceChannel: useVoiceChannel,
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
                        <Input type="text" name="name" id="game" placeholder='Nome do Jogo' />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <label htmlFor="linkFoto" className="font-semibold">O link da foto</label>
                        <Input type="text" name="linkFoto" id="title" placeholder='Link da foto' />
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