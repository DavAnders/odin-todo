function saveToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
}

function loadFromLocalStorage(key) {
  let parsedItem;
  try {
    const item = localStorage.getItem(key);
    parsedItem = JSON.parse(item);
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return null;
  }
  return parsedItem;
}
