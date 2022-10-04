const addBtn = document.querySelector("#add");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNote = (text = " ") => {
  const note = document.createElement("div"); //creating a div into the js file.
  note.classList.add("note"); //assigning the class name of div that is note.
  const htmlData = `
        <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? " " : "hidden"}">
        <hr>
        </div>
        <textarea class="${text ? "hidden" : " "} "></textarea>
    `;
  note.insertAdjacentHTML("afterbegin", htmlData);

  //getting the reference of operation
  const editBtn = note.querySelector(".edit");
  const delBtn = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  //deleting the note
  delBtn.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  //toggle using edit button
  textArea.value = text;
  mainDiv.innerHTML = text;

  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden"); //here toggle will work as a to switch the hidden class that is define in css file
    textArea.classList.toggle("hidden"); //here toggle will work as a to switch the hidden class that is define in css file
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);
};

//getting data from local storage

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNote(note));
}

addBtn.addEventListener("click", () => {
  addNote();
});
