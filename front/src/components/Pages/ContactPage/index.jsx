const ContactPage = (props) => {
    return (
    <form className="needs-validation">
        Płeć<br />
        <div className="form-check">
            <input type="radio" className="form-check-input" id="kobieta" name="plec" required />
            <label className="form-check-label" for="kobieta">Kobieta</label>
        </div>
        <div className="form-check">
            <input type="radio" className="form-check-input" id="mezczyzna" name="plec" required />
            <label className="form-check-label" for="mezczyzna">Mężczyzna</label>
            <div className="invalid-feedback">Wybierz płeć.</div>
        </div>
        <div className="col-md-6 mb-3">
            <label for="imie">Imie</label>
            <input type="text" className="form-control" id="imie" placeholder="Imie..." pattern="^[A-ZĄĆĘŁŃÓŹŻ][a-ząćęłńóźż]+$" required />
            <div className="valid-feedback">Wygląda dobrze!</div>
            <div className="invalid-feedback">Wpisz imie.</div>
        </div>
        <div className="col-md-6 mb-3">
            <label for="drugieimie">Drugie imie (opcjonalnie)</label>
            <input type="text" className="form-control" id="drugieimie" placeholder="Drugie imie..." pattern="^[A-ZĄĆĘŁŃÓŹŻ][a-ząćęłńóźż]+$" />
            <div className="invalid-feedback">Wpisz poprawnie imie.</div>
        </div>
        <div className="col-md-6 mb-3">
            <label for="nazwisko">Nazwisko</label>
            <input type="text" className="form-control" id="nazwisko" placeholder="Nazwisko..." pattern="^[A-ZĄĆĘŁŃÓŹŻ][a-ząćęłńóźż]+([\-][A-ZĄĆĘŁŃÓŹŻ][a-ząćęłńóźż]+)?$" required />
            <div className="valid-feedback">Wygląda dobrze!</div>
            <div className="invalid-feedback">Wpisz nazwisko.</div>
        </div>
        <div className="col-md-6 mb-3">
            <label for="email">Email</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                </div>
                    <input type="email" className="form-control" id="email" placeholder="Email..." required />
                    <div className="valid-feedback">Wygląda dobrze!</div>
                    <div className="invalid-feedback">Podaj poprawny email.</div>
                </div>
        </div>
        <div className="col-md-6 md-3">
            <label for="temat" className="form-label">W jakiej sprawie chcesz się skontaktować</label>
            <select className="form-select" id="temat" required>
                <option selected disabled value="">Wybierz temat</option>
                <option value="lekcja">Lekcja układania kostki</option>
                <option value="zawody">Udział w zawodach</option>
                <option value="pytanie">Pytanie</option>
                <option value="inne">Inne</option>
            </select>
            <div className="invalid-feedback">
                Wybierz jeden z tematów.
            </div>
            </div>
        <div className="form-group col-md-12 mb-6">
            <label for="wiadomosc">Wiadomość</label>
            <textarea className="form-control" id="wiadomosc" rows="5" placeholder="Wpisz wiadomość..." required></textarea>
            <div className="valid-feedback">
                Wygląda dobrze!
            </div>
            <div className="invalid-feedback">
                Wiadomość nie może być pusta.
            </div>
        </div>
        <div className="form-group mb-6">
        <div className="form-check">
            <input className="form-check-input" type="checkbox" id="invalidCheck" required />
            <label className="form-check-label" for="invalidCheck">
            Potwierdzam poprawność powyższych danych
            </label>
            <div className="invalid-feedback">
            Musisz potwierdzić poprawność dancych
            </div>
        </div>
        </div>
        <button className="btn btn-primary" type="submit">Wyślij</button>
    </form>
    )
}

export default ContactPage