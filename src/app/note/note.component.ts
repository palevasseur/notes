import {Component, OnInit} from '@angular/core';
import {Note} from "../note";
import {NoteService} from "../note.service";

type NoteStatus = 'display' | 'edit' | 'create';

@Component({
  selector: 'app-note',
  inputs: ['note', 'showExtra', 'mode', 'display'],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  public note: any; // todo: split Note and NoteDB
  public showExtra: boolean;
  public mode: NoteStatus = 'display';
  public display: boolean = true;

  private keywordsInput = '';

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    if(this.mode == 'create') {
      this.note = new Note();
    }

    if(!this.note) {
      console.error('missing note object !');
    }
  }

  public showNote() {
    this.display = true;
  }

  public hideNote() {
    this.display = false;
  }

  formatDate(date: number) {
    return (new Date(date)).toString();
  }

  editNote() {
    this.keywordsInput = this.note.keywords ? this.note.keywords.join(',') : '';
    this.mode = 'edit';
  }

  updateNote() {
    if(!this.note.$key) {
      console.error('upateNote() failed, missing $key');
    }

    this.noteService.updateNote(this.note.$key, {
        title: this.note.title,
        text: this.note.text,
        keywords: this.keywordsInput.split(','),
        date: this.note.date
      }
    );

    this.mode = 'display';
  }


  createNote() {
    this.noteService.addNote({
        title: this.note.title,
        text: this.note.text,
        keywords: this.keywordsInput.split(','),
        date: (new Date()).getTime()
      }
    );

    this.note = new Note();
    this.display = false;
  }

  cancel() {
    if(this.mode=='create') {
      this.note = new Note();
      this.display = false;
    }
    else {
      // todo: refresh data to see previous value
      this.mode = 'display';
    }
  }

  removeNote() {
    this.noteService.deleteNoteById(this.note.$key);
  }
}
