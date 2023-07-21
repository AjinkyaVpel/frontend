import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddUserComponent>, private formBuilder: FormBuilder) { }
  ngOnInit() {
this.buildForm();
  }
  buildForm() { }
      


  onFormSubmit() { }

}
