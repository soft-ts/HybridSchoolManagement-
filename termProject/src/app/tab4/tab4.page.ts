import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  classrooms: any;
  apiURL = "http://localhost:3000";

  selectedClassroom: any = null;
  isEditMode = false;



  constructor(private http: HttpClient) { }

  displayedColumns: string[] = ['ID', 'Name', 'Capacity', "Campus", "Building", "Floor", "Availability"];
  showClassrooms() {
    this.http.get(this.apiURL + "/showClassrooms").subscribe(data => {
      this.classrooms = data;
    })
  }



  cancel() {
    // Close modal on cansel button
    this.modal.dismiss(null, 'cancel');
  }


  confirm() {
    // Fields to retrieve data from 
    const fields = [
      "classroomId",
      "name",
      "capacity",
      "campus",
      "building",
      "floor",
    ];

    // Create object of data form
    const formdata = new FormData();

    // Iterate through each field and append it to form data, if field is empty pass empty value
    fields.forEach(id => {
      const value = (document.getElementById(id) as HTMLInputElement)?.value ?? "";
      formdata.append(id, value);
    });


    const availability = (document.getElementById("availability") as HTMLInputElement).checked;
    formdata.append("availability", availability.toString());

    if (this.isEditMode) {
      // Update the record
      this.http.put(this.apiURL + "/updateClassroom", formdata).subscribe(data => {
        alert(data);
      })

    } else {
      // Add record
      this.http.post(this.apiURL + "/addClassroom", formdata).subscribe(data => {
        alert(data);
      });
    }

    // Close Modal
    this.modal.dismiss(null, "confirm");
  }

  fetchClassroom(classroomId: any, campus: any) {

    // Set edito mode to true, so modal window will apply edit options.
    this.isEditMode = true;


    this.http.get(this.apiURL + "/getClassroom/?classroomId=" + classroomId + "&campus=" + campus).subscribe(data => {
      // Store data in global variable
      this.selectedClassroom = data;

      // Fill input fields with data
      (<HTMLInputElement>document.getElementById("classroomId")).value = this.selectedClassroom.classroomId;
      (<HTMLInputElement>document.getElementById("name")).value = this.selectedClassroom.name;
      (<HTMLInputElement>document.getElementById("capacity")).value = this.selectedClassroom.capacity;
      (<HTMLInputElement>document.getElementById("campus")).value = this.selectedClassroom.campus;
      (<HTMLInputElement>document.getElementById("building")).value = this.selectedClassroom.building;
      (<HTMLInputElement>document.getElementById("floor")).value = this.selectedClassroom.floor;
      (<HTMLInputElement>document.getElementById("availability")).checked = this.selectedClassroom.availability;

      // Disable Key Values
      (<HTMLInputElement>document.getElementById("classroomId")).disabled = true;
      (<HTMLInputElement>document.getElementById("campus")).disabled = true;
    });

    // Open Modal
    this.modal.present();

  }

  deleteClassroom(classroomId: any, campus: any) {
    this.http.delete(this.apiURL + "/deleteClassroom/?classroomId=" + classroomId + "&campus=" + campus).subscribe(data => {
      // update list
      this.showClassrooms();
    })

  }

  // On closing modal refresh list, and reset values
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.isEditMode = false;
    (<HTMLInputElement>document.getElementById("classroomId")).disabled = false;
    (<HTMLInputElement>document.getElementById("campus")).disabled = false;
    this.selectedClassroom = null;
    if (event.detail.role === 'confirm') {
      this.showClassrooms();
    }
  }
  ngOnInit() {
    this.showClassrooms();
  }

}
