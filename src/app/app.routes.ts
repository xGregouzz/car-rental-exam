import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
		path: 'cars',
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/car/cars.page').then(m => m.CarsPage)
			},
      {
				path: 'create',
				loadComponent: () => import('./pages/car/car-create/car-create.page').then(m => m.CarCreatePage)
			},
      {
				path: 'detail/:licensePlate',
				loadComponent: () => import('./pages/car/car-detail/car-detail.page').then(m => m.CarDetailPage)
			}
		]
	},
];
