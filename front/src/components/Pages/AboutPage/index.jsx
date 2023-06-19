import axios from 'axios'
import { useState, useEffect } from 'react'

var e_names = {
    "333": "3x3x3", 
    "222": "2x2x2", 
    "444": "4x4x4",
    "555": "5x5x5",
    "pyram": "Pyraminx", 
    "333oh": "3x3x3 jedną ręką", 
    "skewb": "Skewb", 
    "clock": "Clock", 
    "minx": "Megaminx",
    "333bf": "3x3x3 bez patrzenia"
}
function getStringTime(time){
    if(!time)
        return ''
	var sekundy = Math.floor(time/100);
	var minuty = 0;
	while(sekundy>=60)
	{
		sekundy -= 60;
		minuty++;
	}
	var result = "";
	if(minuty>0)
		result += minuty.toString() + ":";
	if(minuty>0 && sekundy<10)
		result += "0";
	result += sekundy.toString() + '.';
	if(time%100<10)
		result += "0";
	result += time%100;
	return result;
}	

const getTable = data => {
    const keys = Object.keys(data)
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>NR</th>
                    <th>CR</th>
                    <th>WR</th>
                    <th>Single</th>
                    <th>Average</th>
                    <th>WR</th>
                    <th>CR</th>
                    <th>NR</th>
                </tr>
            </thead>
            <tbody>
                {keys.map(key => (
                    <tr key={key}>
                        <td>{e_names[key]}</td>
                        <td>{data[key].single.country_rank}</td>
                        <td>{data[key].single.continent_rank}</td>
                        <td>{data[key].single.world_rank}</td>
                        <td>{getStringTime(data[key].single.best)}</td>
                        <td>{getStringTime(data[key].average?.best)}</td>
                        <td>{data[key].average?.world_rank}</td>
                        <td>{data[key].average?.continent_rank}</td>
                        <td>{data[key].average?.country_rank}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const AboutPage = (props) => {
    const [data, setData] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/api/getwcadata/')
        .then(res => {
            const wcadata = res.data
            setData(wcadata)
        })
        .catch(err => {
            setError(true)
        })
    }, [])
    
    return (
        <div>
            <p>Nazywam się Jakub Tkaczyk. Jestem studentem 3. roku kierunku informatyka ze specjalnością inżynieria oprogramowania na Politechnice Lubelskiej.</p>
            <p>Można powiedzieć, że pasjonuję się próbowaniem nowych rzeczy. Żonglerka, szachy, programowanie czy taniec towarzyski to tylko kilka z moich pasji, spośród których wyróżnia się jednak speedcubing. Pierwszy raz kostkę Rubika ułożyłem 12 lat temu. Minęła już ponad dekada, a z nią minęły dziesiątki tysięcy ułożeń, jednak nawet dzisiaj kostka nie przestaje mnie zaskakiwać.</p>
            <p>W swojej najwyższej formie byłem 50 w Polsce. Dzisiaj nie występuję już tak często na zawodach. Zamiast tego zostałem instruktorem speedcubingu, aby móc przekazać moje doświadczenie dalej i zaszczepić pasję w kimś innym</p>
            <p>Poniżej możesz zobaczyć moje aktualne wyniki na tle Polski (NR), Europy (CR) i Świata (WR)</p>
            <div id="tresc">
            {
                <>
                {error && <p>Nie udało sie wczytać danych</p>}
                {Object.keys(data).length > 0 && getTable(data)}
                </>
            }
            </div>
            <blockquote className="blockquote">
                <p className="mb-0">We turn the Cube and it twists us.</p>
                <footer className="blockquote-footer">Erno Rubik</footer>
            </blockquote>
        </div>
    )
}

export default AboutPage