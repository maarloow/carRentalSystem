export function validateCar(car) {

    if (!car.registration.trim()) {
        return "Registration is required.";
    }

    if (!car.brand.trim()) {
        return "Brand is required.";
    }

    if (!car.model.trim()) {
        return "Model is required.";
    }

    if (!car.imgUrl.trim()) {
        return "Image URL is required.";
    }

    if (Number(car.year) <= 0) {
        return "Year must be greater than 0.";
    }

    if (Number(car.priceDay) <= 0) {
        return "Price per day must be greater than 0.";
    }

    if (Number(car.priceHour) <= 0) {
        return "Price per hour must be greater than 0.";
    }

    return null;
}

export function validateCustomer(customer) {

    if (!customer.firstName.trim()) {
        return "First name is required.";
    }

    if (!customer.lastName.trim()) {
        return "Last name is required.";
    }

    if (!customer.email.trim()) {
        return "Email is required.";
    }

    if (!customer.email.includes("@")) {
        return "Please enter a valid email address.";
    }

    if (!customer.phone.trim()) {
        return "Phone number is required.";
    }

    // Tar bort mellanslag, bindestreck osv.
    const phone = customer.phone.replace(/\D/g, "");

    if (phone.length < 7) {
        return "Please enter a valid phone number.";
    }

    if (!customer.licenseNumber.trim()) {
        return "Driver's license number is required.";
    }

    return null;
}

export function validateRental(rental) {

    if (!rental.customerId) {
        return "Please select a customer.";
    }

    if (!rental.carId) {
        return "Please select a car.";
    }

    if (!rental.startDate) {
        return "Start date is required.";
    }

    if (!rental.endDate) {
        return "End date is required.";
    }

    const startDate = new Date(rental.startDate);
    const endDate = new Date(rental.endDate);

    if (endDate < startDate) {
        return "End date cannot be before start date.";
    }



    return null;
}