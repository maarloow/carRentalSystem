import { getCustomers, saveCustomers } from "./storage.js";

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