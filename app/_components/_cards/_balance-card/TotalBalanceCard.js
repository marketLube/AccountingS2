import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useState } from "react";
function TotalBalanceCard() {
  const { banks } = useSelector((state) => state.general);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  let total = 0;

  return (
    <div className="balance-card">
      <div>
        <div className="balance-card-header">
          <div className="small-text">Total Available balance</div>
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
                <span className="balance-card-balance">
                  {isBalanceVisible ? `${bank?.balance} $` : "****"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="balance-card-balance-total">
        {isBalanceVisible ? `${total} $` : "****"}
      </div>
    </div>
  );
}

export default TotalBalanceCard;
