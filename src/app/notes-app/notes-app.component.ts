import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes-app',
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.css'],
  providers: [NoteService]
})
export class NotesAppComponent implements OnInit {

  newNote: Note = new Note();

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
  }

  addNote() {
    this.noteService.addNote(this.newNote);
    this.newNote = new Note();
  }

  removeNote(note) {
    this.noteService.deleteNoteById(note.id);
  }

  get notes() {
    return this.noteService.getAllNotes();
  }

}
