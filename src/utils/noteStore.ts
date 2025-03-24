import { Note } from "../../type";

let notes: Note[] = [];

export const getNotes = () => notes;

export const getNote = (id: string) => notes.find(n => n.id === id) || null;

export const addNote = (note: Note) => {
    notes.push(note);
};

export const updateNote = (id: string, updatedNote: Note) => {
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) notes[index] = updatedNote;
};

export const deleteNote = (id: string) => {
    notes = notes.filter(n => n.id !== id);
};
