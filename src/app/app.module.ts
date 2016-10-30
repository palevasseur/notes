import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NotesAppComponent } from './notes-app/notes-app.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, MaterialModule.forRoot() ],
  declarations: [ AppComponent, NotesAppComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
