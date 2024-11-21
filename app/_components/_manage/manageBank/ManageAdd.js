import Button from "../../utils/Button";

function ManageAdd({ onSetIsAdding, isAdding }) {
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

          {/* <FaCheck
            color="green"
            style={{ cursor: "pointer" }}
            onClick={() => onSetIsAdding(false)}
          /> */}
        </>
      )}
    </>
  );
}

export default ManageAdd;
