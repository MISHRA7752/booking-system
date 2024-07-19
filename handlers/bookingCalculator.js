/**
 * Calculate the total booking cost based on room type, number of nights, rates, services, and discounts.
 *
 * @param {string} roomType - Type of room.
 * @param {number} nights - Number of nights to stay.
 * @param {number} ratePerNight - Rate per night for the room.
 * @param {string[]} services - Array of services requested.
 * @param {Object} serviceRates - Rates for the services.
 * @param {number} discounts - Discount percentage if applicable.
 * @param {number} minStayDiscount - Minimum number of nights to get discount.
 * @returns {Object} - Breakdown of costs including room cost, service cost, total before discount, discount, and final total.
 */
function calculateBooking(roomType, nights, ratePerNight, services, serviceRates, discounts = 0, minStayDiscount = Infinity) {
    const roomCost = nights * ratePerNight;
    const serviceCost = services.reduce((total, service) => total + ((serviceRates[service] ?? 0) * nights), 0);
    const totalBeforeDiscount = roomCost + serviceCost;
    const discount = (nights >= minStayDiscount) ? totalBeforeDiscount * (discounts / 100) : 0;
    const finalTotal = totalBeforeDiscount - discount;

    return {
        roomCost: roomCost.toFixed(2),
        serviceCost: serviceCost.toFixed(2),
        totalBeforeDiscount: totalBeforeDiscount.toFixed(2),
        discount: discount.toFixed(2),
        finalTotal: finalTotal.toFixed(2)
    };
}

module.exports = calculateBooking;
