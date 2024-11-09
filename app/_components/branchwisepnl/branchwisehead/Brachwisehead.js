"use client";
import { useDispatch, useSelector } from "react-redux";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";
import Selector from "../../utils/Selector";
import { useEffect } from "react";
import { setBranchWiseCurBranch } from "@/lib/slices/branchwiseSlice";
import { refreshBranchwise } from "@/app/_hooks/useBranchwise";

function Brachwisehead() {
  const { branchNames } = useSelector((state) => state.general);
  const { curBranch } = useSelector((state) => state.branchwise);
  const dispatch = useDispatch();

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
    </LayoutHead>
  );
}

export default Brachwisehead;
