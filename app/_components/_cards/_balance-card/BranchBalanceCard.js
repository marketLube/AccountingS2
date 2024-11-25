import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useState } from "react";
import { bankFinder } from "@/app/_services/finders";

function BranchBalanceCard({ branch }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { banks: totalBanks } = useSelector((state) => state.general);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };
  if (!branch) return <div className="balance-card">Loading...</div>;

  const banks = [...(branch?.accounts || [])].reverse().map((bank) => {
    const name = bankFinder(bank.bank, totalBanks);
    console.log(name, "name");
    return { name, balance: bank.branchBalance };
  });

  let total = 0;

  return (
    <div className="balance-card">
      <div>
        <div className="balance-card-header">
          <div className="small-text">{branch?.name} Available balance</div>
          {isBalanceVisible ? (
            <IoEyeSharp className="icons" onClick={toggleBalanceVisibility} />
          ) : (
            <IoEyeOff className="icons" onClick={toggleBalanceVisibility} />
          )}
        </div>

        <div className="balance-card-body">
          {banks?.map((bank, i) => {
            total += bank.balance;
            return (
              <div key={i} className="balance-card-item-box">
                <span className="balance-card-name-box">{bank?.name}</span>
                <span
                  className="balance-card-balance"
                  style={{
                    color: isBalanceVisible && bank?.balance < 0 ? "red" : "",
                  }}
                >
                  {isBalanceVisible ? `${bank?.balance} ₹` : "****"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="balance-card-balance-total"
        style={{
          color: isBalanceVisible && total < 0 ? "red" : "",
        }}
      >
        {isBalanceVisible ? `${total} ` : "****"}
      </div>
    </div>
  );
}

export default BranchBalanceCard;
