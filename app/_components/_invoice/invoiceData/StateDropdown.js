import React from 'react';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const StateDropdown = ({ country, state, onChange }) => {
  const statesList = country === "India" ? indianStates : [];

  return (
    <select
      value={state}
      onChange={(e) => onChange(e.target.value)}
      className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
    >
      <option value="">Select State</option>
      {statesList.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
};

export default StateDropdown;
