"use clients";

import { useDispatch, useSelector } from "react-redux";
import Button from "../../utils/Button";

function OutstandingFooter() {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.outstanding);
  return (
    <div>
      <>
        <Button
          type={type === "All Status" ? "primary" : "thertiary"}
          onClick={() => dispatch(setDaybookType("All Status"))}
        >
          All Status
        </Button>
        <Button
          type={type === "Debit" ? "primary" : "thertiary"}
          onClick={() => dispatch(setDaybookType("Debit"))}
        >
          Expanse
        </Button>
        <Button
          type={type === "Credit" ? "primary" : "thertiary"}
          onClick={() => dispatch(setDaybookType("Credit"))}
        >
          Income
        </Button>
        <Button
          type={type === "Bank" ? "primary" : "thertiary"}
          onClick={() => dispatch(setDaybookType("Bank"))}
        >
          Bank
        </Button>
      </>
    </div>
  );
}

export default OutstandingFooter;
