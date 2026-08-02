import { getCustomers, saveCustomers } from "./storage.js";
import { registerCustomerEvents } from "./events.js";

let editingCustomerId = null;

// ---------------------
// State
// ---------------------

export function getEditingCustomerId() {
    return editingCustomerId;
}

export function setEditingCustomerId(id) {
    editingCustomerId = id;
}

export function renderCustomers() {

    const tableBody = document.getElementById("customersTableBody");

    const customers = getCustomers();

    tableBody.innerHTML = customers
        .map(createCustomerRow)
        .join("");
}

function createCustomersFilter(){
    return `<aside class="filter" id="customer-filter">

            <h2 class="filter__title">Search</h2>


            <div class="filter__group">
                
                <input class="filter__input" type="text" id="customer-search">
            </div>


            <button class="filter__button">
                Search
            </button>

        </aside>`;
}

function createCustomerRow(customer) {

    return `
        <tr>

            <td>${customer.firstName}</td>

            <td>${customer.lastName}</td>

            <td>${customer.email}</td>

            <td>${customer.phone}</td>

            <td>${customer.licenseNumber}</td>

            <td>
                <button
                    class="edit-customer-btn"
                    data-id="${customer.id}">
                    Edit
                </button>
            </td>

        </tr>
    `;
}

export function createCustomersTable() {

    return `
        <section class="customers">

            <table class="customers-table">

                <thead>

                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>License</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody id="customersTableBody">

                </tbody>

            </table>

        </section>
    `;
}

export function renderCustomersPage() {

    app.innerHTML = `
        ${createCustomersFilter()}
        ${createCustomersTable()}
    `;

    renderCustomers();

    registerCustomerEvents();
}

export function getCar(id){
    const cars = getCars();
    let car = cars.find(car => car.registration === editingCarId);
    return car;
}

export function getCustomer(id){
    const customers = getCustomers();
    let customer = customers.find(customer => customer.id === editingCustomerId);
    return customer;
}


// ---------------------
// Create
// ---------------------

export function saveCustomer(customer) {

    const customers = getCustomers();

    customer.id = crypto.randomUUID();

    customers.push(customer);

    saveCustomers(customers);

    document.getElementById("customerModal").classList.add("hidden");
}

// ---------------------
// Update
// ---------------------

export function updateCustomer(updatedCustomer) {

    const customers = getCustomers();

    const index = customers.findIndex(
        customer => customer.id === editingCustomerId
    );

    if (index === -1) {
        return;
    }

    updatedCustomer.id = editingCustomerId;

    customers[index] = updatedCustomer;

    saveCustomers(customers);

    document.getElementById("customerModal").classList.add("hidden");

    editingCustomerId = null;
}

// ---------------------
// Delete
// ---------------------

export function deleteCustomer() {

    const customers = getCustomers();

    const index = customers.findIndex(
        customer => customer.id === editingCustomerId
    );

    if (index === -1) {
        return;
    }

    customers.splice(index, 1);

    saveCustomers(customers);

    document.getElementById("customerModal").classList.add("hidden");

    editingCustomerId = null;
}

// ---------------------
// Edit
// ---------------------

export function openEditCustomerModal(id) {

    const customers = getCustomers();

    const customer = customers.find(
        customer => customer.id === id
    );

    if (!customer) {
        return;
    }

    editingCustomerId = id;

    document.getElementById("customerModalHeader").textContent = "Edit Customer";
    document.getElementById("btnSaveCustomer").textContent = "Update";

    document.getElementById("input-customer-name").value = customer.name;
    document.getElementById("input-customer-phone").value = customer.phone;
    document.getElementById("input-customer-email").value = customer.email;

    document.getElementById("customerModal").classList.remove("hidden");
}