export const checkCaseSensitivity = async (arr, value) => {
  if (!arr || !value) return false;
  console.log(value, "value");
  let ans = arr.some((val) => {
    console.log(val?.name?.toLowerCase(), "arr.val", value.toLowerCase());
    return val?.name?.toLowerCase() === value.toLowerCase();
  });
  console.log(ans, "ans");
  return ans;
};
