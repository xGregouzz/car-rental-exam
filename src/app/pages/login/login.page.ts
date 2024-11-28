import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { AuthenticationService } from "../../core/authentication/authentication.service";
import { IUser } from "../../models/user.interface";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular/standalone';
import { validEmail, validPassword } from '../../core/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, validEmail]),
    password: new FormControl('', [Validators.required, validPassword]),
  });
  public passwordType = 'password';
  public passwordIcon = 'eye-outline';

  constructor(private authenticationService: AuthenticationService,
              private toastController: ToastController,
              private router: Router) {
    addIcons({eyeOutline, eyeOffOutline});
  }

  ngOnInit() {
  }

  public onToggleShowPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-outline';
    }
  }

  public onSignIn(): void {
    this.authenticationService.signInWithEmailAndPassword(this.loginForm.value as unknown as Partial<IUser>)
      .then(() => {
        this.router.navigate(['cars']);
    }).catch((error) => {
      const errorMessage = this.getErrorMessage(error.code);
      this.errorToast(errorMessage);
    });
  }

  private getErrorMessage(errorCode: string): string {
		switch (errorCode) {
			case 'auth/invalid-credential':
				return 'Invalid email or password';
			default:
				return 'Server error. Please try again later.';
		}
	}

	private async errorToast(errorMessage: string): Promise<void> {
		const toast = await this.toastController.create({
			message: errorMessage,
			duration: 2000,
			position: 'top',
			color: 'danger',
			buttons: [
				{
					text: 'Dismiss',
					role: 'cancel'
				}
			]
		});
		await toast.present();
	}

	public navigateToRegister(): void {
		this.router.navigate(['/register']);
	}
}
