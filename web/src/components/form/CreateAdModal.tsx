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

export function CreateAdModal() {
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios('http://localhost:3030/games')
            .then(response => { setGames(response.data) })
    }, []);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        const select = document.getElementById("game") as HTMLSelectElement;

        if (!data.name) {
            alert('Nome é obrigatório');
            return;
        }

        try {
            await axios.post(`http://localhost:3030/games/${select.value}/ads`, {
                
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
                    Publique anúncio
                </Dialog.Title>

                <form onSubmit={handleCreateAd} action="" className=" text-white mt-4 flex flex-col gap-4 w-full">
                    <div className='flex flex-col  gap-2'>
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <select id="game" defaultValue="" className='bg-zinc-900 py-3 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50'>
                            <option disabled value=""> Selecione o game que deseja jogar </option>
                            {games.map(game => {
                                return (
                                    <option value={game.id} key={game.id}>{game.title}</option>
                                )
                            }
                            )}
                        </select>
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <label htmlFor="name" className="font-semibold">Seu nome ou nickname</label>
                        <Input type="text" name="name" id="title" placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col  gap-2'>
                            <label htmlFor="yearsPlayed" className="font-semibold">Joga há quantos anos?</label>
                            <Input type="text" name="yearsPlayed" id="yearsPlayed" placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord" className="font-semibold">Qual o seu Discord</label>
                            <Input type="text" name="discord" id="discord" placeholder='Seu usuário no Discord' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col  gap-2'>
                            <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>

                            <ToggleGroup.Root type="multiple" onValueChange={setWeekDays} value={weekDays} className="grid grid-cols-4 gap-2">
                                <ToggleGroup.Item value='0' className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Domingo">D</ToggleGroup.Item>
                                <ToggleGroup.Item value='1' className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Segunda">S</ToggleGroup.Item>
                                <ToggleGroup.Item value='2' className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Terça">T</ToggleGroup.Item>
                                <ToggleGroup.Item value='3' className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quarta">Q</ToggleGroup.Item>
                                <ToggleGroup.Item value='4' className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quinta">Q</ToggleGroup.Item>
                                <ToggleGroup.Item value='5' className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sexta">S</ToggleGroup.Item>
                                <ToggleGroup.Item value='6' className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sabado">S</ToggleGroup.Item>
                            </ToggleGroup.Root>

                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor='hoursStart' className="font-semibold">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input type="time" name="hoursStart" id="hoursStart" placeholder='De' />
                                <Input type="time" name="hoursEnd" id="hoursEnd" placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className=' mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900' checked={useVoiceChannel} onCheckedChange={(checked) => {
                            if (checked === true) {
                                setUseVoiceChannel(true)
                            } else {
                                setUseVoiceChannel(false)
                            }
                        }}>
                            <Checkbox.Indicator className='w-4 h-4 rounded bg-zinc-900'>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>

                        Costumo me conectar ao char de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close type='button' className='bg-zinc-500 text-white font-semibold py-2 px-5 h-12 rounded-md hover:bg-zinc-600'>
                            Cancelar
                        </Dialog.Close>
                        <button type='submit' className='bg-violet-500 font-semibold px-5 h-12 rounded-md flex items-center gap-3 hover:bg-violet-600'>
                            <GameController className="self-center  w-6 h-6" />
                            Encontrar duo
                        </button>

                    </footer>
                </form>


            </Dialog.Content>
        </Dialog.Portal>
    )
}