import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormBuilder , Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Person } from '../services/models';
import { Router } from '@angular/router';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isJSDocNullableType } from 'typescript';
@Component({
  selector: 'app-firstform',
  templateUrl: './firstform.component.html',
  styleUrls: ['./firstform.component.css']
})
export class FirstformComponent implements OnInit {

  email: string = '';
  pass: string = '';

  responseData: string = '';

form: FormGroup = this.fBuilder.group({
  email: ['',Validators.required],
  pass: ['',Validators.required],

});

 person: Person = { name: '', username: '', id: 0 ,email: '',password:''};

  constructor(private fBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }


  login(): void {
    this.api.login(this.person).subscribe((auth) => {
      if(auth == null){
        this.responseData = 'Username or Password is wrong';
      }else{
      alert(auth.username + ' was successfully Found.');
      localStorage.setItem('username',auth.username);
      this.router.navigateByUrl('/Chat');
    }
      this.person = { name: '', username: '', id: 0,email:'',password:'' };
    });

  }

  signup() {
    this.api.newPerson(this.person).subscribe((newPerson) => {
      alert(newPerson.username + ' was successfully added.');
      localStorage.setItem('username',newPerson.username);
      this.person = { name: '', username: '', id: 0,email:'',password:'' };
    });

    this.router.navigateByUrl('/Chat');
  }

  // signup(): void {
  //   if(this.pass == ''){
  //     this.pass = "NullValue";
  //   }
  //   if(this.email == ''){
  //     this.email = "NullValue";
  //   }

  //  this.api.signup(this.email,this.pass).subscribe(data => {
  //     console.log(data);
  //     this.responseData = data;
  //   },error =>{
  //     console.log(error);
  //   });

  //   alert(this.email+" <Email> ");

  //   this.api.reqsendname(this.email).subscribe(data =>{
  //     alert("Recieved");
  //   }, error =>{
  //     alert("Error");
  //   });
  // }
}
