function BranchShower({ branches, curBranch }) {
  if (curBranch && !curBranch.startsWith("All")) {
    return <div>{curBranch}</div>;
  }

  if (branches.length === 0) return <div>--</div>;
  if (branches?.length === 1) return <div>{branches[0]}</div>;
  return <div>Multiple</div>;
}

export default BranchShower;
