import { getCars, saveCars } from "./storage.js";
import { registerCarEvents } from "./events.js";
import { getRentals } from "./storage.js";


let editingCarId = null;
let app = document.getElementById("app");
// ---------------------
// State
// ---------------------

export function getEditingCarId() {
    return editingCarId;
}

export function setEditingCarId(id) {
    editingCarId = id;
}

// ---------------------
// Render
// ---------------------

export function renderCars() {
    const carsGrid = document.getElementById("cars__grid");
    carsGrid.innerHTML = "";
    const cars = getCars();
    for (const car of cars) {
        carsGrid.innerHTML += createCarCard(car);
    }
}

function createCarFilter() {
    return `<aside class="filter" id="car-filter">

            <h2 class="filter__title">Search</h2>

            <div class="filter__group">
                <label class="filter__label" for="brand">Brand</label>
                <select class="filter__select" id="brand">
                    <option>All brands</option>
                </select>
            </div>

            <div class="filter__group">
                <label class="filter__label" for="model">Model</label>
                <select class="filter__select" id="model">
                    <option>All models</option>
                </select>
            </div>

            <div class="filter__group">
                <label class="filter__label" for="price">Maximum price/day</label>
                <input class="filter__input" type="number" id="price">
            </div>

            <div class="filter__group">
                <label class="filter__label" for="year">Minimum year</label>
                <input class="filter__input" type="number" id="year">
            </div>

            <button class="filter__button">
                Search
            </button>

        </aside>`;
}

function createCarsSection() {
    return `<section class="cars">

            <div class="cars__grid" id="cars__grid">

            </div>

        </section>`;
}

function createCarCard(car) {
    return `<article class="car-card">

                    <div class="car-card__image"><img src="${car.imgUrl}" alt="Avatar" style="width:100%"></div>

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

                        <button class="edit-btn" data-id=${car.id} id="editCar">edit</button>
                        <button class="book-btn" data-id=${car.id} id="bookCar">Book</button>
                    </div>

                </article>`
}

export function renderCarsPage() {

    app.innerHTML = `   
         ${createCarFilter()}
         ${createCarsSection()}
    `;



    renderCars();

    registerCarEvents();

}

// ---------------------
// Create
// ---------------------

export function saveCar(car) {
    car.id = crypto.randomUUID();
    let cars = getCars();
    cars.push(car);
    saveCars(cars);
    console.log("car saved");
}


// ---------------------
// Update
// ---------------------

export function updateCar(updatedCar) {

    const cars = getCars();

    const index = cars.findIndex(car => car.id === editingCarId);

    if (index === -1) {
        return;
    }

    updatedCar.id = editingCarId;

    cars[index] = updatedCar;

    saveCars(cars);

    editingCarId = null;
}

// ---------------------
// Delete
// ---------------------

export function deleteCar() {

    const cars = getCars();

    const index = cars.findIndex(car => car.id === editingCarId);

    if (index === -1) {
        return index;
    }

    cars.splice(index, 1);

    saveCars(cars);

    editingCarId = null;
}

// ---------------------
// Get
// ---------------------

export function getCar(id) {
    const cars = getCars();
    let car = cars.find(car => car.id === editingCarId);
    return car;
}


export function renderCarSelect(startDate, endDate) {

    const carSelect = document.getElementById("carSelect");

/*     if (startDate && endDate) {
        const cars = cars.filter(car =>
            isCarAvailable(car.id, startDate, endDate)
        );
    }
    else
        alert("need dates to find available cars!"); */
    const cars = getCars();
    carSelect.innerHTML = `
        <option value="">Select car</option>
        ${cars.map(createCarOption).join("")}
    `;
}

export function isCarAvailable(carId, startDate, endDate) {

    const rentals = getRentals();

    return !rentals.some(rental => {

        if (rental.carId !== carId) {
            return false;
        }

        return (
            startDate <= rental.endDate &&
            endDate >= rental.startDate
        );

    });
}

function createCarOption(car) {

    return `
        <option value="${car.id}">
            ${car.brand} ${car.model} (${car.registration})
        </option>
    `;
}








// ---------------------
// Edit
// ---------------------
/* 
export function openEditCarModal(id) {

    const cars = getCars();

    const car = cars.find(car => car.id === id);

    if (!car) {
        return;
    }

    editingCarId = id;

    document.getElementById("modalHeader").textContent = "Edit car";
    document.getElementById("btnSaveCar").textContent = "Update";

    document.getElementById("btnDeleteCar").classList.remove("hidden");

    document.getElementById("input-registration").value = car.registration;
    document.getElementById("input-brand").value = car.brand;
    document.getElementById("input-model").value = car.model;
    document.getElementById("input-img-url").value = car.imgUrl;
    document.getElementById("input-year").value = car.year;
    document.getElementById("input-price-day").value = car.priceDay;
    document.getElementById("input-price-hour").value = car.priceHour;

    document.getElementById("carModal").classList.remove("hidden");
} */