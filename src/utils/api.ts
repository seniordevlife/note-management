import { Note } from "../../type";

const API_BASE = '/api/notes';

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  const res = await fetch(`${API_BASE}/${id}`);  
  if (!res.ok) return null;
  return res.json();
};

export const createNote = async (note: Note): Promise<Note> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return res.json();
};

export const updateNoteById = async (id: string, note: Note): Promise<Note> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return res.json();
};

export const deleteNoteById = async (id: string): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
