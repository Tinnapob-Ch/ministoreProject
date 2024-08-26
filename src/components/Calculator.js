import React from 'react';
import './Calculator.css';

function Calculator({ totalPrice }) {
  const calculateShippingCost = () => {
    if (totalPrice < 5000) {
      return (50).toFixed(2); // 50.00
    } else {
      return "free";
    }
  };

  const calculateTotalPrice = () => {
    if (totalPrice < 5000) {
      return (totalPrice + 50).toFixed(2); // รวมค่าจัดส่ง
    } else {
      return totalPrice.toFixed(2); // ไม่มีค่าจัดส่ง
    }
  };

  if (!totalPrice) {
    return null; // ถ้าไม่มีสินค้า ให้ return null เพื่อซ่อน Calculator
  }

  return (
    <section className="calculator">
      <div>
        <h2 className='title-text-cal'>Summary</h2>
        <p className='text-detail-cal'>Subtotal<span className="right-align">{totalPrice.toFixed(2)} </span></p>
        <p className='text-detail-cal'>Estimated delivery <span className="right-align">{calculateShippingCost()}</span></p>
        <p className='text-total-cal'>Total <span className="right-align">{calculateTotalPrice()}</span></p> {/* แสดงยอดรวม */}
        <div className="line-above"></div>
        <div className="line-below"></div>

        {calculateShippingCost !== 0 && (
        <p className="text-note-cal">
          Note : The total shipping cost is 50 Baht. Receive free when purchasing more than 5000 Baht.
        </p>
      )}

      </div>
    </section>
  );
}

export default Calculator;
