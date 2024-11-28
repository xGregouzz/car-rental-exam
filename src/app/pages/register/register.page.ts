import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { AuthenticationService, IUser } from "../../core/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular/standalone';
import { validFullname, validEmail, validPhonenumber, validPassword, validConfirmPassword } from '../../core/validators/validators';


@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
	standalone: true,
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class RegisterPage implements OnInit {
	public registerForm = new FormGroup({
		fullName: new FormControl('', [Validators.required, validFullname()]),
		email: new FormControl('', [Validators.required, validEmail()]),
		phoneNumber: new FormControl('', [Validators.required, validPhonenumber()]),
		password: new FormControl('', [Validators.required, validPassword()]),
		confirmPassword: new FormControl('', [Validators.required, validConfirmPassword()]),
	});

	public passwordType = 'password';
	public confirmPasswordType = 'password';
	public passwordIcon = 'eye-outline';
	public confirmPasswordIcon = 'eye-outline';

	constructor(private authenticationService: AuthenticationService,
		private router: Router,
		private toastController: ToastController) {
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

	public onToggleShowConfirmPassword(): void {
		if (this.confirmPasswordType === 'password') {
			this.confirmPasswordType = 'text';
			this.confirmPasswordIcon = 'eye-off-outline';
		} else {
			this.confirmPasswordType = 'password';
			this.confirmPasswordIcon = 'eye-outline';
		}
	}

	public onSignUp(): void {
		this.authenticationService.signUpWithEmailAndPassword(this.registerForm.value as unknown as IUser)
			.then((userCreated: boolean | unknown) => {
				console.log("Hello" + userCreated)
				if (userCreated) {
					console.log("Hello" + userCreated)
					this.router.navigate(['login']);
				}
			}).catch((error) => {
				const errorMessage = this.getErrorMessage(error.code);
				this.errorToast(errorMessage);
		})
	}

	public navigateToLogin(): void {
		this.router.navigate(['/login']);
	}

	private getErrorMessage(errorCode: string): string {
		switch (errorCode) {
			case 'auth/email-already-in-use':
				return 'An account with this email is already created.';
			default:
				return 'An error occurred. Please try again later.';
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
}
