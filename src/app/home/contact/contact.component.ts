import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { animations } from '../../animations';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: animations
})
export class ContactComponent implements OnInit {
  lat = 33.927251;
  lng = -6.887098;
  zoom = 15;
  o = new User();
  myForm: FormGroup;
  state = 'hide';
  constructor(private fb: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      // user add
      name: this.o.name,
      subject: [this.o.subject],
      email: [this.o.email, [Validators.required]],
      message: this.o.message
    });
  }

  onSectionChange(pos) {
    if (pos === 5) {
      this.state = 'show';
    }
  }

  openSnackBar(myForm: FormGroup) {
    const message = 'your message will be sended';
    const action = 'Undo';
    let doSubmit = true;

    const snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if (doSubmit) {
        this.submit(myForm);
      }
    });

    snackBarRef.onAction().subscribe(() => {
      doSubmit = false;
    });
  }

  submit(myForm: FormGroup) {
    const obj: User = myForm.value;
    console.log('message send it : ', obj.message);
  }



  get email() { return this.myForm.get('email') as FormControl; }


  getErrorMessage() {
    const email = this.myForm.get('email') as FormControl;
    return email.hasError('required') ? 'You must enter a value' :
      email.hasError('email') ? 'Not a valid email' : '';
  }

}

class User {
  name = '';
  subject = '';
  email = '';
  message = '';
  date = new Date();
}
