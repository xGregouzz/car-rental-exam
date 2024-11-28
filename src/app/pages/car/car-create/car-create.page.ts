import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car/car.service';
import { ICar } from 'src/app/models/car.interface';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, homeOutline } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { validLicensePlate } from 'src/app/core/validators/validators';

@Component({
	selector: 'app-car-create',
	templateUrl: './car-create.page.html',
	styleUrls: ['./car-create.page.scss'],
	standalone: true,
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class CarCreatePage implements OnInit {

	public carForm = new FormGroup({
		brand: new FormControl('', [Validators.required]),
		model: new FormControl('', [Validators.required]),
		licensePlate: new FormControl('', [Validators.required, validLicensePlate()]),
		frontPhoto: new FormControl<File | null>(null, [Validators.required]),
		backPhoto: new FormControl<File | null>(null, [Validators.required]),
	});

	constructor(private router: Router,
		private carService: CarService,
		private toastController: ToastController,
		private authenticationService: AuthenticationService) {
		addIcons({ logOutOutline, homeOutline });
	}

	ngOnInit() {
		
	}

	public onFileChange(event: any, field: string): void {
		const file = event.target.files[0];
		if (file) {
			this.carForm.patchValue({
				[field]: file,
			});
		}
	}

	public onSaveCar(): void {
		if (this.carForm.invalid) {
			return;
		}

		this.carService.getCarByLicensePlate(this.carForm.value.licensePlate ?? '').then((existedCar) => {
			if (existedCar) {
				this.errorToast("A car with the same license plate is already registered");
				return;
			}

			const formValues = this.carForm.value;
			const savedCar: ICar = {
				licensePlate: formValues.licensePlate ?? '',
				brand: formValues.brand ?? '',
				model: formValues.model ?? '',
				frontPhoto: '',
				backPhoto: '',
			};

			const { frontPhoto, backPhoto } = formValues;

			if (frontPhoto && backPhoto) {
				const frontReader = new FileReader();
				const backReader = new FileReader();

				frontReader.onloadend = () => {
					savedCar.frontPhoto = frontReader.result as string;

					backReader.onloadend = () => {
						savedCar.backPhoto = backReader.result as string;

						this.carService.saveCar(savedCar).then(() => {
							this.router.navigate(['/cars']);
						});
					};
					backReader.readAsDataURL(backPhoto);
				};
				frontReader.readAsDataURL(frontPhoto);
			} else {
				this.errorToast("Please upload photos.");
			}
		});
	}

	public onAllCars(): void {
		this.router.navigate([`/cars`]);
	}

	public onLogout(): void {
		this.authenticationService.logout()
			.then(() => {
				this.router.navigate(['/login']);
			})
			.catch(() => {
				this.errorToast("Server error. Please try again later.");
			});
	}

	private async errorToast(errorMessage: string): Promise<void> {
		const toast = await this.toastController.create({
			message: errorMessage,
			duration: 3000,
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

	public uploadPhoto(field: string): void {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';

		input.onchange = (event: any) => {
			const file = event.target.files[0];
			if (file) {
				this.carForm.patchValue({
					[field]: file,
				});
			}
		};

		input.click();
	}
}