import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

/*
 todo:
  - manage firebase auth. : { "rules": { ".read": "auth != null", ".write": "auth != null" } }
 */

@Component({
  selector: 'app-notes-app',
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.css'],
  providers: [NoteService]
})
export class NotesAppComponent implements OnInit {

  keywords: string = '';
  searchResult: Note[] = [];
  displayNewNote: boolean = false;
  newNote: Note = new Note();

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
  }

  addNote() {
    if(this.keywords) {
      this.newNote.keywords = this.keywords.split(' ');
    }

    this.noteService.addNote(this.newNote);
    this.newNote = new Note();

    // update search list
    this.search();
  }

  removeNote(note) {
    this.noteService.deleteNoteById(note.id);

    // update search list
    this.search();
  }

  search() {
    this.searchResult = this.keywords ? this.noteService.getNotes(this.keywords) : this.noteService.getAllNotes();
  }

  get notes() {
    return this.searchResult;
  }

}
