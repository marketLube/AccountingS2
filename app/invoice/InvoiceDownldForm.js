"use client";
import React from "react";

const InvoiceDownldForm = ({ data, tableItems, ref }) => {
  // Safely calculate total amount
  const total = tableItems?.reduce(
    (acc, item) => acc + (parseFloat(item?.amount) || 0),
    0
  );

  // Calculate total SGST percentage from table items
  const totalSgstPercent = tableItems?.reduce(
    (acc, item) => acc + (parseFloat(item?.sgst) || 0),
    0
  );

  // Calculate total CGST percentage from table items
  const totalCgstPercent = tableItems?.reduce(
    (acc, item) => acc + (parseFloat(item?.cgst) || 0),
    0
  );

  // Calculate GST amounts based on percentages
  const totalSgst = total * (totalSgstPercent / 100);
  const totalCgst = total * (totalCgstPercent / 100);

  // Calculate grand total
  const grandTotal = total + totalSgst + totalCgst;

  return (
    <div className="page-wrapper">
      <div className="invoice">
        <div className="invoice__header">
          <div>
            <div className="invoice__tags">
              <span className="tag">market</span>
              <span className="tag">lube</span>
            </div>
            <div className="invoice__company">
              <h3>{data.companyName}</h3>
              <p>{data.name}</p>
              <p>{data.address}</p>
              <p>{data.city}</p>
              <p>{data.state}</p>
              <p>{data.country}</p>
              <p>{data.gst}</p>
            </div>
          </div>

          <div className="invoice__title">
            <h1>INVOICE</h1>
            <p>Invoice No: 23-24/024</p>
            <p>Invoice Date: 15th Nov 2024</p>
          </div>
        </div>

        <div className="invoice__header">
          <div className="invoice__billing">
            <h3>{data.companyName2}</h3>
            <p>{data.name2}</p>
            <p>{data.address2}</p>
            <p>{data.city2},</p>
            <p>{data.state2}</p>
            <p>{data.country2}</p>
            <p>{data.gst2}</p>
          </div>

          <div className="invoice__payment">
            <h3>Payment Information</h3>
            <p>{data.receiverName}</p>
            <p>{data.accountNumber}</p>
            <p>IFSC : {data.ifsc}</p>
            <p>BRANCH : {data.number}</p>
          </div>
        </div>

        <div className="invoice__items">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {tableItems?.map((data) => (
                <tr key={i}>
                  <td>
                    <p>Stage-1</p>
                    <p>{data.desc}</p>
                  </td>
                  <td>₹{data.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice__totals">
            <div className="total-row">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div className="total-row">
              <span>SGST {totalSgstPercent}%</span>
              <span>₹{totalSgst}</span>
            </div>
            <div className="total-row">
              <span>CGST {totalCgstPercent}%</span>
              <span>₹{totalCgst}</span>
            </div>
            <div className="total-row">
              <span>Total Amount</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDownldForm;
