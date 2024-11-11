import { IoEyeSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
function TotalBalanceCard() {
  const { banks } = useSelector((state) => state.general);

  return (
    <div className="balance-card">
      <div className="balance-card-header">
        <div className="small-text">Total Available balance</div>
        <IoEyeSharp className="icons" />
      </div>

      <div className="balance-card-body">
        {banks?.map((bank, i) => (
          <div key={i} className="balance-card-item-box">
            <span className="balance-card-name-box">{bank?.name}</span>
            <span className="balance-card-balance"> {bank?.balance} $</span>
          </div>
        ))}
      </div>
      <div className="balance-card-balance-total">$ 755,88,97</div>
    </div>
  );
}

export default TotalBalanceCard;
