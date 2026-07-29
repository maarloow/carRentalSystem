const CARS_KEY = "cars";
const CUSTOMERS_KEY = "customers";

function load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getCars() {
    return load(CARS_KEY);
}

export function saveCars(cars) {
    save(CARS_KEY, cars);
}

export function getCustomers() {
    return load(CUSTOMERS_KEY);
}

export function saveCustomers(customers) {
    save(CUSTOMERS_KEY, customers);
}