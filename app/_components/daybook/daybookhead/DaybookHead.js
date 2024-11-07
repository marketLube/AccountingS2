"use client";

import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";
import Search from "../../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { setIsDaybookNewEntri } from "@/lib/slices/daybookSlice";
import FsModal from "../../utils/FsModal";
import DaybookNewEntirForm from "../../_Forms/_daybookForms/DaybookNewEntirForm";

function DaybookHead() {
  const dispatch = useDispatch();
  const { isNewEntry } = useSelector((state) => state.daybook);
  const { isEdit } = useSelector((state) => state.daybook);
  return (
    <>
      <LayoutHead>
        <>
          <Button onClick={() => dispatch(setIsDaybookNewEntri(true))}>
            + New Entri
          </Button>
          <Button>+ Bank to Bank</Button>
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

      <FsModal isOpen={isNewEntry} setIsCancel={setIsDaybookNewEntri}>
        <DaybookNewEntirForm />
      </FsModal>
    </>
  );
}

export default DaybookHead;
