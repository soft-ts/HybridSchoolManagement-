import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  courses: any[] = [];
  course: any = {}; // Use this for ngModel binding in modal
  apiURL = "http://localhost:3000";

  isEditMode = false;

  displayedColumns: string[] = ['Course ID', 'Name', 'Instructor', 'Credits'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.showCourses();
  }

  showCourses() {
    this.http.get(this.apiURL + "/showCourses").subscribe(data => {
      this.courses = data as any[];
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const formdata = new FormData();
    formdata.append('courseId', this.course.courseId ?? '');
    formdata.append('name', this.course.name ?? '');
    formdata.append('description', this.course.description ?? '');
    formdata.append('instructor', this.course.instructor ?? '');
    formdata.append('credits', this.course.credits ?? '');

    if (this.isEditMode) {
      this.http.put(`${this.apiURL}/updateCourse`, formdata).subscribe(() => {
        alert('Course updated successfully!');
        this.showCourses();
      });
    } else {
      this.http.post(`${this.apiURL}/addCourse`, formdata).subscribe(() => {
        alert('Course added successfully!');
        this.showCourses();
      });
    }

    this.modal.dismiss(null, 'confirm');
  }

  fetchCourse(courseId: string) {
    this.isEditMode = true;

    this.http.get(`${this.apiURL}/getCourse/?courseId=${courseId}`).subscribe((data: any) => {
      this.course = { ...data }; // populate modal form
      // Disable Course ID while editing
      const courseIdInput = document.getElementById("courseId") as HTMLInputElement;
      if (courseIdInput) courseIdInput.disabled = true;
    });

    this.modal.present();
  }

  deleteCourse(courseId: string) {
    this.http.delete(`${this.apiURL}/deleteCourse/?courseId=${courseId}`).subscribe(() => {
      this.showCourses();
    });
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.isEditMode = false;
    const courseIdInput = document.getElementById("courseId") as HTMLInputElement;
    if (courseIdInput) courseIdInput.disabled = false;

    this.course = {}; // reset form
    if (event.detail.role === 'confirm') {
      this.showCourses();
    }
  }

}
