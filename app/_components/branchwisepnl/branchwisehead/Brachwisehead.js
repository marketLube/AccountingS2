"use client";
import { useDispatch, useSelector } from "react-redux";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Selector from "../../utils/Selector";
import { useEffect } from "react";
import {
  setBranchwiseCurBank,
  setBranchWiseCurBranch,
  setBranchwiseCurCat,
  setBranchwiseCurParticular,
} from "@/lib/slices/branchwiseSlice";
import { refreshBranchwise } from "@/app/_hooks/useBranchwise";

function Brachwisehead() {
  const { branchNames, categoryNames, bankNames } = useSelector(
    (state) => state.general
  );
  const { curBranch } = useSelector((state) => state.branchwise);
  const dispatch = useDispatch();

  const { particulars, curCat, curParticular, curBank } = useSelector(
    (state) => state.branchwise
  );

  const handleCatChange = (e) => {
    dispatch(setBranchwiseCurCat(e.target.value));
  };
  const handleParticularChange = (e) => {
    dispatch(setBranchwiseCurParticular(e.target.value));
  };

  const handlebankChange = (e) => {
    dispatch(setBranchwiseCurBank(e.target.value));
  };

  useEffect(() => {
    if (branchNames?.length >= 1) {
      dispatch(setBranchWiseCurBranch(branchNames[0]));
    }
  }, [branchNames]);

  const handleBranchChange = (e) => {
    dispatch(setBranchWiseCurBranch(e.target.value));
    refreshBranchwise();
  };

  return (
    <LayoutHead>
      <>
        <Selector
          curValue={curBranch}
          callback={handleBranchChange}
          options={branchNames}
        />
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
      </>
    </LayoutHead>
  );
}

export default Brachwisehead;
