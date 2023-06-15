import './styles.module.css'

const TimerPage = (props) => {
    return (
    <div>
    <p id="scramble">SCRAMBLE POJAWI SIĘ TUTAJ</p>
    <p id="timer">0.00</p>

    <div className="timer">
        <table className="statistics">
            <caption className="caption-top">Statystyki</caption>
            <tbody>
                <tr>
                    <th>Best</th>
                    <td id="timerBest">---</td>
                </tr>
                <tr>
                    <th>Worst</th>
                    <td id="timerWor">---</td>
                </tr>
                <tr>
                    <th>Median</th>
                    <td id="timerMed">---</td>
                </tr>
                <tr>
                    <th>Average</th>
                    <td id="timerAvg">---</td>
                </tr>
                <tr>
                    <th><a href="posty/slownik.html#ao5">Ao5</a></th>
                    <td id="timerAo5">---</td>
                </tr>
                <tr>
                    <th>Ao12</th>
                    <td id="timerAo12"></td>
                </tr>
                <tr>
                    <th>Ao50</th>
                    <td id="timerAo50">---</td>
                </tr>
                <tr>
                    <th>Ao100</th>
                    <td id="timerAo100">---</td>
                </tr>
            </tbody>
        </table>
        
        <div className="solveList">
            <h5>Ułożenia</h5>
            <ol id="timeList" reversed></ol>
        </div>
    </div>
    <div className="d-flex justify-content-center">
        <a href="javascript:showTimeInfo()" className="link-primary">Pokaż szczegóły</a>
        <a href="javascript:removeTime()" className="link-warning">Usuń czas</a>
        <a href="javascript:clearTimes()" className="link-danger">Wyczyść czasy</a>
    </div>	
    </div>
    )
}

export default TimerPage
