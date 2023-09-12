import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  carForm!: FormGroup;
  brands: any[] = [];
  securityFeatures: any[] = [];
  comfortFeatures: any[] = [];
  securityFeatureControls: FormControl[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getBrands().subscribe((brands: any[]) => {
      this.brands = brands;
    });

    this.dataService.getSecurityFeatures().subscribe((securityFeatures: any[]) => {
      this.securityFeatures = securityFeatures;
      this.securityFeatureControls = securityFeatures.map(() => new FormControl());
    });

    this.dataService.getComfortFeatures().subscribe((comfortFeatures: any[]) => {
      this.comfortFeatures = comfortFeatures;
    });

    this.carForm = this.fb.group({
      model: [''],
      description: [''],
      brandId: [''],
      securityFeatures: this.fb.array([]),
      comfortFeatures: this.fb.group({}),
    });
  }

  get f() {
    return this.carForm.controls;
  }

  addSecurityFeature() {
    this.securityFeatureControls.push(new FormControl());
    // Push the new FormControl to the form array
    (this.carForm.get('securityFeatures') as FormArray).push(new FormControl());
  }

  removeSecurityFeature(index: number) {
    this.securityFeatureControls.splice(index, 1);
    // Remove the FormControl from the form array
    (this.carForm.get('securityFeatures') as FormArray).removeAt(index);
  }

  get securityFeaturesFormArray() {
    return this.carForm.get('securityFeatures') as FormArray;
  }

  onSubmit() {
    if (this.carForm.valid) {
      const formData = this.carForm.value;

      this.dataService.submitFormData(formData).subscribe(
        (response) => {
          console.log('Form data sent successfully:', response);
          this.carForm.reset();
        },
        (error) => {
          console.error('Error sending form data:', error);
        }
      );
    } else {
    }
  }
}
