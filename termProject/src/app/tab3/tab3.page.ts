import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  instructors: any;
  apiURL = 'http://localhost:3000';

  selectedInstructor: any = null;
  isEditMode = false;

  constructor(private http: HttpClient) {}

  displayedColumns: string[] = [
    'ID',
    'Name',
    'Department',
    'Email',
    'Phone',
    'Active',
  ];

  showInstructors() {
    this.http.get(this.apiURL + '/showInstructors').subscribe((data) => {
      this.instructors = data;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const fields = ['instructorId', 'name', 'department', 'email', 'phone'];

    const formdata = new FormData();

    fields.forEach((id) => {
      const value =
        (document.getElementById(id) as HTMLInputElement)?.value ?? '';
      formdata.append(id, value);
    });

    const active = (document.getElementById('active') as HTMLInputElement)
      .checked;
    formdata.append('active', active.toString());

    if (this.isEditMode) {
      this.http
        .put(this.apiURL + '/updateInstructor', formdata)
        .subscribe((data) => {
          alert(data);
        });
    } else {
      this.http
        .post(this.apiURL + '/addInstructor', formdata)
        .subscribe((data) => {
          alert(data);
        });
    }

    this.modal.dismiss(null, 'confirm');
  }

  fetchInstructor(instructorId: any) {
    this.isEditMode = true;

    this.http
      .get(this.apiURL + '/getInstructor/?instructorId=' + instructorId)
      .subscribe((data: any) => {
        this.selectedInstructor = data;

        (<HTMLInputElement>document.getElementById('instructorId')).value =
          this.selectedInstructor.instructorId;
        (<HTMLInputElement>document.getElementById('name')).value =
          this.selectedInstructor.name;
        (<HTMLInputElement>document.getElementById('department')).value =
          this.selectedInstructor.department;
        (<HTMLInputElement>document.getElementById('email')).value =
          this.selectedInstructor.email;
        (<HTMLInputElement>document.getElementById('phone')).value =
          this.selectedInstructor.phone;
        (<HTMLInputElement>document.getElementById('active')).checked =
          this.selectedInstructor.active;

        // Key value should not change during edit
        (<HTMLInputElement>document.getElementById('instructorId')).disabled =
          true;
      });

    this.modal.present();
  }

  deleteInstructor(instructorId: any) {
    this.http
      .delete(
        this.apiURL + '/deleteInstructor/?instructorId=' + instructorId
      )
      .subscribe((data) => {
        this.showInstructors();
      });
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.isEditMode = false;
    (<HTMLInputElement>document.getElementById('instructorId')).disabled =
      false;
    this.selectedInstructor = null;
    this.showInstructors();
  }

  ngOnInit() {
    this.showInstructors();
  }
}