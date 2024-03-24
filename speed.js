function showDemeritPoints() {
    let speed = document.getElementById('speed').value;
    let result = calculateDemeritPoints(speed);
    document.getElementById('result').textContent = result;
}
//calculating the demeritpoints
function calculateDemeritPoints(speed) {
    const speedLimit = 70;

    // Get the speed value from the input field
    speed = parseFloat(speed);  // Convert the string value to a number

    if (!isNaN(speed) && speed >= 0) {  // Validate input (non-negative number)
        if (speed <= speedLimit) {
            return "Ok";
        } else {
            const points = Math.floor((speed - speedLimit) / 5);
            if (points <= 12) {
                return "Points: " + points;
            } else {
                return "License suspended";
            }
        }
    } else {
        // Invalid input
        return "Invalid input! Please enter a valid speed (number greater than or equal to 0)."
    }
}

console.log(calculateDemeritPoints(190));