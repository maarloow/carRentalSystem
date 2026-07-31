import {
    saveCar,
    updateCar,
    deleteCar,
    getEditingCarId,
    setEditingCarId,
    renderCars,
    getCar
} from "./cars.js";

import {
    saveCustomer
} from "./customers.js";

import {
    validateCar,
    validateCustomer
} from "./validation.js";

// ---------------------
// Car elements
// ---------------------

const openAddCarModalBtn = document.getElementById("btnAddCar");
const closeCarModalBtn = document.getElementById("btnCloseModal");
const deleteCarBtn = document.getElementById("btnDeleteCar");

const carModal = document.getElementById("carModal");
const carForm = document.getElementById("carForm");


// ---------------------
// Customer elements
// ---------------------

const openAddCustomerModalBtn = document.getElementById("btnAddCustomer");
const closeCustomerModalBtn = document.getElementById("btnCloseCustomerModal");

const customerModal = document.getElementById("customerModal");
const customerForm = document.getElementById("customerForm");

// ---------------------
// Customer events
// ---------------------

openAddCustomerModalBtn.addEventListener("click", () => {
    customerModal.classList.remove("hidden");
});

closeCustomerModalBtn.addEventListener("click", () => {
    customerModal.classList.add("hidden");
});

customerForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const customer = Object.fromEntries(
        new FormData(customerForm)
    );

    const error = validateCustomer(customer);

    if (error) {
        alert(error);
        return;
    }

    saveCustomer(customer);

    customerForm.reset();
    customerModal.classList.add("hidden");
});

// ---------------------
// Car events
// ---------------------

openAddCarModalBtn.addEventListener("click", () => {

    setEditingCarId(null);

    carForm.reset();

    document.getElementById("modalHeader").textContent = "Add car";
    document.getElementById("btnSaveCar").textContent = "Save";

    deleteCarBtn.classList.add("hidden");

    carModal.classList.remove("hidden");
});

closeCarModalBtn.addEventListener("click", () => {

    carModal.classList.add("hidden");

    deleteCarBtn.classList.add("hidden");

    setEditingCarId(null);
});

carForm.addEventListener("submit", event => {

    event.preventDefault();

    const car = Object.fromEntries(
        new FormData(carForm)
    );

    const error = validateCar(car);

    if (error) {

        alert(error);

        return;
    }

    if (getEditingCarId() === null) {

        saveCar(car);

    } else {

        updateCar(car);

    }

    renderCars();

    carModal.classList.add("hidden");

    carForm.reset();

});

deleteCarBtn.addEventListener("click", () => {
    if (deleteCar() === -1)
        alert("Error, unable to delete car");
    else {

        renderCars();

        carModal.classList.add("hidden");

        carForm.reset();
    }
});

export function registerCarEvents(){
const carsGrid = document.getElementById("cars__grid");

carsGrid.addEventListener("click", event => {

    if (!event.target.classList.contains("edit-btn")) return;

    const id = event.target.dataset.id;

    setEditingCarId(id);

    const car = getCar(id);

    const inputRegistration = document.getElementById("input-registration");
    const inputBrand = document.getElementById("input-brand");
    const inputModel = document.getElementById("input-model");
    const inputYear = document.getElementById("input-year");
    const inputPriceDay = document.getElementById("input-price-day");
    const inputPriceHour = document.getElementById("input-price-hour");
    const inputImgUrl = document.getElementById("input-img-url");

    const modalHeader = document.getElementById("modalHeader");

    inputRegistration.value = car.registration;
    inputBrand.value = car.brand;
    inputModel.value = car.model;
    inputYear.value = car.year;
    inputPriceDay.value = car.priceDay;
    inputPriceHour.value = car.priceHour;
    inputImgUrl.value = car.imgUrl;

    modalHeader.textContent = "Edit Car";

    deleteCarBtn.classList.remove("hidden");

    carModal.classList.remove("hidden");

});
}