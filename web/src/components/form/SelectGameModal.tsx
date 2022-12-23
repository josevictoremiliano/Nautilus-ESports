import axios from 'axios';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Game } from '../../App';



export default function SelectGameModal() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios('http://localhost:3030/games')
            .then(response => { setGames(response.data) })
    }, []);

    return (
       
            <select id="game" defaultValue="" className='bg-zinc-900 py-3 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50'>
                <option disabled value=""> Selecione o game que deseja jogar </option>
                {games.map(game => {
                    return (
                        <option value={game.id} key={game.id}>{game.title}</option>
                    )}
                )}
            </select>

    )
}
