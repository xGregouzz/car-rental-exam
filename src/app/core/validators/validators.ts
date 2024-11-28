import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validFullname(): ValidatorFn {
  const namePattern = /^[a-zA-Z\- ]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const fullName = control.value;
    if (!fullName || fullName.trim().split(/\s+/).length < 2 || !namePattern.test(fullName)) {
      return { 'invalidFullName': true };
    }
    return null;
  };
}

export function validEmail(): ValidatorFn {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (email && !emailPattern.test(email)) {
      return { 'invalidEmail': true };
    }
    return null;
  };
}

export function validPhonenumber(): ValidatorFn {
  const phonePattern = /^[0-9]{10,15}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value;
    if (phoneNumber && !phonePattern.test(phoneNumber)) {
      return { 'invalidPhoneNumber': true };
    }
    return null;
  };
}

export function validPassword(): ValidatorFn {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])/;
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password || password.length < 8 || !passwordPattern.test(password)) {
      return { 'invalidPassword': true };
    }
    return null;
  };
}

export function validConfirmPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { 'invalidConfirmPassword': true };
    }
    return null;
  };
}

export function validLicensePlate(): ValidatorFn {
  const licensePlatePattern = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const licensePlateNumber = control.value;

    if (licensePlateNumber) {
      if (!licensePlatePattern.test(licensePlateNumber)) {
        return { invalidLicensePlate: true };
      }
    }

    return null;
  };
}

