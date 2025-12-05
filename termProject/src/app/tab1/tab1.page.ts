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
  courses: any;
  apiURL = "http://localhost:3000";

  selectedCourse: any = null;
  isEditMode = false;

  displayedColumns: string[] = ['Course ID', 'Name', 'Instructor', 'Credits'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.showCourses();
  }

  showCourses() {
    this.http.get(this.apiURL + "/showCourses").subscribe(data => {
      this.courses = data;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const fields = ["courseId", "name", "description", "instructor", "credits"];
    const formdata = new FormData();

    fields.forEach(id => {
      const value = (document.getElementById(id) as HTMLInputElement)?.value ?? "";
      formdata.append(id, value);
    });

    if (this.isEditMode) {
      this.http.put(this.apiURL + "/updateCourse", formdata).subscribe(data => {
        alert('Course updated successfully!');
      });
    } else {
      this.http.post(this.apiURL + "/addCourse", formdata).subscribe(data => {
        alert('Course added successfully!');
      });
    }

    this.modal.dismiss(null, "confirm");
  }

  fetchCourse(courseId: any) {
    this.isEditMode = true;

    this.http.get(this.apiURL + "/getCourse/?courseId=" + courseId).subscribe((data: any) => {
      this.selectedCourse = data;

      (<HTMLInputElement>document.getElementById("courseId")).value = this.selectedCourse.courseId;
      (<HTMLInputElement>document.getElementById("name")).value = this.selectedCourse.name;
      (<HTMLInputElement>document.getElementById("description")).value = this.selectedCourse.description;
      (<HTMLInputElement>document.getElementById("instructor")).value = this.selectedCourse.instructor;
      (<HTMLInputElement>document.getElementById("credits")).value = this.selectedCourse.credits;

      // Disable Course ID while editing
      (<HTMLInputElement>document.getElementById("courseId")).disabled = true;
    });

    this.modal.present();
  }

  deleteCourse(courseId: any) {
    this.http.delete(this.apiURL + "/deleteCourse/?courseId=" + courseId).subscribe(() => {
      this.showCourses();
    });
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.isEditMode = false;
    (<HTMLInputElement>document.getElementById("courseId")).disabled = false;
    this.selectedCourse = null;

    if (event.detail.role === 'confirm') {
      this.showCourses();
    }
  }

}

