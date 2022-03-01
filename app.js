const notes = require('./notes.js')
const yargs = require('yargs');
const { showHelpOnFail, demandOption, describe } = require('yargs');

// this command adds new note
yargs.command({
    command: 'add', 
    describe: 'Add a new note',
    builder: { 
            title:{
                describe: 'Note title',
                demandOption: true, 
                type: 'string'
            },
            body:{
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            },
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
})

// this command remove a note
yargs.command({
    command: 'remove', 
    describe: 'Remove a note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// this command print out all notes
yargs.command({
    command: 'list', 
    describe: 'List all note',
    handler(){
        notes.listNotes();
    }
})

// this command read a note
yargs.command({
    command: 'read', 
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

yargs.parse();
