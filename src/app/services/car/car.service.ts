import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { ICar } from 'src/app/models/car.interface';


@Injectable({
	providedIn: 'root'
})
export class CarService {

	constructor() {
	}

	public getAllCars(): Promise<ICar[]> {
		return new Promise((resolve, reject) => {
			const carsRef = ref(getDatabase(), 'cars/');
			onValue(carsRef, (dataSnapshot) => {
				const data = dataSnapshot.val();
				const cars: ICar[] = [];
				if (data) {
					Object.entries(data).forEach(([key, value]) => {
						cars.push(value as ICar);
					});
				}
				resolve(cars);
			}, (error) => {
				reject(error);
			});
		});
	}

	public async saveCar(car: ICar): Promise<void> {
		try {
			const carRef = ref(getDatabase(), `cars/${car.licensePlate}`);
			await set(carRef, {
				licensePlate: car.licensePlate,
				brand: car.brand,
				model: car.model,
				photo: car.photo,
			});

			console.log(`Car with license plate ${car.licensePlate} saved successfully!`);
		} catch (error) {
			console.error('Error saving car:', error);
			throw error;
		}
	}


	public getCarByLicensePlate(licensePlate: string): Promise<ICar | null> {
		return new Promise((resolve, reject) => {
			const carRef = ref(getDatabase(), 'cars/' + licensePlate);
			onValue(carRef, (dataSnapshot) => {
				const data = dataSnapshot.val();
				if (data) {
					resolve(data as ICar);
				} else {
					resolve(null);
				}
			}, (error) => {
				reject(error);
			});
		});
	}
}