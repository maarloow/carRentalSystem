import {
    saveCar,
    updateCar,
    deleteCar,
    getEditingCarId,
    setEditingCarId,
    renderCars,
    getCar,
    renderCarsPage
} from "./cars.js";

import {
    renderCustomersPage,
    saveCustomer,
    setEditingCustomerId,
    getCustomer,
    getEditingCustomerId,
    updateCustomer,
    deleteCustomer,
    renderCustomers
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
const showCarsBtn = document.getElementById("btnShowCars");

const carModal = document.getElementById("carModal");
const carForm = document.getElementById("carForm");


// ---------------------
// Customer elements
// ---------------------

const openAddCustomerModalBtn = document.getElementById("btnAddCustomer");
const closeCustomerModalBtn = document.getElementById("btnCloseCustomerModal");
const deleteCustomerBtn = document.getElementById("btnDeleteCustomer");
const showCustomersBtn = document.getElementById("btnShowCustomers");

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

    if (getEditingCustomerId() === null) {
        saveCustomer(customer);
    }
    else {
        updateCustomer(customer);
    }

    customerForm.reset();
    customerModal.classList.add("hidden");
    renderCustomersPage();
});

showCustomersBtn.addEventListener("click", () => {
    renderCustomersPage();
});

deleteCustomerBtn.addEventListener("click", () => {
    if (deleteCustomer() === -1)
        alert("Error, unable to delete car");
    else {

        renderCustomers();

        customerModalModal.classList.add("hidden");

        customerForm.reset();
    }
});

// ---------------------
// Car events
// ---------------------

showCarsBtn.addEventListener("click", () => {
    renderCarsPage();
});

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

export function registerCarEvents() {
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


export function registerCustomerEvents() {
    const customersTableBody = document.getElementById("customersTableBody");

    customersTableBody.addEventListener("click", event => {

        if (!event.target.classList.contains("edit-customer-btn")) return;

        const id = event.target.dataset.id;

        setEditingCustomerId(id);

        const customer = getCustomer(id);

        //const customerForm = document.getElementById("customerForm");

        const inputFirstName = document.getElementById("input-first-name");
        const inputLastName = document.getElementById("input-last-name");
        const inputEmail = document.getElementById("input-email");
        const inputPhone = document.getElementById("input-phone");
        const inputLicenseNumber = document.getElementById("input-license-number");

        const btnSaveCustomer = document.getElementById("btnSaveCustomer");
        const btnDeleteCustomer = document.getElementById("btnDeleteCustomer");

        const modalHeader = document.getElementById("customerModalHeader");

        inputFirstName.value = customer.firstName;
        inputLastName.value = customer.lastName;
        inputEmail.value = customer.email;
        inputPhone.value = customer.phone;
        inputLicenseNumber.value = customer.licenseNumber;

        modalHeader.textContent = "Edit Customer";

        btnDeleteCustomer.classList.remove("hidden");

        customerModal.classList.remove("hidden");

    });
}

