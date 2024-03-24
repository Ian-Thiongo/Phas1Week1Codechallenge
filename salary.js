function calculateNetSalary(basicSalary, benefits) {
    // Calculate gross salary (basic salary + benefits)
    const grossSalary = basicSalary + benefits;
  
    // Calculate PAYE (Tax)
    let taxablePay = grossSalary - getPersonalRelief();
    let payee = 0;
  
    if (taxablePay <= 24000) {
      payee = taxablePay * 0.1;
    } else if (taxablePay <= 32333) {
      payee = 2400 + (taxablePay - 24000) * 0.25;
    } else if (taxablePay <= 500000) {
      payee = 6083.25 + (taxablePay - 32333) * 0.3;
    } else if (taxablePay <= 800000) {
      payee = 150000 + (taxablePay - 500000) * 0.325;
    } else {
      payee = 280000 + (taxablePay - 800000) * 0.35;
    }
  
    // Calculating NHIF deduction
    const nhifDeduction = getNHIFDeduction(grossSalary);
  
    // Calculating NSSF deduction
    const nssfDeduction = getNSSFDeduction(grossSalary);
  
    // Calculating net salary (gross salary - PAYE - NHIF - NSSF - Housing Levy)
    const housingLevy = grossSalary * 0.015 * 2; // Assuming both employer and employee contribute
    const netSalary = grossSalary - payee - nhifDeduction - nssfDeduction - housingLevy;
  
    return {
      grossSalary,
      payee,
      nhifDeduction,
      nssfDeduction,
      housingLevy,
      netSalary,
    };
  }
  
  function getPersonalRelief() {
    return 2400 * 12; // Annual personal relief converted to monthly
  }
  
  function getNHIFDeduction(grossSalary) {
    if (grossSalary <= 5999) {
      return 150;
    } else if (grossSalary <= 100000) {

      // Table for NHIF deductions based on gross pay

      const nhifTiers = [
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
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
        { min:100001 ,max: Infinity , deduction: 1600 },
      ];
  
      for (const tier of nhifTiers) {
        if (grossSalary >= tier.min && grossSalary <= tier.max) {
          return tier.deduction;
        }
      }
    } else {
      return 1700;
    }
  }
  
  function getNSSFDeduction(grossSalary) {
    const tier1Limit = new Date().getMonth() >= 1 ? 7000 : 6000;
    const tier2Limit = new Date().getMonth() >= 1 ? 36000 : 18000;
  
    let tier1Contribution = 0;
    let tier2Contribution = 0;
  
    if (grossSalary > tier1Limit) {
      tier1Contribution = tier1Limit * 0.06;
      if (grossSalary > tier2Limit) {
        tier2Contribution = (tier2Limit - tier1Limit) * 0.06;
      } else {
        tier2Contribution = (grossSalary - tier1Limit) * 0.06;
      }
    } else {
      tier1Contribution = grossSalary * 0.06;
    }
  
    return tier1Contribution + tier2Contribution;
  }
  
  
  const basicSalary = 50000;
  const benefits = 5000;
  
  const salaryBreakdown = calculateNetSalary(basicSalary, benefits)
  
  console.log(getNSSFDeduction(50000));