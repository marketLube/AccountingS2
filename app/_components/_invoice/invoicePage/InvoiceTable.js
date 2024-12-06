import  { useState, useEffect } from "react";
import Remove from "../../../../public/remove.svg";

function InvoiceTable() {
  const [tableData, setTableData] = useState([
    {
      itemDescription: "",
      hsxSac: "",
      qty: 1,
      rate: 0.0,
      sgst: 0,
      cgst: 0,
      cess: 0,
      amount: 0.0,
    },
  ]);
  const [row, setRow] = useState({
    sgst: 0.0,
    cgst: 0.0,
    cess: 0.0,
  });

  const [sub, setsub] = useState(0.0);
  const [tot, settot] = useState(0.0);

  const [Description, setdescription] = useState("Item Description");
  const [Qty, setQty] = useState("Qty");
  const [Rate, setrate] = useState("Rate");
  const [Amount, setamount] = useState("Amount");
  const [textSubTotal, setTextSubTotal] = useState("Sub Total");
  const [textTotal, setTextTotal] = useState("TOTAL");

  const handlesubtotal = (e) => setTextSubTotal(e.target.value);
  const handletotal = (e) => setTextTotal(e.target.value);

  const handledescription = (e) => setdescription(e.target.value);
  const handletqy = (e) => setQty(e.target.value);
  const handlerate = (e) => setrate(e.target.value);
  const handleamount = (e) => setamount(e.target.value);

  const [hoveredRow, setHoveredRow] = useState(null); // To track which row is hovered
  const [subTotal, setSubTotal] = useState(0); // To calculate sub total
  const [total, setTotal] = useState(0); // To calculate total
  const [currency, setCurrency] = useState("INR"); // Default currency

  const handleInputChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;

    // Recalculate amount if necessary
    if (
      field === "qty" ||
      field === "rate" ||
      field === "sgst" ||
      field === "cgst" ||
      field === "cess"
    ) {
      const qty = parseFloat(updatedData[index].qty || 0);
      const rate = parseFloat(updatedData[index].rate || 0);
      const sgst = parseFloat(updatedData[index].sgst || 0);
      const cgst = parseFloat(updatedData[index].cgst || 0);
      const cess = parseFloat(updatedData[index].cess || 0);
      const baseAmount = qty * rate;
      const totalTax = ((sgst + cgst + cess) / 100) * baseAmount;
      updatedData[index].amount = baseAmount + totalTax;
    }

    setTableData(updatedData);
  };

  const addRow = () => {
    setTableData([
      ...tableData,
      {
        itemDescription: "",
        hsxSac: "",
        qty: 1,
        rate: 0.0,
        sgst: 0,
        cgst: 0,
        cess: 0,
        amount: 0.0,
      },
    ]);
  };

  const removeRow = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  // Recalculate subTotal and total when tableData changes
  useEffect(() => {
    const newSubTotal = tableData.reduce((acc, row) => acc + row.amount, 0);
    setSubTotal(newSubTotal);
    setTotal(newSubTotal); // Assuming the total is same as subTotal for now
  }, [tableData]);

  return (
    <div className="mt-4 text-[14px]">
      <table className="w-full table-auto text-sm">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2 text-left text-white">
              <input
                type="text"
                value={Description}
                onChange={handledescription}
                className=" text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] text-white bg-black w-full px-2 py-1  rounded focus: focus:ring-1 focus:ring-blue-500"
              />
            </th>
            <th className="   text-white">
              <input
                type="text"
                value={Qty}
                onChange={handletqy}
                className=" text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] text-white bg-black w-full px-2 py-1  rounded focus: focus:ring-1 focus:ring-blue-500"
              />
            </th>
            <th className=" py-2 text-left text-white">
              <input
                type="text"
                value={Rate}
                onChange={handlerate}
                className=" text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] text-white bg-black w-full px-2 py-1  rounded focus: focus:ring-1 focus:ring-blue-500"
              />
            </th>
            <th className="px-4 py-2 text-center">SGST</th>
            <th className="px-4 py-2 text-center">CGST</th>
            <th className="px-4 py-2 text-center">Cess</th>
            <th className="px-2 py-2 text-left text-white">
              <input
                type="text"
                value={Amount}
                onChange={handleamount}
                className="text-white bg-black w-full    rounded focus: focus:ring-1 focus:ring-blue-500"
              />
            </th>
            <th></th> {/* New column for remove button */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              onMouseEnter={() => setHoveredRow(index)} // Set hovered row on hover
              onMouseLeave={() => setHoveredRow(null)} // Reset on mouse leave
              className="relative "
            >
              <td>
                <textarea
                  value={row.itemDescription}
                  onChange={(e) =>
                    handleInputChange(index, "itemDescription", e.target.value)
                  }
                  placeholder="Enter item name/description"
                  className="mt-2 rounded-[2px] w-[172.49PX] h-[45.6px]  p-[2px] text-black text-[14px]  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
                />
                <div className="">
                  <input
                    type="text"
                    placeholder="HSN/SAC"
                    className="rounded-[2px]  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
                  />
                </div>
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(index, "qty", e.target.value)
                  }
                  className=" w-[50.75px] h-[23.06px]  rounded-[3px]  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]  text-black text-center"
                />
                <div className="text-[14px] text-white mt-3">
                  {parseFloat(row.cess).toFixed(2)}
                </div>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={row.rate}
                  onChange={(e) =>
                    handleInputChange(index, "rate", e.target.value)
                  }
                  className="w-[50.75px] h-[23.06px]  rounded-[3px]  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] text-black text-center"
                />
                <div className="text-[14px] text-white mt-3">
                  {parseFloat(row.cess).toFixed(2)}
                </div>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={row.sgst}
                  onChange={(e) =>
                    handleInputChange(index, "sgst", e.target.value)
                  }
                  className="w-[50.75px] h-[23.06px]  rounded-[3px]  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]  text-black text-center"
                />
                <div className="text-[14px] text-[#00000096] mt-3">
                  {parseFloat(row.sgst).toFixed(2)}
                </div>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={row.cgst}
                  onChange={(e) =>
                    handleInputChange(index, "cgst", e.target.value)
                  }
                  className="w-[50.75px] rounded-[3px]  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] h-[23.06px]  text-black text-center"
                />
                <div className="text-[14px] text-[#00000096] mt-3">
                  {parseFloat(row.cgst).toFixed(2)}
                </div>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={row.cess}
                  onChange={(e) =>
                    handleInputChange(index, "cess", e.target.value)
                  }
                  className="p-1 ml- align-top w-[50.75px] h-[23.06px] rounded-[3px]  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]   text-black text-center"
                />
                <p className="text-[14px] text-[#00000096] mt-3">
                  {parseFloat(row.cess).toFixed(2)}
                </p>
              </td>
              <td className="p-3 align-top ">{row.amount.toFixed(2)}</td>

              <td className="text-center w-[5px] h-[5px] ">
                {hoveredRow === index && (
                  <img
                    src={Remove}
                    alt="Remove"
                    onClick={() => removeRow(index)} // Remove the row on click
                    className="-mr-6 w-5 h-5 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="flex items-center mt-4 cursor-pointer ml-2"
        onClick={addRow}
      >
        <img
          width="16"
          height="16"
          src="https://img.icons8.com/tiny-color/16/add.png"
          alt="add"
        />
        <span className="ml-2 text-blue-500">Add Line Item</span>
      </div>

      {/* Sub Total and Total Fields */}
      <div className="flex justify-between min-h-screen -mt-72">
        {/* Left (Center) Section */}
        <div className="flex flex-col justify-center items-center w-1/2 p-4 ml-[250px] ">
          <div className="mb-4">
            <input
              type="text"
              value={textSubTotal}
              onChange={handlesubtotal}
              className="font-bold -mr-28  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]  w-full px-2 py-1  rounded focus: focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {row.sgst > 0 && (
            <div className="mb-4">
              <p className="text-sm font-normal">SGST (2%)</p>
            </div>
          )}
          {row.cgst > 0 && (
            <div className="mb-4">
              <p className="text-sm font-normal">CGST (2%)</p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2">
            <input
              type="text"
              value={textTotal}
              onChange={handletotal}
              className="font-bold -mr-28  text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]  w-full px-2 py-1  rounded focus: focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section for Amounts */}
        <div className="flex flex-col justify-center items-end w-1/2 p-4">
          <div className="mb-4">
            <p className="text-sm font-bold">10.00</p>
          </div>
          {row.sgst > 0 && (
            <div className="mb-4">
              <p className="text-sm font-normal">
                ({(row.sgst / 100).toFixed(2)}%)
              </p>
            </div>
          )}

          {row.cgst > 0 && (
            <div className="mb-4">
              <p className="text-sm font-normal">
                {" "}
                ({(row.cgst / 100).toFixed(2)}%)
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
            <div className="flex items-center mt-2">
              <select
                id="currency"
                className="m w-[70px] h-[30px]  block p-2 border border-gray-300 rounded-md text-sm"
                defaultValue="INR"
                onChange={(e) => handleCurrencyChange(e)} // Call function to handle currency change
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add other currency options as needed */}
              </select>
            </div>
            <div className="mt-2 text-right">
              <p className="text-sm font-bold">{total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceTable;
