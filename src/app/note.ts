export class Note {
  id: string;
  title: string = '';
  text: string = '';
  keywords: string[];

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
