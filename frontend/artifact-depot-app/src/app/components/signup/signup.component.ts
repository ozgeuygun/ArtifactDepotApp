import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!:FormGroup;
  constructor(private fb : FormBuilder,private router:Router,private auth: AuthService) { }
 
  ngOnInit():void{
  this.signUpForm=this.fb.group({
   FirstName:['',Validators.required],
   LastName:['',Validators.required],
   Username:['',Validators.required],
   Email:['',Validators.required],
   Password:['',Validators.required],
 })
  }
 onSignup(){
   if(this.signUpForm.valid){
     this.auth.signUp(this.signUpForm.value)
     .subscribe({
       next:(res=>{
         alert(res.message);
        this.signUpForm.reset();
        this.router.navigate(['login']);
       })
       ,error:(err=>{
         alert(err?.error.message)
       })
     })
    console.log(this.signUpForm.value)
      }else
      {
       this.validateAllFormFields(this.signUpForm);
      }
}
private validateAllFormFields(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach(field=>{
    const control=formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf:true});
    }else if(control instanceof FormGroup){
      this.validateAllFormFields(control)
    }
  })
} 

 trackById(index: number, item: any): number {
  return item.id;  
}

}
