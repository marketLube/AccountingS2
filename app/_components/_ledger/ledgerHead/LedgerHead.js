import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "../../utils/Search";

function LedgerHead() {
  return (
    <LayoutHead>
      <>
        <Button>+ New Entri</Button>
        <Button type="secondary">Edit</Button>
      </>
      <>
        <Search />
        <Button type="filter">
          <GiSettingsKnobs />
        </Button>
      </>
    </LayoutHead>
  );
}

export default LedgerHead;
