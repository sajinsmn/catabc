import React, { Component } from "react";
import ReactDOM from "react-dom/client";

// Child Component
class DisplayRupees extends Component {
  render() {
    const { amount } = this.props;
    const unitDigit = amount % 10;
    return <p className="text-sm text-gray-600">{unitDigit} Rupees</p>;
  }
}

class BillInfo extends Component {
  // Category Logic
  getCategory(amount) {
    if (amount >= 1000 && amount <= 2000) return "A";
    if (amount >= 2001 && amount <= 3000) return "B";
    if (amount > 3000) return "C";
    return "None";
  }

  // Discount Logic
  getDiscountedAmount(amount) {
    return amount - amount * 0.1;
  }

  // Number to Words
  numberToWords(num) {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num === 0) return "Zero";
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
    if (num < 1000) return a[Math.floor(num / 100)] + " Hundred" + (num % 100 === 0 ? "" : " and " + this.numberToWords(num % 100));
    if (num < 100000) return this.numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 !== 0 ? " " + this.numberToWords(num % 1000) : "");
    return num.toString();
  }

  render() {
    const bill = {
      number: "B12345",
      name: "Tech Supplies Vendor",
      date: "2025-09-06",
      quantity: 15,
      totalCost: 3200,
    };

    const category = this.getCategory(bill.totalCost);
    const discounted = this.getDiscountedAmount(bill.totalCost);

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-200">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Bill Information</h1>

          <div className="space-y-4 text-gray-800">
            <p><span className="font-semibold">Bill Number:</span> {bill.number}</p>
            <p><span className="font-semibold">Bill Name (Vendor):</span> {bill.name}</p>
            <p><span className="font-semibold">Date:</span> {bill.date}</p>
            <p><span className="font-semibold">Quantity:</span> {bill.quantity} ({this.numberToWords(bill.quantity)})</p>
            <p><span className="font-semibold">Total Cost:</span> ₹{bill.totalCost} ({this.numberToWords(bill.totalCost)})</p>
            <p><span className="font-semibold">Category:</span> {category}</p>
            <p><span className="font-semibold">Discounted Cost:</span> ₹{discounted} ({this.numberToWords(discounted)})</p>

            <DisplayRupees amount={bill.totalCost} />
          </div>
        </div>
      </div>
    );
  }
}

// Render Component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BillInfo />);
