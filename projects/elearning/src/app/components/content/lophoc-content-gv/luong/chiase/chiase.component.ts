import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-chiase',
  templateUrl: './chiase.component.html',
  styleUrls: ['./chiase.component.css']
})
export class ChiaseComponent implements OnInit {

  task: Task = {
    name: 'Chọn tất cả học viên',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Huy Nguyễn', completed: false, color: 'primary'},
      {name: 'Tốt địt', completed: false, color: 'accent'},
      {name: 'Văn Thịnh', completed: false, color: 'warn'}
    ]
  };


  constructor(public dialogRef: MatDialogRef<ChiaseComponent>) { }
  allComplete: boolean = false;
  ngOnInit(): void {
  }
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  checked: boolean=false;
}
