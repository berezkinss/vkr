import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBar/NavBar.jsx";
import {DndList} from "../../forms/DndList.jsx";
import cl from './Home.module.css'
import {Link} from "react-router-dom";
import CreateTournamentForm from "../../forms/CreateTournamentForm.jsx";
import TournamentForm from "../../forms/TournamentForm.jsx";
import TournamentEditForm from "../../forms/TournamentEditForm.jsx";
import {MantineProvider} from "@mantine/core";
import EditTournamentComponent from "../../forms/CreateTournamentForm.jsx";


const data2 = [
    {
        startDate: '2024-05-26',
        endDate: '2024-06-01',
        quantity: 20,
        symbol: 'М',
        name: 'Муниципальное первенство Приморского района по футболу'
    },
    {
        startDate: '2023-12-22',
        endDate: '2023-12-30',
        quantity: 15,
        symbol: 'К',
        name: 'Кубок Деда Мороза по мини-футболу'
    },
    {
        startDate: '2023-05-01',
        endDate: '2023-09-26',
        quantity: 24,
        symbol: 'П',
        name: 'Первенство Калининградской области по футболу.2023'
    },
];
const tournamentData = {
    name: 'Муниципальное первенство Приморского района по футболу',
    startDate: '2024-05-26',
    endDate: '2024-06-01',
    numberOfTeams: 20,
    activeReferees: ['Александр Березкин', 'Виталий Смирнов', 'Николай Петров'],
};

const Home = () => {

    const [data, setData] = useState(data2);

    // useEffect(() => {
    //     host.get('/get_user_info')
    //         .then((response) => {
    //             setData(response.data)
    //         })
    // }, [])

    return (
        <div className={cl.container}>
            <div className={cl.nav}>
                <NavBar/>
            </div>
            <div className={cl.nav}>
                <EditTournamentComponent/>
            </div>
        </div>

    );
};

export default Home;


// <div className={cl.content}>
//     <button style={{backgroundColor: 'aliceblue'}} onClick={() => setActive(Link.label)}>Новый турнир</button>
//     <DndList data={data} zhopa={123}/>
// </div>