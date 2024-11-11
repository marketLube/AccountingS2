import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useCatToParticular(catagory, setter) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (catagory) {
      const particulars = catagory.particulars.map((par) => par.name);
      dispatch(setter(particulars));
    }
  }, [catagory]);
  return null;
}

export default useCatToParticular;
