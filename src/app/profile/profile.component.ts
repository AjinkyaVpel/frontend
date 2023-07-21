import { Component } from '@angular/core';
import { UpdateProfileService } from '../apiService/update-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  //display key group for roles management
  // supportDisplayKey:boolean=true;
  // vendorDisplayKey:boolean=true;
  // hostDisplayKey:boolean=true;
  // adminDisplayKey:boolean=true;
  // superAdminDisplayKey:boolean=true;
  //display key group ends
  profileForm!: FormGroup;

  hostId:any;
  editMode = false;
  hostFirstName = '';
hostLastName = '';
hostEmail = '';
hostContactNo = '';
  updatedLastName!: string;
  updatedFirstName!: string;
  updatedEmail!: string;
  updatedPhone!: string;
  updatedPassword!: string;
  // passwordVisible: boolean = false;
  profileImageSrc!: string;
  hostImage: File | undefined;
  
 constructor(private updateProfile:UpdateProfileService, private formBuilder: FormBuilder) {}

 ngOnInit() {
  this.profileForm = this.formBuilder.group({
    hostFirstName: ['', Validators.required],
    hostLastName: ['', Validators.required],
    hostEmail: ['', [Validators.required, Validators.email]],
    hostContactNo: ['', Validators.required],
    // password: ['Virtuoso@123', Validators.required],
  });
  this.updateProfile. getHostDetailsByHostId().subscribe((data: any) => {
    this.hostFirstName = data.hostFirstName;
    this.hostLastName = data.hostLastName;
    this.hostEmail = data.hostEmail;
    this.hostContactNo = data.hostContactNo;
    this.profileImageSrc = data.hostImage || this.profileImageSrc; 
    // Set the initial form values
    this.profileForm.patchValue({
      hostFirstName: this.hostFirstName,
          hostLastName: this.hostLastName,
          hostEmail: this.hostEmail,
          hostContactNo: this.hostContactNo,
    });
  });
  this.profileForm.get('hostImage')?.valueChanges.subscribe((value) => {
    this.hostImage = value; // Update the hostImage variable whenever the image changes
  });
}

// togglePasswordVisibility() {
//   this.passwordVisible = !this.passwordVisible;
// }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    // Implement the logic to save the updated profile information
    // You can send an HTTP request to update the data on the server
    const updatedProfileData = {
      ...this.profileForm.value,
      hostImage: this.hostImage,
    };
    // Update the profile data with the edited values
    if (this.profileForm.valid) {
      this.hostFirstName = this.profileForm.value.hostFirstName;
      this.hostLastName = this.profileForm.value.hostLastName;
      this.hostEmail = this.profileForm.value.hostEmail;
      this.hostContactNo = this.profileForm.value.hostContactNo;
      // this.password = this.profileForm.value.password;
      this.toggleEditMode();

    }
  }
  
  deleteAccount() {
    // Implement the logic to delete the user account
    // You can send an HTTP request to delete the account from the server
    // For now, we'll just log a message
    console.log('Deleting account...');
  }
  submitForm(){
    // this.updateProfile.updateProfileByHostId(this.hostId)
    if (this.profileForm.valid) {
      // Handle the form submission logic here
      // You can access the form data using this.profileForm.value
      this.updateProfile.updateProfileByHostId(this.profileForm.value).subscribe(()=>{
        this.toggleEditMode();
        
      })

    }

  }
  handleProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageSrc = e.target.result;
        this.profileForm.patchValue({ hostImage: this.profileImageSrc }); // Update the form control with the new image URL
      };
      reader.readAsDataURL(file);
    }
    event.target.value = ''; // Reset the input value to allow selecting the same file again
  }
}
