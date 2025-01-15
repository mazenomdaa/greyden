// Counter to track guests
let guestCounter = 1;
let table;
let rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"];
let barMenu = ["v-Cola", "Coffee", "Tea"];

// Function to add new guests
function newTableRow(table) {
  let newRow = table.insertRow();

  // Guest number
  let cell = newRow.insertCell();
  cell.textContent = guestCounter++; // Increment the guest counter

  // Room dropdown and timer
  cell = newRow.insertCell();
  const roomContainer = document.createElement("div");

  // Room dropdown
  const select = document.createElement("select");

  // Default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Room";
  defaultOption.disabled = true; // Make it unselectable
  defaultOption.selected = true; // Set it as the default selected option
  select.appendChild(defaultOption);

  // Room options
  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room;
    option.textContent = room;
    select.appendChild(option);
  });

  // Room start time display
  const roomStartTime = document.createElement("div");
  roomStartTime.textContent = "Start Time:";
  roomStartTime.style.marginTop = "5px";

  // Room timer display
  const roomTimer = document.createElement("div");
  roomTimer.textContent = "Time: 00:00";
  roomTimer.style.marginTop = "5px";

  // Room start/stop button
  const roomButton = document.createElement("button");
  roomButton.textContent = "Start";
  roomButton.style.marginTop = "5px";

  // Room timer logic
  let roomTimerInterval = null;
  let roomSeconds = 0;

  roomButton.addEventListener("click", () => {
    if (roomButton.textContent === "Start") {
      // Disable the dropdown when the timer starts
      select.disabled = true;
      // Set start time in 12-hour format
      const now = new Date();
      roomStartTime.textContent = `Start Time: ${now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;

      // Start the timer
      roomButton.textContent = "Stop";
      roomTimerInterval = setInterval(() => {
        roomSeconds++;
        const minutes = Math.floor(roomSeconds / 60);
        const displaySeconds = roomSeconds % 60;
        roomTimer.textContent = `Time: ${minutes
          .toString()
          .padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}`;
      }, 1000);
    } else {
      // Stop the timer
      roomButton.textContent = "Start";
      clearInterval(roomTimerInterval);

      // Re-enable the dropdown when the timer stops
      select.disabled = false;
    }
  });

  roomContainer.appendChild(select);
  roomContainer.appendChild(roomStartTime);
  roomContainer.appendChild(roomTimer);
  roomContainer.appendChild(roomButton);
  cell.appendChild(roomContainer);

  // Billiardo timer and button
  cell = newRow.insertCell();
  const billiardoContainer = document.createElement("div");

  // Billiardo start time display
  const billiardoStartTime = document.createElement("div");
  billiardoStartTime.textContent = "Start Time:";
  billiardoStartTime.style.marginTop = "5px";

  // Billiardo timer display
  const billiardoTimer = document.createElement("div");
  billiardoTimer.textContent = "Time: 00:00";
  billiardoTimer.style.marginTop = "5px";

  // Billiardo start/stop button
  const billiardoButton = document.createElement("button");
  billiardoButton.textContent = "Start";
  billiardoButton.style.marginTop = "5px";

  // Billiardo timer logic
  let billiardoTimerInterval = null;
  let billiardoSeconds = 0;

  billiardoButton.addEventListener("click", () => {
    if (billiardoButton.textContent === "Start") {
      // Set start time in 12-hour format
      const now = new Date();
      billiardoStartTime.textContent = `Start Time: ${now.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit", hour12: true }
      )}`;

      // Start the timer
      billiardoButton.textContent = "Stop";
      billiardoTimerInterval = setInterval(() => {
        billiardoSeconds++;
        const minutes = Math.floor(billiardoSeconds / 60);
        const displaySeconds = billiardoSeconds % 60;
        billiardoTimer.textContent = `Time: ${minutes
          .toString()
          .padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}`;
      }, 1000);
    } else {
      // Stop the timer
      billiardoButton.textContent = "Start";
      clearInterval(billiardoTimerInterval);
    }
  });

  billiardoContainer.appendChild(billiardoStartTime);
  billiardoContainer.appendChild(billiardoTimer);
  billiardoContainer.appendChild(billiardoButton);
  cell.appendChild(billiardoContainer);
  // Bar dropdown, display, and buttons
  cell = newRow.insertCell();
  const barContainer = document.createElement("div");

  // Bar dropdown
  const barSelect = document.createElement("select");

  // Default option
  const defaultBarOption = document.createElement("option");
  defaultBarOption.value = "";
  defaultBarOption.textContent = "Select Item";
  defaultBarOption.disabled = true; // Make it unselectable
  defaultBarOption.selected = true; // Set it as the default selected option
  barSelect.appendChild(defaultBarOption);

  // Bar menu options
  barMenu.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    barSelect.appendChild(option);
  });

  // Selected items display
  const selectedItemsContainer = document.createElement("div");
  selectedItemsContainer.style.marginTop = "5px";

  // Object to keep track of selected items and their counts
  let selectedItems = {};

  // Function to update the selected items display
  const updateSelectedItems = () => {
    selectedItemsContainer.textContent = "Selected Items: ";
    const items = Object.entries(selectedItems)
      .map(([item, count]) => `${item} (${count})`)
      .join(", ");
    selectedItemsContainer.textContent += items || "None";
  };

  // Buttons for editing items
  const addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.style.marginLeft = "5px";

  const removeButton = document.createElement("button");
  removeButton.textContent = "-";
  removeButton.style.marginLeft = "5px";

  // Event listener for adding items
  addButton.addEventListener("click", () => {
    const selectedItem = barSelect.value;
    if (selectedItem) {
      selectedItems[selectedItem] = (selectedItems[selectedItem] || 0) + 1;
      updateSelectedItems();
    }
  });

  // Event listener for removing items
  removeButton.addEventListener("click", () => {
    const selectedItem = barSelect.value;
    if (selectedItem && selectedItems[selectedItem]) {
      selectedItems[selectedItem] -= 1;
      if (selectedItems[selectedItem] === 0) {
        delete selectedItems[selectedItem];
      }
      updateSelectedItems();
    }
  });

  barContainer.appendChild(barSelect);
  barContainer.appendChild(addButton);
  barContainer.appendChild(removeButton);
  barContainer.appendChild(selectedItemsContainer);

  cell.appendChild(barContainer);

  // Total cost
  cell = newRow.insertCell();
  cell.textContent = `${guestCounter * 100} EGP`;

  // Check out button
  cell = newRow.insertCell();
  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";

  // Event listener for "Done" button
  doneButton.addEventListener("click", () => {
    // Collect row data
    const rowData = [];
    for (let i = 0; i < newRow.cells.length - 1; i++) {
      rowData.push(newRow.cells[i].textContent || newRow.cells[i].innerText);
    }

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(rowData);
    localStorage.setItem("history", JSON.stringify(history));

    // Remove the row from the table
    table.deleteRow(newRow.rowIndex);
  });

  cell.appendChild(doneButton);
}

// Function generates a table with a list of guests
function addGuest() {
  // If there is no table, create one
  if (!table) {
    table = document.createElement("table");
    table.id = "guestTable";

    // Add a table header row
    let headerRow = table.insertRow();
    let headers = [
      "Guest Number",
      "Room",
      "Billiardo",
      "Bar",
      "Total",
      "Check Out",
    ];
    headers.forEach((headerText) => {
      let th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    document.body.appendChild(table);
  }
  newTableRow(table);
}

// Event listener to add guests
document.getElementById("addGuest").addEventListener("click", addGuest);
