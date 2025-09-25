// Trip Booking Application - Using Rest Parameters

// Function to book a trip with multiple destinations
function bookTrip(travelerName: string, ...destinations: string[]): void {
    console.log(`Traveler: ${travelerName}`);

    if (destinations.length === 0) {
        console.log("❌ No destinations selected.");
    } else {
        console.log("📍 Destinations planned:");
        destinations.forEach((place, index) => {
            console.log(`${index + 1}. ${place}`);
        });
        console.log(`✅ Total places: ${destinations.length}`);
    }
}

// Example Usage
bookTrip("Sharath", "Goa", "Manali", "Leh");
bookTrip("Kumar"); // No destinations


// Rest Parameter (...destinations: string[])

// It collects all extra arguments into an array.

// In our case, it collects all the places where the traveler wants to go.

// Example: bookTrip("Sharath", "Goa", "Manali", "Leh") →

// travelerName = "Sharath"

// destinations = ["Goa", "Manali", "Leh"]

// Why Rest Parameters are useful?

// We don’t know how many destinations the traveler will choose (1, 2, or 10).

// Rest Parameters give flexibility to handle any number of inputs.

// Code Flow

// If no destinations are given → Show ❌ error.

// Otherwise → Print all planned destinations and total count.

// 🎒 Analogy

// Think of rest parameters like a luggage bag 🧳 in your trip:

// You can throw in 1 item or 10 items.

// The bag (rest parameter) collects all your items into a single container (array).

// That way, the trip organizer doesn’t have to worry about how many you’re carrying.