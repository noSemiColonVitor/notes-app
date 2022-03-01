const { notEqual } = require('assert');
const { default: chalk } = require('chalk');
const fs = require('fs')

const filePath = 'notes.json'
const msgOutput = {
    newNoteAdded: 'New note added',
    noteTitleTaken: 'Note title taken!',
    noteNotFound: 'Note not found',
    noteRemovedSucessfully: 'Note removed successfully',
    yourNotes: 'Your Notes'
}

//this function adds a note, title and body args are required
const addNote =(title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    //search if the title alredy exists
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body,
        })
        
        saveNotes(notes);
        console.log(chalk.green.inverse(msgOutput['newNoteAdded']))
    }else{
        console.log(chalk.red.inverse(msgOutput['noteTitleTaken']))
    }
}

// this function remove a note, title arg is required 
const removeNote = (title) => {
    const notes = loadNotes()
    const notesFiltered = notes.filter((note) => note.title !== title)

    if(notes.length === notesFiltered.length){
        console.log(chalk.red.inverse(msgOutput['noteNotFound']))
    }else{
        console.log(chalk.green.inverse(msgOutput['noteRemovedSucessfully']))
        saveNotes(notesFiltered)
    }
}

// this function prints out all titles from the list
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.blue.inverse(msgOutput['yourNotes']))
    notes.forEach((note) => console.log(note.title));
}

// this function prints a note 
const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)
    if(noteFound){
        console.log(chalk.green(noteFound.title) + "\n" + noteFound.body)
    }else{
        console.log(chalk.red.inverse(msgOutput['noteNotFound']))
    }
}   

// this function saves notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync(filePath, dataJSON)
}

// this function  loads notes from the file 
const loadNotes = () => { 
    try{
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (e) {
        // if the file doesn't exists or it is empty, it will print out a empty array
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}