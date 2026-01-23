import React, { useState, useEffect } from 'react';
import { Calculator, PieChart, IndianRupee } from 'lucide-react';

const EMICalculator = () => {
  // Default Values: 50 Lakhs, 8.5% Interest, 20 Years
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // EMI Calculation Logic
  useEffect(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly Interest
    const time = parseFloat(loanTenure) * 12; // Months

    // Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    const x = Math.pow(1 + rate, time);
    const monthlyEMI = (principal * rate * x) / (x - 1);

    if (isFinite(monthlyEMI)) {
      setEmi(monthlyEMI);
      const totalPayable = monthlyEMI * time;
      setTotalPayment(totalPayable);
      setTotalInterest(totalPayable - principal);
    }
  }, [loanAmount, interestRate, loanTenure]);

  // Currency Formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24 px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* LEFT PANEL: Summary & Branding */}
        <div className="w-full lg:w-4/12 bg-[#0f172a] text-white p-10 lg:p-12 flex flex-col justify-center">
          <Calculator size={48} className="text-yellow-500 mb-6" />
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">EMI Calculator</h2>
          <p className="text-gray-400 leading-relaxed mb-8 text-lg">
            Plan your finances with ease. Calculate your monthly mortgage payments and total interest payable instantly.
          </p>

          <div className="bg-white/10 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-full text-[#0f172a]">
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Monthly EMI</p>
                <p className="text-xl font-bold text-white">{formatCurrency(emi)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-full text-[#0f172a]">
                <PieChart size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Total Interest</p>
                <p className="text-xl font-bold text-white">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Calculator Controls */}
        <div className="w-full lg:w-8/12 bg-white p-10 lg:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif border-b pb-4">Calculate Your Loan</h3>
          
          <div className="space-y-8">
            
            {/* Loan Amount Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 font-semibold">Loan Amount</label>
                <span className="text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded">{formatCurrency(loanAmount)}</span>
              </div>
              <input 
                type="range" 
                min="100000" 
                max="100000000" 
                step="50000" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>₹1L</span>
                <span>₹10Cr</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 font-semibold">Interest Rate (% P.A.)</label>
                <span className="text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded">{interestRate}%</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="15" 
                step="0.1" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 font-semibold">Loan Tenure (Years)</label>
                <span className="text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded">{loanTenure} Years</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1" 
                value={loanTenure} 
                onChange={(e) => setLoanTenure(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Result Breakdown Box */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Loan Amount</p>
                  <p className="text-gray-900 font-bold">{formatCurrency(loanAmount)}</p>
                </div>
                <div className="pt-4 md:pt-0">
                  <p className="text-gray-500 text-sm mb-1">Total Interest</p>
                  <p className="text-gray-900 font-bold">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="pt-4 md:pt-0">
                  <p className="text-gray-500 text-sm mb-1">Total Payable</p>
                  <p className="text-yellow-600 font-bold">{formatCurrency(totalPayment)}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;