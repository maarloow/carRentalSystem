import { getRentals, saveRentals, getCars, getCustomers } from "./storage.js";

export function saveRental(rental) {
    rental.id = crypto.randomUUID();
    let rentals = getRentals();
    rentals.push(rental);
    saveRentals(rentals);
    console.log("rental saved");
}

export function createRentalsTable() {

    return `
        <section class="rentals">

            <table class="rentals-table">

                <thead>

                    <tr>
                        <th>Customer</th>
                        <th>Car</th>
                        <th>Registration</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody id="rentalsTableBody">

                </tbody>

            </table>

        </section>
    `;
}

function createRentalRow(rental, carMap, customerMap) {

    const car = carMap[rental.carId];

    const customer = customerMap[rental.customerId];


    return `
        <tr>

            <td>${customer.firstName} ${customer.lastName}</td>

            <td>${car.brand} ${car.model}</td>

            <td>${car.registration}</td>

            <td>${rental.startDate}</td>

            <td>${rental.endDate}</td>

            <td>
                <button
                    class="edit-rental-btn"
                    data-id="${rental.id}">
                    Edit
                </button>
            </td>

        </tr>
    `;
}

export function renderRentals() {

    const tableBody = document.getElementById("rentalsTableBody");

    const rentals = getRentals();
    const cars = getCars();
    const customers = getCustomers();

    const customerMap = Object.fromEntries(
        customers.map(customer => [customer.id, customer])
    );

    const carMap = Object.fromEntries(
        cars.map(car => [car.id, car])
    );

    tableBody.innerHTML = rentals
        .map(rental => createRentalRow(rental, carMap, customerMap))
        .join("");
}

function renderRentalsFilter(){
        return `<aside class="filter" id="car-filter">

            <h2 class="filter__title">Search</h2>

            <div class="filter__group">
                <label class="filter__label" for="cutomerName">Customer name</label>
                <input class="filter__input" type="text" id="customerName">
            </div>



            <button class="filter__button">
                Search
            </button>

        </aside>`;
}

export function renderRentalsPage() {

    app.innerHTML = `
        ${renderRentalsFilter()}
        ${createRentalsTable()}
    `;

    renderRentals();

    //registerRentalEvents();
}