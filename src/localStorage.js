function saveToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
}

function loadFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return null;
  }
}

export { saveToLocalStorage, loadFromLocalStorage };
