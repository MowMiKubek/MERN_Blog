import { useParams } from "react-router-dom"

const content = {metody:`
<h2 class="section-heading">Metody układania kostki Rubika</h2>
<p>
Słowem wstępu kostka Rubika jest łamigłówką polegającą na ułożeniu klocków tak aby każda ze ścian posiadała jeden kolor.
</p>
<p>
Istnieje wiele metod układania kostek Rubika. Dzielimy je głównie ze względu na szybkość układania, ilość wykorzystywanych algorytmów i sposób trudności. Poniżej znajdują się metody, dzięki którym dowiesz się jak ułożyć kostkę Rubika na różne sposoby. Lista została podzielona na metody popularne, polskie systemy oraz takie, które pozwalają ułożyć kostkę Rubika bez patrzenia.
</p>
<h3>Najpopularniejsze metody układania kostki Rubika:</h3>
<ul>
<li>
LBL (Layer by Layer) - jest to najłatwiejsza metoda, zalecana dla początkujących układaczy. Wykorzystuje kilka prostych algorytmów. Rozpoczyna się od ułożenia krzyża i narożników na warstwie pierwszej. Kolejnym etapem jest ustawienie krawędzi na środkowej warstwie. W ostatnim kroku układa się krzyż na trzeciej warstwie, ustawia się na rożniki i je odpowiednio obraca.
</li>
<li>
metoda Fridrich - jest najpopularniejszą metodą układania dla speedcuberów - czyli układaczy zaawansowanych. Ogólny zarys metody został opracowany przez Jessicę Fridrich, a sama metoda jest rozwijana do dziś przez speedcuberów na całym świecie. Początkowo zakładano, że tym sposobem będzie można ułożyć kostkę nie krócej niż w 16s, jednak najlepsi pokazali, że da się nim zejść do poziomu kilku sekund. Technikę możemy podzielić na uproszczoną i pełną, która zawiera znacznie większą ilość algorytmów. Układanie rozpoczyna się od krzyża i ułożenia tak zwanych “slotów” czyli połączenia narożników i krawędzi (F2L). Kolejno układany jest pełny kolor na ostatniej warstwie (OLL) po czym permutuje się ostatnią warstwę (PLL).
<img src="../assets/img/jessica.jpg" class="img-thumbnail mx-auto d-block" alt="Jessica Fridrich">
<span class="caption text-muted">Jessica Fridrich</span>		
</li>
<li>
metoda Rouxa - polega na ułożeniu dwóch bloków 3x2x1 po dwóch stronach kostki, a później na czterech pozostałych rogów na górnej warstwie. Ostatnim etapem w tej technice jest orientacja krawędzi.
</li>
<li>
metoda Petrusa - również popularna technika składająca się z 5 etapów. Budowy bloku 2x2x2, a w następnej kolejności rozszerzenie go do 3x2x2. Późnej orientowane są pozostałe 7 krawędzi i rozszerza się blok do 3x3x2. Na koniec układamy ostatnią warstwę.
</li>
</ul>`,
rekord: `
<h2>
    Tymon Kolasiński pobił rekord świata.
</h2>
<p>
    Niezwykłe wydarzenie miało miejsce 19 grudnia. Po 12 latach Polak pobiłe rekord świata w konkurencji 3x3, czyli ułożeniu klasycznej kostki Rubika. Uzyskał czas 5,09 s.
Rekord został pobity podczas odbywających się w Lubartowie zawodów Cubers Eve Lubartów 2021, w których rywalizowała ponad setka uczestników z kraju i zagranicy. Kolasiński aż o 0,23 s wyprzedził Maxa Parka. Podczas zawodów Missoula 2021 Amerykanin uzyskał rezultat 5,32 s. </p>
<p>
Wynik Tymona, 5,09 s to średni czas pięciu ułożeń kostki. Do wyniku nie wliczają się najlepszy i najgorszy rezultat. Nastolatek uzyskał czasy 4.73, 4.83, 5.24, 6.57 oraz 5.20. 
</p>
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
    <div class="carousel-inner">
    <div class="carousel-item active">
        <img src="../assets/img/rekord/tymon1.jpg" class="d-block w-100" alt="Tymon Kolasiński">
    </div>
    <div class="carousel-item">
        <img src="../assets/img/rekord/tymon2.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
        <img src="../assets/img/rekord/tymon3.jpg" class="d-block w-100" alt="...">
    </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
</div>
<span class="caption text-muted">Tymon Kolasiński. Rekordzista Świata</span>
<p>
16-letni poznaniak jest drugim Polakiem w historii, który pobił rekord świata. W 2009 roku dokonał tego Tomasz Żołnowski. Uzyskał wtedy czas 10,07 sekund.
</p>
<img src="../assets/img/rekord/tomasz.jpg" class="d-block w-100" alt="...">
<span class="caption text-muted">Tomasz Żołnowski. Pierwszy polski rekordzista świata</span>
<p>
Nie sposób nie przywołać tutaj postaci Michała Pleskowicza. Jako jedyny z całej trójki zdobył w 2011 roku najwyższe wyróżnienie w speedcubingu - tytuł Mistrza Świata. Pokonał on wtedy pokonując innego pretendenta do tytułu, prawdopodobnie najlepszego speedcubera wszeczasów - Feliksa Zemdegsa. Dokonania wcześniej wymienionych panów i tak są wielkie. Należy jednak pamiętać, że pobicie rekordu świata możliwe jest na dowolnych, oficjalnych zawodach. Z kolei mistrza świata wyłania się na mistrzostwach, które wystepują raz na 2 lata. Na zawody tej rangi najpierw należy się zakwalifikować, uzyskań miejsce w finale walcząc z nalepszymi układaczami i wreszcie... pokazać kto jest najlepszy. 
</p>
<img src="../assets/img/rekord/michal.jpg" class="d-block w-100" alt="...">
<span class="caption text-muted">Michał "Plechoss" Pleskowicz. Mistrz Świata z 2011 roku.</span>
<p>
<p>
Czy Tymon może pójść w ślady Michała Pleskowicza? Wszyscy trzymamy za niego kciuki, ale na razie to pytanie pozostanie bez odpowiedzi.
</p>`
}

//? For testing purposes
const getPost = (postName) => {
    if(content.hasOwnProperty(postName))
        return content[postName]
    return `<p>Nie znaleziono postu o kluczu ${postName}</p>`
}

const PostPage = (props) => {
    const { postid } = useParams()
    const postContent = getPost(postid)
    return (
        <div>
            <h2 className="section-heading">{props.title}</h2>
            <div dangerouslySetInnerHTML={{__html: postContent}}/>
        </div>
    )
}

export default PostPage