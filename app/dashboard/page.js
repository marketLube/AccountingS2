export const metadata = {
  title: "Dashboard",
};
function Page() {
  return (
    <div className={`layout dashboard`}>
      <div className={`dashboard-head`}>
        <h1 className={`main-head`}>Dashboard</h1>
      </div>
      <div className={`dashboard-left`}>
        <div className={`dashboard-stats`}>
          <div className={`stats-box`}></div>
          <div className={`stats-box`}></div>
          <div className={`stats-box`}></div>
          <div className={`stats-box`}></div>
          <div className={`stats-box`}></div>
        </div>
        <div className={`stats-box dashboard-chart`}></div>
      </div>
      <div className={`dashboard-right`}>
        <div className={`stats-box dashboard-curbalance`}></div>
        <div className={`stats-box dashboard-reminder`}></div>
      </div>
    </div>
  );
}

export default Page;
