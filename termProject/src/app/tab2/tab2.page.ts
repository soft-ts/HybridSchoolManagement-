import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonList, IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol
  
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone:true,
 imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonList, 
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol
  
  ]


})
export class Tab2Page {

  students: any[] = [];
  apiURL = "http://localhost:3000/";

  
  newStudent = {
    id: '',
    lastName: '',
    firstName: '',
    course: '',
    gpa: ''
  };

  constructor(private http: HttpClient) {}

  showRecords() {
    this.http.get(this.apiURL + "showRecords").subscribe((data: any) => {
      this.students = data;
    });
  }

  addRecord() {
    const body = {
      id: Number(this.newStudent.id),
      lastName: this.newStudent.lastName,
      firstName: this.newStudent.firstName,
      course: this.newStudent.course,
      gpa: Number(this.newStudent.gpa)
    };

    this.http.post(this.apiURL + "addRecord", body)
      .subscribe(res => {
        alert(res);
        this.showRecords();
        
        this.newStudent = { id: '', lastName: '', firstName: '', course: '', gpa: '' };
      });
  }

  deleteRecord(id: number) {
    this.http.post(this.apiURL + "deleteRecord", { id })
      .subscribe(res => {
        alert(res);
        this.showRecords();
      });
  }

  editRecord(student: any) {
    const updated = {
      lastName: prompt("Enter new last name:", student.lastName),
      firstName: prompt("Enter new first name:", student.firstName),
      course: prompt("Enter new course:", student.course),
      gpa: Number(prompt("Enter new GPA:", student.gpa))
    };

    if (!updated.lastName || !updated.firstName || !updated.course || !updated.gpa) return;

    this.http.post(this.apiURL + "updateRecord", {
      id: student.id,
      ...updated
    }).subscribe(res => {
      alert(res);
      this.showRecords();
    });
  }
   clearForm() {
    this.newStudent = { id: '', lastName: '', firstName: '', course: '', gpa: '' };
  }
}
