import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {

  currentUser: User = new User();



  constructor(private authService: AuthService, public menuService: MenuService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      (response) => {
        this.currentUser = response;
      }
    )
  }

  onSubmit() {
    this.authService.editCurrentUser(this.currentUser).subscribe(response => {
      console.log(response);
      this.authService.currentUser$.next(response);
      //add current user to menu template.
      this.menuService.currentUser = response.username;
      window.alert("Edited User Successfully");
      this.router.navigateByUrl('/my-account');
    }, error => {
      console.log('Error: ', error)
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('/sign-in');
      }
    });
  }
}
