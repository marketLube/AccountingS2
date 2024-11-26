import PageLoader from "./_components/layouts/PageLoader";
import "./loading.css";
function loading() {
  return (
    <div className="loader-container">
      <PageLoader />
    </div>
  );
}

export default loading;
