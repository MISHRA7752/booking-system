const calculateBooking = require('../handlers/bookingCalculator');

test('Booking Scenario 1', () => {
    const roomType = "Single";
    const nights = 5;
    const ratePerNight = 50.00;
    const services = ["Breakfast", "Parking"];
    const serviceRates = { "Breakfast": 5.00, "Parking": 10.00 };
    const discounts = 10;
    const minStayDiscount = 7

    const result = calculateBooking(roomType, nights, ratePerNight, services, serviceRates, discounts, minStayDiscount);

    expect(result).toEqual({
        roomCost: "250.00",
        serviceCost: "75.00",
        totalBeforeDiscount: "325.00",
        discount: "0.00",
        finalTotal: "325.00"
    });
});

test('Booking Scenario 2', () => {
    const roomType = "Double";
    const nights = 10;
    const ratePerNight = 80.00;
    const services = ["Breakfast"];
    const serviceRates = { "Breakfast": 5.00 };
    const discounts = 10;
    const minStayDiscount = 7

    const result = calculateBooking(roomType, nights, ratePerNight, services, serviceRates, discounts, minStayDiscount);

    expect(result).toEqual({
        roomCost: "800.00",
        serviceCost: "50.00",
        totalBeforeDiscount: "850.00",
        discount: "85.00",
        finalTotal: "765.00"
    });
});
