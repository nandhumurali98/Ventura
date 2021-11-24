import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../_services/profile.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Profile } from 'src/app/_models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentProfile :any;
  profile?:Profile[];
  currentUser: any;
  form: Profile = {
    name:"",
    address:"",
    mobile:0,
  };
  submitted = false;
  constructor(private token: TokenStorageService,
              private profileService: ProfileService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveProfile();
    this.currentUser = this.token.getUser();
    this.getProfile(this.profile);
  }
  retrieveProfile():void{
    this.profileService.getAll()
      .subscribe(
        data=>{
          this.profile = data;
          console.log(data);
        },
        error =>{
          console.log(error);
        });
  }
  getProfile(id:any){
    if(this.profile?.includes(this.currentUser)){
    this.profileService.get(id)
     .subscribe(data => {
       this.currentProfile = data;
        console.log(this.currentProfile);
     },
     error => {
       console.log(error);
     });

  }
}
  saveProfile():void{
    const data = {
      name:this.form.name,
      address:this.form.address,
      mobile:this.form.mobile
    };
    this.profileService.create(data)
      .subscribe(response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
