"use client";
function BanktoTableitem({ banktobank }) {
  console.log(banktobank, "uuuuuuu");

  return (
    <>
      <div className="table-col">
        <span className="table-check">
          <input type="checkbox" />
        </span>
        <span className="table-col particular table-body-col">55/9/0</span>
        <span className="table-col date table-body-col">rbl</span>
        <span className="table-col amount table-body-col">kochi</span>
        <span className="table-col remark table-body-col">sbi</span>
        <span className="table-col branch table-body-col">kottayam</span>
        <span className="table-col bank table-body-col">2000</span>
      </div>
    </>
  );
}

export default BanktoTableitem;
