


let container = document.querySelector('.container');
const allSeats = document.querySelectorAll(".container .seat");
const notOccupiedSeats = document.querySelectorAll(".container.seat:not(.occupied");

const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");

let movieSelectBox = document.getElementById('movie');

//! önce localSorage sonra select box (sayfa yüklendiginde)
//! initial value == movieSelectBox.value
let currentTicketPrice = localStorage.getItem("selectedmoviePrice") ? localStorage.getItem("selectedmoviePrice") : movieSelectBox.value //! movieSelectBox.options[movieSelectBox.selectedIndex].value ==  movieSelectBox.value

//! movie index(sayfa yüklenince en güncel mocie index)
let currentMovieIndex = localStorage.getItem('selectedMovieIndex') ? localStorage.getItem('selectedMovieIndex') : movieSelectBox.selectedIndex

window.onload = () => {
    
    displaySeats();
    updateMovieInfo();
}

//! change  film and localStorage
movieSelectBox.addEventListener("change", (e)=>{
    let ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex;
    //console.log(movieIndex);

    setMovieDateToLocalStorage(ticketPrice, movieIndex) //! refresh attigimda ayni verileri elimde tutmak istedigim icin localStorage de bilgileri bir fonk. ile turmam gerekiyor
    updateMovieInfo();
    
});



//! add to storage
const setMovieDateToLocalStorage = (ticketPrice, movieIndex) => {
    localStorage.setItem('selectedMovieIndex',movieIndex)
    localStorage.setItem('selectedmoviePrice', ticketPrice)
}


//!capturing
container.addEventListener("click",(e)=>{
    //console.log(e.target.classList);
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
        //console.log(e.target.classList);
    }
    /* if(e.target.classList.contains("seat") && e.target.classList.contains("occupied")){
        alert("please select an unreserved seat")
    } */

    updateMovieInfo(currentMovieIndex);
})


//!update paragraph and calculation
const updateMovieInfo = () => {


    let selectedSeats = document.querySelectorAll(".row .seat.selected") //! bosluk yoksa her ikisini bir yerde aramaliyim diyor
    //let selectedSeats2 = document.querySelectorAll(".row.seat .selected") //! Bosluk varsa parent iliskisi ariyor

    let selectedseatsIndexArray = [...selectedSeats].map((seat) => [...allSeats].indexOf(seat));
        //console.log(selectedseatsIndexArray);
    localStorage.setItem("selectedSeats", JSON.stringify(selectedseatsIndexArray));

    count.innerText = selectedseatsIndexArray.length
    total.innerText = selectedseatsIndexArray.length * movieSelectBox.value;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0]; 
}

//! after refresh get selectedSeats and add class "selected"
const displaySeats = () => {
    movieSelectBox.selectedIndex = currentMovieIndex;
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeatsFromStorage);
    if(selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0){
        allSeats.forEach((seat, index) => {
            if(selectedSeatsFromStorage.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        })
    }
}












