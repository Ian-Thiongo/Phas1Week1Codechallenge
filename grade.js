function calculateGrade(mark) {
    // Check if input is a valid number between 0 and 100
    if (!isNaN(mark) && mark >= 0 && mark <= 100) {
        // Determine the grade using switch statement
        switch (true) {
            case (mark > 79):
                return 'A';
            case (mark >= 60):
                return 'B';
            case (mark >= 50):
                return 'C';
            case (mark >= 40):
                return 'D';
            default:
                return 'E';
        }
    } else {
        return 'Invalid input! Mark should be between 0 and 100.';
    }
}

// Prompt user for input
let inputMark = parseFloat("Enter student mark (between 0 and 100):");

// Calculate grade and display result
let grade = calculateGrade(inputMark);

console.log(calculateGrade(28));

