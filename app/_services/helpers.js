export const truncate = (string, num = 40) => {
  if (string?.length <= num) return string;
  return string?.slice(0, num) + "...";
};
