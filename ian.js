// Function to calculate an employee's net salary based on basic salary, benefits, and various deductions

function calculateNetSalary(basicSalary, benefits) {
    // Calculate gross salary (basic salary + benefits)
    const grossSalary = basicSalary + benefits;
  
    // Calculate PAYE (Tax) based on taxable pay (gross salary minus personal relief)
    let taxablePay = grossSalary - getPersonalRelief();
    let payee = 0;
  
    if (taxablePay <= 24000) {
      payee = taxablePay * 0.1; // 10% tax rate for taxable pay up to 24,000
    } else if (taxablePay <= 32333) {
      payee = 2400 + (taxablePay - 24000) * 0.25; // 25% tax rate for taxable pay between 24,001 and 32,333
    } else if (taxablePay <= 500000) {
      payee = 6083.25 + (taxablePay - 32333) * 0.3; // 30% tax rate for taxable pay between 32,334 and 500,000
    } else if (taxablePay <= 800000) {
      payee = 150000 + (taxablePay - 500000) * 0.325; // 32.5% tax rate for taxable pay between 500,001 and 800,000
    } else {
      payee = 280000 + (taxablePay - 800000) * 0.35; // 35% tax rate for taxable pay above 800,000
    }
  
    // Calculate NHIF deduction based on gross salary using a lookup table
    const nhifDeduction = getNHIFDeduction(grossSalary);
  
    // Calculate NSSF deduction based on gross salary and tier limits
    const nssfDeduction = getNSSFDeduction(grossSalary);
  
    // Calculate net salary (gross salary minus PAYE, NHIF, NSSF, and Housing Levy)
    const housingLevy = grossSalary * 0.015 * 2; // 1.5% Housing Levy from both employer and employee
    const netSalary = grossSalary - payee - nhifDeduction - nssfDeduction - housingLevy;
  
    // Return an object containing the breakdown of salary components
    return {
      grossSalary,
      payee,
      nhifDeduction,
      nssfDeduction,
      housingLevy,
      netSalary,
    };
  }
  
  // Function to retrieve the annual personal relief amount (converted to monthly)
  function getPersonalRelief() {
    return 2400 * 12; // 2400 KES per month (annual personal relief of 28,800 KES divided by 12 months)
  }
  
  // Function to determine NHIF deduction based on gross salary using a lookup table
  function getNHIFDeduction(grossSalary) {
    if (grossSalary <= 5999) {
      return 150; // Fixed NHIF deduction for salaries up to 5,999 KES
    } else if (grossSalary <= 100000) {
      // Lookup table for NHIF deductions based on gross pay ranges
      const nhifTiers = [
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        // ... (include entries for all NHIF tiers)
        {min:15000, max: 19999, deduction:600},
        {min:20000, max: 24999,deduction: 750},
        {min: 25000,max:29999 , deduction: 850},
        {min:30000 ,max: 34999 ,deduction: 900},
        {min:35000 ,max: 39000 , deduction: 9650 },
        {min:40000 ,max:44999 , deduction:1000 },
        {min:45000 ,max: 49999 , deduction:1100 },
        {min:50000 ,max: 59999, deduction:1200 },
        {min:60000 ,max: 69999, deduction:1300 },
        {min:70000 ,max: 79999 , deduction:1400 },
        {min:80000 ,max:89999 , deduction:1500 },
        {min:90000 ,max:99999 , deduction: 1600},
        { min:100001 ,max: Infinity , deduction: 1600 }, // Tier for salaries above 100,000 KES
      ];
  
      for (const tier of nhifTiers) {
        if (grossSalary >= tier.min && grossSalary <= tier.max) {
          return
  