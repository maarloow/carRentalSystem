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

    if (!customer.name.trim()) {
        return "Name is required.";
    }

    if (!customer.phone.trim()) {
        return "Phone number is required.";
    }

    if (!customer.email.trim()) {
        return "Email is required.";
    }

    if (!customer.email.includes("@")) {
        return "Please enter a valid email address.";
    }

    const phone = customer.phone.replace(/\D/g, "");

    if (phone.length < 7) {
        return "Please enter a valid phone number.";
    }

    return null;
}