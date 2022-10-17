import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { DBOperation } from './_helpers/db_operation';
import { User } from './_helpers/user.interface';
import { UserService } from './_helpers/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //  registrationForm: FormGroup = new FormGroup({});
  registrationForm: FormGroup;
  users: User[] = [];
  submitted: boolean = false;
  buttonText: string = "submit";
  dbops: DBOperation;

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.setFormState();
    this.getAllUsers();

  }

  setFormState() {
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.registrationForm = this._fb.group({
      id: [0],
      title: [' ', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: ['', Validators.compose([Validators.required, Validators.pattern("\d{1,2}/\d{1,2}/\d{4}")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      confirmPassword: ['', Validators.required],
      acceptTerms: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;

    // console.log(this.registrationForm.value);

    if (this.registrationForm.valid) {
      return;
    }
    switch (this.dbops) {
      case DBOperation.create:
        this._userService.addUser(this.registrationForm.value).subscribe(res => {
          this._toastr.success("User Added ||", "User Registration");
          this.getAllUsers();
          this.onCancel();
        });
        break;
      case DBOperation.update:
        this._userService.updateUser(this.registrationForm.value).subscribe(res => {
          this._toastr.success("User Updated ||", "User Registration");
          this.getAllUsers();
          this.onCancel();
        });
        break;
    }
  }

  onCancel() {
    this.registrationForm.reset();
    this.buttonText = "Submit"
    this.dbops = DBOperation.create;
    this.submitted = false;
  }

  getAllUsers() {
    this._userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  Edit(userId: number) {
    this.buttonText = "Update"
    this.dbops = DBOperation.update;
    let user = this.users.find((u: User) => u.id === userId);
    this.registrationForm.patchValue(user);


  }

  Delete(userId: number) {
    // this._userService.deleteUser(userId).subscribe(res => {
    //   this.getAllUsers();
    //   this._toastr.success("Deleted successfully...", "User Registration")
    // });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(userId).subscribe(res => {
          this.getAllUsers();
          this._toastr.success("Deleted successfully...", "User Registration")
        });
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }


}
