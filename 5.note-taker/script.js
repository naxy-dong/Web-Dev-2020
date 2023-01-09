function initialize() {
    subtopicOutArr = [];
    subtopicBtnArr = [];
    subtopicExpandArr = [];
    for (i = 1; i <= 3; i++) {
        subtopicOutArr[i - 1] = document.getElementById(`SubTopic${i}`);
        subtopicBtnArr[i - 1] = document.getElementById(`SubTopic${i}Btn`);
        subtopicExpandArr[i - 1] = false;
    }
    Annotation = document.getElementById("AnnoList");
    AnnotationForm = document.getElementById("AnnoForm");
    AnnotationList = [];
}

function ExpandTexts(mod) {
    idx = mod - 1
    if (subtopicExpandArr[idx] == false) {
        subtopicOutArr[idx].innerHTML = paragraphs[idx];
        subtopicBtnArr[idx].innerHTML = `<h3>- ${subtopics[idx]}</h3>`;
        subtopicBtnArr[idx].style.backgroundColor = "#00bb00";
        subtopicBtnArr[idx].style.color = "white";
    }
    else {
        subtopicOutArr[idx].innerHTML = "";
        subtopicBtnArr[idx].innerHTML = `<h3>+ ${subtopics[idx]}</h3>`;
        subtopicBtnArr[idx].style.backgroundColor = "#EEEEEE";
        subtopicBtnArr[idx].style.color = "black";
    }
    subtopicExpandArr[idx] = !subtopicExpandArr[idx];
}

function SelectTexts() {
    SelectedText = window.getSelection() + "<br />";
}

function AddAnnotation() {
    // To ensure that the user didn't select nothing
    if (SelectedText.trim() === "")
    {
        alert("Please selected a text");
        return;
    }
    AnnotationList.push([SelectedText]);
    display();
}

//possible improvements: instead of deleting one by one, the user could use a range (ex: 2-7), or select multiple specific annotations (ex: 2,3,6,7)
function DeleteAnnotation() {
    Annoidx = AnnotationForm.Annoindex.value;
    if (checkInvalidAnnoIdx(Annoidx))
        return

    AnnotationList.splice(Annoidx - 1, 1);
    display();
}

function AddNote() {
    Annoidx = AnnotationForm.Annoindex.value;
    NoteContent = AnnotationForm.Note.value;

    if (checkInvalidAnnoIdx(Annoidx))
        return
    AnnotationList[Annoidx - 1].push(NoteContent);
    display();
}

function EditNote() {
    Noteidx = AnnotationForm.Noteindex.value;
    Annoidx = AnnotationForm.Annoindex.value;
    NoteContent = AnnotationForm.Note.value;

    if (checkInvalidAnnoIdx(Annoidx))
        return;
    if (checkInvalidNoteIdx(Noteidx))
        return;
    AnnotationList[Annoidx - 1][Noteidx] = NoteContent;
    display();
}

function DeleteNote() {
    Annoidx = AnnotationForm.Annoindex.value;
    Noteidx = AnnotationForm.Noteindex.value;

    if (checkInvalidAnnoIdx(Annoidx))
        return;
    if (checkInvalidNoteIdx(Noteidx))
        return;
    AnnotationList[Annoidx - 1].splice(Noteidx, 1);
    display();
}

function display() {
    Annotation.innerHTML = "";
    for (i = 0; i < AnnotationList.length; i++) {
        //It display the annotations
        Annotation.innerHTML += (i + 1) + ": " + AnnotationList[i][0]; 
        for (j = 1; j < AnnotationList[i].length; j++) {
            // It display the notes
            Annotation.innerHTML += "<li>" + j + ": " + AnnotationList[i][j] + "</li>" 
        }
        Annotation.innerHTML += "<hr />";
    }
}

function checkInvalidAnnoIdx(idx) {
    if (idx > AnnotationList.length || idx <= 0) {
        alert("invalid annotation index");
        return true;
    }
    return false;
}

function checkInvalidNoteIdx(idx) {
    if (idx >= AnnotationList[Annoidx - 1].length || idx <= 0) {
        alert("invalid note index");
        return true;
    }
    return false;
}