import { getRentals, saveRentals } from "./storage.js";

export function saveRental(rental) {
    rental.id = crypto.randomUUID();
    let rentals = getRentals();
    rentals.push(rental);
    saveRentals(rentals);
    console.log("rental saved");
}


