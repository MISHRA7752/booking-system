const calculateBooking = require("./handlers/bookingCalculator");
const { askQuestion, rl } = require("./utils/helper");

/**
 * Immediately Invoked Function Expression (IIFE) to get user input and calculate booking on npm start
 */
(async () => {
  try {
    const roomType = await askQuestion("Enter room type: ");
    const nights = await askQuestion(
      "Enter number of nights: ",
      (input) => !isNaN(input) && Number(input) > 0 && Number(input) % 1 === 0
    );
    const ratePerNight = await askQuestion(
      "Enter rate per night: ",
      (input) => !isNaN(input) && Number(input) > 0
    );
    let services = await askQuestion(
      "Enter services (comma separated, Press enter if nothing opted): "
    );
    let serviceRatesInput = await askQuestion(
      "Enter service rates (comma separated, format: service:rate, Press enter if nothing opted): ",
      (input) => {
        if (!input) return true;
        try {
          input.split(",").every((rate) => {
            const [service, rateValue] = rate.split(":");
            return (
              service.trim() &&
              !isNaN(rateValue.trim()) &&
              Number(rateValue.trim()) > 0
            );
          });
        } catch {
          return false;
        }
      }
    );

    const discounts = await askQuestion(
      "Enter discount percentage (Press enter if no discount): ",
      (input) => !isNaN(input) && Number(input) >= 0 && Number(input) <= 100
    );
    const minStayDiscount = await askQuestion(
      "Enter Min. stay to avail discount  (Press enter if no discount): ",
      (input) => !isNaN(input)
    );
    const servicesArray = services.split(",").map((service) => service.trim());
    const serviceRatesArray = serviceRatesInput
      .split(",")
      .map((rate) => rate.split(":"));
    const serviceRates = serviceRatesArray.reduce((acc, [service, rate]) => {
      if (service && rate) acc[service.trim()] = parseFloat(rate.trim());
      return acc;
    }, {});

    const result = calculateBooking(
      roomType,
      parseInt(nights),
      parseFloat(ratePerNight),
      servicesArray,
      serviceRates,
      parseFloat(discounts) || 0,
      minStayDiscount || Infinity
    );
    console.log(`====================================`);
    console.log("Booking Details:");
    console.log(`Room: ${result.roomCost}`);
    console.log(`Services: ${result.serviceCost}`);
    console.log(`Total before discount: ${result.totalBeforeDiscount}`);
    console.log(`Discount: ${result.discount}`);
    console.log(`Final Total: ${result.finalTotal}`);
    console.log(`====================================`);

    rl.close();
  } catch (error) {
    console.error("Error:", error);
    rl.close();
  }
})();
