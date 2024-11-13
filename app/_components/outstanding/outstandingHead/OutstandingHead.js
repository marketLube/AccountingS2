import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Search from "@/app/_components/utils/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOutstandingNewEntry,
  setOutstandingCurBank,
  setOutstandingCurBranch,
  setOutstandingCurCat,
  setOutstandingCurParticular,
  setOutstandingIsEdit,
} from "@/lib/slices/outstandingSlice";
import FsModal from "../../utils/FsModal";
import OutstandingNewEntryForm from "../../_Forms/_outstandingForms/OutstandingNewEntryForm";
import { setLiabilityIsEdit } from "@/lib/slices/liabilitySlice";
import OutstandingEditForm from "../../_Forms/_outstandingForms/OutstandingEditForm";
import Selector from "../../utils/Selector";

function OutstandingHead() {
  const dispatch = useDispatch();
  const {
    isNewEntry,
    selectedItems,
    isEdit,
    particulars,
    curCat,
    curParticular,
    curBank,
  } = useSelector((state) => state.outstanding);

  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );

  const handleBranchChange = (e) => {
    dispatch(setOutstandingCurBranch(e.target.value));
  };
  const handleCatChange = (e) => {
    dispatch(setOutstandingCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setOutstandingCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setOutstandingCurBank(e.target.value));
  };

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
          <Selector
            options={["All Categories", ...categoryNames]}
            callback={handleCatChange}
          />
          <Selector
            options={["All Particulars", ...particulars]}
            callback={handleParticularChange}
            disabled={curCat?.startsWith("All")}
            curValue={curParticular}
          />
          <Selector
            options={["All Branches", ...branchNames]}
            callback={handleBranchChange}
          />
          <Selector
            options={["All Banks", ...bankNames]}
            callback={handlebankChange}
            curValue={curBank}
          />
          <Search />
          <Button type="filter">
            <GiSettingsKnobs />
          </Button>
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
