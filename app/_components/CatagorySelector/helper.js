export const checkCaseSensitivity = async (arr, value) => {
  if (!arr || !value) return false;
  let ans = arr.some((val) => {
    return val?.name?.toLowerCase() === value.toLowerCase();
  });
  return ans;
};
