import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../../services/user-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public users:any=[];
  public role!:string;
  public fullName:string="";
  constructor(private api:ApiService,private auth:AuthService,private userData:UserDataService){}

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
      this.users=res;
    });

    this.userData.getFullNameFromStore()
    .subscribe(val=>{
     const fullNameFromToken=this.auth.getfullNameFromToken();
     this.fullName = val  || fullNameFromToken
    });

    this.userData.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  logOut(){
    this.auth.signOut();
  }
  
  trackById(index: number, item: any): number {
    return item.id;  
  }
}
