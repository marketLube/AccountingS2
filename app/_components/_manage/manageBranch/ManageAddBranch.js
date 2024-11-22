import Button from "../../utils/Button";

function ManageAddBranch({ onSetIsAdding, isAdding }) {
  return (
    <>
      {!isAdding ? (
        <Button
          style={{ width: "100%", height: "100%", fontWeight: "600" }}
          onClick={() => onSetIsAdding(true)}
        >
          Add new
        </Button>
      ) : (
        <>
          <Button
            style={{ width: "100%", height: "100%", fontWeight: "600" }}
            onClick={() => onSetIsAdding(false)}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
}

export default ManageAddBranch;
