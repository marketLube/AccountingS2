import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "@/app/_components/utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setIsOutstandingNewEntry } from "@/lib/slices/outstandingSlice";
import FsModal from "../../utils/FsModal";
import OutstandingNewEntryForm from "../../_Forms/_outstandingForms/OutstandingNewEntryForm";

function OutstandingHead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.outstanding);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsOutstandingNewEntry(true))}>
            + New Entri
          </Button>
          <Button type="secondary">Edit</Button>
          <Button type="thertiary">Log</Button>
        </>
        <>
          <Search />
          <Button type="filter">
            <GiSettingsKnobs />
          </Button>
        </>
      </LayoutHead>
      <FsModal isOpen={isNewEntry} setIsCancel={setIsOutstandingNewEntry}>
        <OutstandingNewEntryForm />
      </FsModal>
    </>
  );
}

export default OutstandingHead;
