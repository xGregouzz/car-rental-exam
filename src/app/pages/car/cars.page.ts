import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';
import { CarService } from '../../services/car/car.service';
import { ICar } from '../../models/car.interface';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { ToastController } from '@ionic/angular/standalone';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
	selector: 'app-car',
	templateUrl: './cars.page.html',
	styleUrls: ['./cars.page.scss'],
	standalone: true,
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class CarsPage implements OnInit {

	public cars: ICar[] = [];

	constructor(private router: Router,
		private carService: CarService,
		private toastController: ToastController,
		private authenticationService: AuthenticationService) {
		addIcons({ logOutOutline });
	}

	ngOnInit() {
		this.carService.getAllCars().then((cars: ICar[]) => {
			this.cars = cars;
		}).catch(() => {
			this.errorToast("Server error. Please try again later.");
		});
	}

	public onCreateCar(): void {
		this.router.navigate(['/car/create']);
	}

	public onCarDetails(car: ICar): void {
		this.router.navigate([`/car/detail/${car.licensePlate}`]);
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
