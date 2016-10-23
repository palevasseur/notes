/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {Note} from './note';

describe('Note', () => {

  it('should create an instance', () => {
    expect(new Note()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let note = new Note({
      title: 'hello',
      complete: true
    });

    expect(note.title).toEqual('hello');
    expect(note.complete).toEqual(true);
  });

});
