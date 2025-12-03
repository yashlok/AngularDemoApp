import { Component } from '@angular/core';
import { StudentDetailComponent } from "./student-detail/student-detail.component";

@Component({
  selector: 'app-student',
  imports: [StudentDetailComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

}
