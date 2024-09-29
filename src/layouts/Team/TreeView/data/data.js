const BuildTree = (data, view) => {

  if (!data || data.length === 0) {
    return []; // Return empty array if data is undefined or empty
  }
  const map = {};
  const roots = [];

  data.forEach((item) => {
    map[item.userId] = { ...item, children: [] };
  });

  data.forEach((item) => {
    const parentId = view === "placement" ? item.placementId : item.sponsorId;
    if (parentId && map[parentId]) {
      map[parentId].children.push(map[item.userId]);
    } else {
      roots.push(map[item.userId]);
    }
  });

  return roots;
};

export default BuildTree;
