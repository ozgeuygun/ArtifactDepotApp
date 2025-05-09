import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formBuilder=inject(FormBuilder);
  aRouter=inject(ActivatedRoute);
  loginForm!:FormGroup;
 
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private userData:UserDataService){}

  ngOnInit():void{
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
    
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)

      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res.message);
        //  alert(res.message);
          this.loginForm.reset();
       //   this.auth.storeToken(res.token);
       this.auth.storeToken(res.accessToken);
       this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload=this.auth.decodedToken();
          this.userData.setFullNameForStore(tokenPayload.name);
          this.userData.setRoleForStore(tokenPayload.role);
          this.router.navigate(['artifact-list']);
        },
        error:(err)=>{
          console.log(err);
        //  alert(err?.error.message)
        }
      })
    }else
    {
//console.log("form is not valid");
this.validateAllFormFields(this.loginForm);
alert("your form is invalid")
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
