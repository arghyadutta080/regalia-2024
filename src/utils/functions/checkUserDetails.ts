export const checkUserDetails = (data: Record<string, any>) => {
  let isSatisfied = true;
  Object.keys(data || {}).forEach((key) => {
    if (key !== "college_roll" && (data[key] == null || data[key] === "" || data[key] === undefined)) {
      isSatisfied = false;
    }
  });
  return isSatisfied;
};
