const util = require('util');
const fs = require('fs');
const uuid = require('uuid');
const readFileAsync = util.promisify(fs.ReadFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;
            })
        }

        addNote(note) {
            const {title, text} = note;

            if (!title || !text) {
              throw  (error)
            }
            
            const newNote = {title, text, id: uuid()};

            return this.getNotes()
                .then((notes) => notes.filter((note) => note.id !== id))
                .then((filteredNotes) => this.write(filteredNotes))
                .then(() => newNote);
        }

        removeNote(id) {
            return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
        }
    }

    module.exports = new Store()