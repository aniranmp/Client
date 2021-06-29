import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Person } from 'src/app/services/models';

@Component({
  selector: 'app-personform',
  templateUrl: './personform.component.html',
  styleUrls: ['./personform.component.css']
})
export class PersonformComponent implements OnInit {

  constructor(private api:ApiService, private _formBuilder:FormBuilder,private router:Router) { }


  person: Person = { name: '', username: '', id: 0 ,email: '',password:'' };

  ngOnInit(): void {
  }

  form: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
  });


  submit() {
    this.api.newPerson(this.person).subscribe((newPerson) => {
      alert(newPerson.username + ' was successfully added.');
      this.person = { name: '', username: '', id: 0,email:'',password:'' };
    });
  }

  goTochatRoom() {
    this.router.navigateByUrl('/Chat');
  }

}
