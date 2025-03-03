// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort((a: any, b: any) => {
    const dateA = new Date(a.data.date || 0).getTime(); // Use 0 as a fallback
    const dateB = new Date(b.data.date || 0).getTime();
    return dateB - dateA; // Sort in descending order
  });
  return sortedArray;
};
/*
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a:any, b:any) =>
      new Date(b.data.date && b.data.date) -
      new Date(a.data.date && a.data.date)
  );
  return sortedArray;
};
*/

// sort product by weight
export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter(
    (item: { data: { weight: any } }) => item.data.weight
  );
  const withoutWeight = array.filter(
    (item: { data: { weight: any } }) => !item.data.weight
  );
  const sortedWeightedArray = withWeight.sort(
    (a: { data: { weight: number } }, b: { data: { weight: number } }) =>
      a.data.weight - b.data.weight
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};
