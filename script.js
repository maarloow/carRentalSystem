const addCarBtn = document.getElementById("btn-addCar");
const closeModal = document.getElementById("btnCloseModal")
const modal = document.getElementById("carModal");

//event listeners
addCarBtn.addEventListener("click", () => {
modal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
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

renderCars();