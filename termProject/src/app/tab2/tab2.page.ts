import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],




})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  students: any;
  selectedStudent: any = null;
  isEditMode = false;

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  displayedColumns: string[] = [
    'ID',
    'Last Name',
    'First Name',
    'Course',
    'GPA'
  ];

  showStudents() {
    this.http.get(this.apiURL + '/showStudents').subscribe((data) => {
      this.students = data;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const fields = ['id', 'lastName', 'firstName', 'course', 'gpa'];
    const formdata = new FormData();

    fields.forEach((field) => {
      const value = (document.getElementById(field) as HTMLInputElement)?.value ?? '';
      formdata.append(field, value);
    });

    if (this.isEditMode) {
      this.http.put(this.apiURL + '/updateStudents', formdata).subscribe((data) => {
        alert(data);
        this.showStudents();
      });
    } else {
      this.http.post(this.apiURL + '/addStudents', formdata).subscribe((data) => {
        alert(data);
        this.showStudents();
      });
    }

    this.modal.dismiss(null, 'confirm');
  }

  fetchStudent(id: any) {
    this.isEditMode = true;

    this.http
      .get(this.apiURL + '/getStudent/?id=' + id)
      .subscribe((data: any) => {
        this.selectedStudent = data;

        (document.getElementById('id') as HTMLInputElement).value = data.id;
        (document.getElementById('lastName') as HTMLInputElement).value = data.lastName;
        (document.getElementById('firstName') as HTMLInputElement).value = data.firstName;
        (document.getElementById('course') as HTMLInputElement).value = data.course;
        (document.getElementById('gpa') as HTMLInputElement).value = data.gpa;

        (document.getElementById('id') as HTMLInputElement).disabled = true;
      });

    this.modal.present();
  }

  deleteStudent(id: any) {
    this.http
      .delete(this.apiURL + '/deleteStudents/?id=' + id)
      .subscribe(() => {
        this.showStudents();
      });
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.isEditMode = false;
    (document.getElementById('id') as HTMLInputElement).disabled = false;
    this.selectedStudent = null;
    this.showStudents();
  }

  ngOnInit() {
    this.showStudents();
  }
}
