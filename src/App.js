import React, { useState } from "react";
import "./App.css"; // custom styling

function App() {
  const [billNumber, setBillNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState(null);

  // Fixed price per item (example: ₹500 per item)
  const pricePerItem = 500;

  // Function to calculate category based on total cost
  const getCategory = (cost) => {
    if (cost >= 1000 && cost <= 2000) return "A";
    if (cost >= 2001 && cost <= 3000) return "B";
    if (cost > 3000) return "C";
    return "N/A";
  };

  // Function to convert numbers to words (Indian style)
  const numberToWords = (num) => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    if ((num = num.toString()).length > 9) return "Overflow";
    let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = "";
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore " : "";
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh " : "";
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand " : "";
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred " : "";
    str += (n[5] != 0) ? ((str != "") ? "and " : "") +
      (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + " " : "";
    return str.trim() + "Only";
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCost = quantity * pricePerItem;
    const category = getCategory(totalCost);
    const discounted = totalCost - totalCost * 0.1;
    const unitDigit = discounted % 10;
    const inWords = numberToWords(Math.round(discounted));

    setDetails({
      billNumber,
      vendor,
      date,
      quantity,
      totalCost,
      category,
      discounted,
      unitDigit,
      inWords,
    });
  };

  return (
    <div className="bill-container">
      <form onSubmit={handleSubmit} className="bill-form">
        <h2>🧾 Bill Generator</h2>

        <label>Bill Number:</label>
        <input type="text" value={billNumber} onChange={(e) => setBillNumber(e.target.value)} required />

        <label>Vendor Name:</label>
        <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} required />

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

        <button type="submit">Generate Bill</button>
      </form>

      <div className="category-list">
        <h3>📘 Category List</h3>
        <p>₹1000 - ₹2000 → Category A</p>
        <p>₹2001 - ₹3000 → Category B</p>
        <p>Above ₹3000 → Category C</p>
      </div>

      {details && (
        <div className="bill-details">
          <h3>Bill Details</h3>
          <p><strong>Bill No:</strong> {details.billNumber}</p>
          <p><strong>Vendor:</strong> {details.vendor}</p>
          <p><strong>Date:</strong> {details.date}</p>
          <p><strong>Quantity:</strong> {details.quantity}</p>
          <p><strong>Total Cost:</strong> ₹{details.totalCost}</p>
          <p><strong>Category:</strong> {details.category}</p>
          <p><strong>After 10% Discount:</strong> ₹{details.discounted}</p>
          <p><strong>Unit Digit in Rupees:</strong> {details.unitDigit}</p>
          <p><strong>In Words:</strong> {details.inWords}</p>
        </div>
      )}
    </div>
  );
}

export default App;
