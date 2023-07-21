import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  addVehicle: FormGroup;
  myControl = new FormControl('');

  brands: any[] = [
    {
      name: "Toyota",
      models: [
        {
          name: "Corolla",
          variants: [
            {
              name: "LE",
            },
            {
              name: "SE",
            },
            {
              name: "XSE",
            }
          ]
        },
        {
          name: "Camry",
          variants: [
            {
              name: "LE",
            },
            {
              name: "XLE",
            },
            {
              name: "SE",
            }
          ]
        }
      ]
    },
    {
      name: "Honda",
      models: [
        {
          name: "Civic",
          variants: [
            {
              name: "LX",
            },
            {
              name: "EX",
            },
            {
              name: "Touring",
            }
          ]
        },
        {
          name: "Accord",
          variants: [
            {
              name: "Sport",
            },
            {
              name: "EX-L",
            },
            {
              name: "Touring",
            }
          ]
        }
      ]
    }
  ];

  filteredBrands!: Observable<any[]>;
  filteredModels!: Observable<any[]>;
  filteredVariants!: Observable<any[]>;
  selectedModel: any;
  selectedBrand: any;

  constructor(private formBuilder: FormBuilder) {
    this.addVehicle = this.formBuilder.group({
      brand: '',
      model: '',
      variant: ''
    });
  }

  ngOnInit() {
    this.filteredBrands = this.addVehicle.get('brand')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.brands.map(brand => brand.name)))
    );

    this.filteredModels = this.addVehicle.get('model')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const selectedBrand = this.addVehicle.get('brand')!.value;
        const brand = this.brands.find(brand => brand.name === selectedBrand);
        return this._filter(value || '', brand ? brand.models.map((model: { name: any; }) => model.name) : []);
      })
    );

    this.filteredVariants = this.addVehicle.get('variant')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const selectedBrand = this.addVehicle.get('brand')!.value;
        const selectedModel = this.addVehicle.get('model')!.value;
        const brand = this.brands.find(brand => brand.name === selectedBrand);
        const model = brand ? brand.models.find((model: { name: any; }) => model.name === selectedModel) : null;
        return this._filter(value || '', model ? model.variants.map((variant: any) => variant.name) : []);
      })
    );
  }

  private _filter(value: string, array: string[]): string[] {
    const filterValue = value.toLowerCase();

    if (value && !array.includes(value)) {
      array.push(value);
      console.log(this.brands);
    }

    return array.filter(option => option.toLowerCase().includes(filterValue));
  }

  onBrandSelected(brand: any) {
    this.selectedBrand = brand;
    this.addVehicle.get('model')!.setValue('');
    this.addVehicle.get('variant')!.setValue('');
  }

  onModelSelected(model: any) {
    this.selectedModel = model;
    this.addVehicle.get('variant')!.setValue('');
  }

  onSubmit() {
    const brand = this.addVehicle.get('brand')!.value;
    const model = this.addVehicle.get('model')!.value;
    const variant = this.addVehicle.get('variant')!.value;

    const existingBrand = this.brands.find(b => b.name === brand);

    if (existingBrand) {
      const existingModel = existingBrand.models.find((m:any) => m.name === model);
      
      if (existingModel) {
        // Model already exists, add a new variant to the existing model
        existingModel.variants.push({ name: variant });
      } else {
        // Model doesn't exist, create a new model object with the submitted variant
        const newModel = {
          name: model,
          variants: [
            {
              name: variant
            }
          ]
        };
        
        existingBrand.models.push(newModel);
      }
    } else {
      // Brand doesn't exist, create a new brand object with the submitted values
      const newBrand = {
        name: brand,
        models: [
          {
            name: model,
            variants: [
              {
                name: variant
              }
            ]
          }
        ]
      };

      this.brands.push(newBrand);
    }

    this.addVehicle.reset();
    this.selectedBrand = null;
    this.selectedModel = null;
  }
}
