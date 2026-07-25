
const openAddCarModalBtn = document.getElementById("btn-addCar");
const closeModalBtn = document.getElementById("btnCloseModal");
const saveCarBtn = document.getElementById("btnSaveCar");

const carModal = document.getElementById("carModal");

const carForm = document.getElementById("carForm");

const carsGrid = document.getElementById("cars__grid");

//let cars = getCars();
let editingCarId = null;

carForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(carForm);

    const car = Object.fromEntries(formData);
    if (editingCarId === null)
        saveCar(car);
    else
        updateCar(car);
    carForm.reset();
});

//event listeners
openAddCarModalBtn.addEventListener("click", () => {
    carModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
    carModal.classList.add("hidden");
    editingCarId = null;
});

//open edit car carModal
carsGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        const id = event.target.dataset.id;
        openEditCarModal(id);
    }

});


function openEditCarModal(id) {
    const cars = getCars();
    const car = cars.find(car => car.registration === id);

    editingCarId = id;

    const inputRegistration = document.getElementById("input-registration");
    const inputBrand = document.getElementById("input-brand");
    const inputModel = document.getElementById("input-model");
    const inputImgUrl = document.getElementById("input-img-url");
    const inputYear = document.getElementById("input-year");
    const inputPriceDay = document.getElementById("input-price-day");
    const inputPriceHour = document.getElementById("input-price-hour");

    inputRegistration.value = car.registration;
    inputBrand.value = car.brand;
    inputModel.value = car.model;
    inputImgUrl.value = car.imgUrl;
    inputYear.value = car.year;
    inputPriceDay.value = car.priceDay;
    inputPriceHour.value = car.priceHour;

    const modalHeader = document.getElementById("modalHeader");
    modalHeader.textContent = "Edit car";
    const btnSaveCar = document.getElementById("btnSaveCar");
    btnSaveCar.textContent = "Update";

    carModal.classList.remove("hidden");
}

/* 
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
]; */

function renderCars() {
    const carsGrid = document.getElementById("cars__grid");
    carsGrid.innerHTML = "";
    const cars = getCars();
    for (car of cars) {
        carsGrid.innerHTML += createCarCard(car);
    }
}

function getCars() {
    let cars = JSON.parse(localStorage.getItem("cars"));
    if (cars) return cars;

    else cars = [];
}

function saveCars(cars){
    localStorage.setItem("cars", JSON.stringify(cars));
}

function createCarCard(car) {
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

                        <button class="edit-btn" data-id=${car.registration} id="editCar">edit</button>
                    </div>

                </article>`
}

function saveCar(car) {
    const id = car.registration;
    let cars = getCars();
    if(cars.find(car => car.registration == id))
        console.log("car with that registration already exists");
    else{
        cars.push(car);
        saveCars(cars);
        console.log("car saved");
    }
}
function updateCar(inputCar) {
    let cars = getCars();
    let car = cars.find(car => car.registration === editingCarId);
/* 
    const inputRegistration = document.getElementById("input-registration");
    const inputBrand = document.getElementById("input-brand");
    const inputModel = document.getElementById("input-model");
    const inputImgUrl = document.getElementById("input-img-url");
    const inputYear = document.getElementById("input-year");
    const inputPriceDay = document.getElementById("input-price-day");
    const inputPriceHour = document.getElementById("input-price-hour"); */

    car.registration = inputCar.registration
    car.brand = inputCar.brand;
    car.model = inputCar.model;
    car.imgUrl = inputCar.imgUrl;
    car.year = Number(inputCar.year);
    car.priceDay = Number(inputCar.priceDay);
    car.priceHour = Number(inputCar.priceHour);

    saveCars(cars);
    carModal.classList.add("hidden");
    renderCars();
    editingCarId = null;
}

renderCars();