export const metadata = {
  title: "Daybook",
};

function Page() {
  return (
    <div className={`layout daybook`}>
      <h1 className={`main-head`}>Daybook</h1>
      <div className={`layout-body`}>
        <div className={`layout-head`}>{/* <Button /> */}</div>
        <div className={`layout-table`}>table</div>
        <div className={`layout-footer`}>Footer</div>
      </div>
    </div>
  );
}

export default Page;
