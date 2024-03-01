import axios from "axios";
import { NOTES_API_URL } from "../Constants/api";

export const getNotes = async () => {
  try {
    const response = await axios.get(NOTES_API_URL);
    return response.data.listOfNotes;
  } catch (error) {
    console.error(error);
  }
};

export const createNote = async (newNote) => {
  try {
    const response = await axios.post(NOTES_API_URL, newNote);
    return response.data.listOfNotes;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNote = async (noteToDeleteId) => {
  try {
    const url = `${NOTES_API_URL}/${noteToDeleteId}`;
    const response = await axios.delete(url);
    return response.data.listOfNotes;
  } catch (error) {
    console.error(error);
  }
};

export const updateNote = async (noteToUpdate) => {
  try {
    const url = `${NOTES_API_URL}/${noteToUpdate._id}`;
    const response = await axios.put(url, noteToUpdate);
    return response.data.listOfNotes;
  } catch (error) {
    console.error(error);
  }
};
