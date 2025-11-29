import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page implements OnInit {

  classrooms:any;
  apiURL="http://localhost:3000";

  constructor(private http:HttpClient) { }

  displayedColumns: string[] = ['ID', 'Name', 'Capacity'];
  showClassrooms()
  {
    this.http.get(this.apiURL+"/showClassrooms").subscribe(data=>{
      this.classrooms = data;
    })
  }

  addClassroom()
  {
    
  }

  ngOnInit() {
    this.showClassrooms();
  }

}
