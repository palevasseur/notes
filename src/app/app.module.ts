import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { NotesAppComponent } from './notes-app/notes-app.component';
import { FilterNotesPipe } from './notes-app/filter-notes.pipe';

export const firebaseConfig = {
  apiKey: 'AIzaSyCnaOC0gmAab9iEGN9I1UyIR3G8zwCvkWk',
  authDomain: 'notes-6f837.firebaseapp.com',
  databaseURL: 'https://notes-6f837.firebaseio.com',
  storageBucket: 'notes-6f837.appspot.com',
  messagingSenderId: '294714633105'
};

@NgModule({
  imports: [ BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [ AppComponent, NotesAppComponent, FilterNotesPipe ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
