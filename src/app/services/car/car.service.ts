import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ICar } from 'src/app/models/car.interface';


@Injectable({
	providedIn: 'root'
})
export class CarService {

	constructor() { }

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
}