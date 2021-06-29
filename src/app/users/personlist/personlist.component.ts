import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Person } from 'src/app/services/models';


@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrls: ['./personlist.component.css']
})
export class PersonlistComponent implements OnInit {

  people: Person[] = [];
  // people: Person[] = [
  //   { id: 1, name: 'ali', username: '110' },
  //   { id: 2, name: 'ali', username: '110' },
  //   { id: 3, name: 'ali', username: '110' },
  // ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.api.getPeople().subscribe(
      (people) => {
        this.people = people;
      },
      (errrrrrrr) => {}
    );
  }

}
