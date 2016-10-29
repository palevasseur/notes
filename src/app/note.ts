export class Note {
  id: number;
  title: string = '';
  complete: boolean = false;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
