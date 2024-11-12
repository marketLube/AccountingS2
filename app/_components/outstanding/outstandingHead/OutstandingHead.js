import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "@/app/_components/utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOutstandingNewEntry,
  setOutstandingIsEdit,
} from "@/lib/slices/outstandingSlice";
import FsModal from "../../utils/FsModal";
import OutstandingNewEntryForm from "../../_Forms/_outstandingForms/OutstandingNewEntryForm";
import { setLiabilityIsEdit } from "@/lib/slices/liabilitySlice";
import OutstandingEditForm from "../../_Forms/_outstandingForms/OutstandingEditForm";

function OutstandingHead() {
  const dispatch = useDispatch();
  const { isNewEntry, selectedItems, isEdit } = useSelector(
    (state) => state.outstanding
  );
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsOutstandingNewEntry(true))}>
            + New Entri
          </Button>
          <Button
            onClick={() => dispatch(setOutstandingIsEdit(true))}
            type={selectedItems?._id ? "primary" : "secondary"}
            disabled={selectedItems?._id}
          >
            Edit
          </Button>
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
      <FsModal isOpen={isEdit} setIsCancel={setOutstandingIsEdit}>
        <OutstandingEditForm />
      </FsModal>
    </>
  );
}

export default OutstandingHead;
