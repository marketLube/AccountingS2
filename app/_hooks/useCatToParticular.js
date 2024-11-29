import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useCatToParticular(catagory, setter, desetter) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (catagory) {
      const particulars = catagory?.particulars?.map((par) => par.name);
      dispatch(setter(particulars));
    } else {
      dispatch(desetter("All Particulars"));
    }
  }, [catagory]);

  return null;
}

export default useCatToParticular;
