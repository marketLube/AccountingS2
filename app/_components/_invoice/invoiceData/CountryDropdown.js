const CountryDropdown = ({ onChange, value }) => {
    const countries = [
      "United States", "United Kingdom", "Canada", "Australia", 
      "Germany", "France", "Japan", "China", "Russia", 
      "Brazil", "South Africa", "Italy", "Spain", "Mexico","India"
      // Add more countries here...
    ];
  
    return (
      <select
        value={value}
        onChange={onChange}
        className=" flex flex-wrap w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-city"
        >
        {/* Placeholder option */}
        <option value="" disabled>
          India
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    );
  };
  

export default CountryDropdown;
