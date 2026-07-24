
const openAddCarModalBtn = document.getElementById("btn-addCar");
const closeModalBtn = document.getElementById("btnCloseModal");
const saveCarBtn = document.getElementById("btnSaveCar");

const modal = document.getElementById("carModal");

const carForm = document.getElementById("carForm");

carForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(carForm);

    const car = Object.fromEntries(formData);

    saveCar(car);
});

//event listeners
openAddCarModalBtn.addEventListener("click", () => {
modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
modal.classList.add("hidden");
});



const cars = [
    {
        id: 1,
        registration: "ABC123",
        brand: "Volvo",
        model: "V90",
        year: 2022,
        priceDay: 89,
        priceHour: 19,
        status: "Available"
    },
        {
        id: 2,
        registration: "ABC456",
        brand: "Volvo",
        model: "V60",
        year: 2011,
        price: 89,
        status: "Available"
    }
];

function renderCars(){
const carsGrid = document.getElementById("cars__grid");
carsGrid.innerHTML = "";
for (car of cars){
    carsGrid.innerHTML += createCarCard(car);
}
}

function createCarCard(car){
return `<article class="car-card">

                    <div class="car-card__image"><img src="images/bmw.png" alt="Avatar" style="width:100%"></div>

                    <div class="car-card__body">
                        <div class="car-card__info">
                        <h3 class="car-card__title">
                            ${car.brand} ${car.model}
                        </h3>

                        <p class="car-card__year">
                            ${car.year}
                        </p>
                        </div>
                        <div class="car-card__pricing">
                            <p class="car-card__hour-price">
                                ${car.priceHour}€/h
                            </p>

                            <p class="car-card__day-price">
                                ${car.priceDay}€/day
                            </p>
                        </div>


                    </div>

                </article>`
}

function saveCar(car){
    
let carsList = JSON.parse(localStorage.getItem("cars")) || [];
carsList.push(car);
localStorage.setItem("cars", JSON.stringify(carsList));
}

renderCars();