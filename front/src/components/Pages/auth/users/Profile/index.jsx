const Profile = (props) => {
    return (
        <div>
            <h3>Dzień dobry UserName</h3>
        <div class="mt-3">
            <h4>
                Ranga konta: 
            </h4>
            <h4>Dane osobowe: </h4>
            <b>Imię i nazwisko: </b><br />
            <b>Data urodzenia: </b> <br />
            <b>Płeć: </b>
        </div>

        <a href="/user/logout">Wyloguj się</a>
        <a href="/user/edit">Zmień dane osobowe</a>
        <a href="/user/password">Zmień hasło</a>
        <a href="/user/delete">Usuń konto</a>

        
        {/* Admin staff goes here */}
        </div>
    )
}

export default Profile