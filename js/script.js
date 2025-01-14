//counter to track guest
let guestCounter = 1;
let table;

//function adds new guests
function newTableRow(table) {
  let newRow = table.insertRow();

  let cell = newRow.insertCell();
  cell.textContent = guestCounter++; //increment the guest counter

  cell = newRow.insertCell();
  cell.textContent = `Room ${guestCounter} Time: 00:00`;

  cell = newRow.insertCell();
  cell.textContent = "00:00";

  cell = newRow.insertCell();
  cell.textContent = `Item => ${guestCounter * 10} EGP`;

  cell = newRow.insertCell();
  cell.textContent = `${guestCounter * 100} EGP`;

  cell = newRow.insertCell();
  const button = document.createElement("button");
  button.textContent = "Done";
  button.addEventListener("click", () => {
    alert(`Guest ${guestCounter - 1} marked as done!`);
  });
  cell.appendChild(button);
}

// function generates a table with list of guests
function addGuest() {
  // if there is no table create one
  if (!table) {
    table = document.createElement("table");
    table.id = "guestTable";

    // add a table header row
    let headerRow = table.insertRow();
    let headers = [
      "Guest Numeber",
      "Room Number",
      "Billiard",
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

document.getElementById("addGuest").addEventListener("click", addGuest);
