import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { NoteService } from '../../../_services/note.service';
import { Note } from '../../../_models/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() id: number;
  @Input() content: string;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<Note> = new EventEmitter<Note>();
  

  constructor(private noteService: NoteService) {
    this.content = "",
    this.id = 0;
  }

  ngOnInit() {
  }

  onUpdateNote() {
    this.noteService.updateNote(this.id, this.content)
      .subscribe(res => {
        let note = new Note();
        note.id = this.id;
        note.content = this.content;
        this.update.emit(note);
      }, error => {
        console.error(error);
      });
  }

  onDeleteNote() {
  	this.noteService.deleteNote(this.id)
      .subscribe(res => {
        this.delete.emit(this.id);
      }, error => {
        console.error(error);
      });
  }

}
