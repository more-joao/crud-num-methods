import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumMethodService } from '../../services/num-method-service';
import { ImplementationsService } from '../../services/implementations-service';
import { DbService } from '../../services/db-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NumMethodModel } from '../../models/num-method-model';

@Component({
  selector: 'app-registermethod-page',
  imports: [ReactiveFormsModule],
  templateUrl: './registermethod-page.html',
  styleUrl: './registermethod-page.css',
})

export class RegistermethodPage {
    numMethodsService = inject(NumMethodService);
    implementationsService = inject(ImplementationsService);
    dbService = inject(DbService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    beingEdited = this.route.snapshot.paramMap.has('id');
    editedId = Number(this.route.snapshot.paramMap.get('id'))

    readonly developers = this.numMethodsService.numMethods();

    constructor() { 
      if (this.beingEdited) {
        this.numMethodsService.getNumMethod(this.editedId).then(dev => {
          if (dev) {
            this.formNumMethod.patchValue(dev) 
          } else {
            this.router.navigate(['/'])
          }
        })
      }
    }

    formNumMethod = new FormGroup(
        {
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          steps: new FormControl('', Validators.required),
          convergCriteria: new FormControl('', Validators.required)
        }
      )
  
    addNumMethod() {
      const newId = this.numMethodsService.getLastId() + 1;
      const newMethod: NumMethodModel = {
            title: this.formNumMethod.value.title!,
            description: this.formNumMethod.value.description!,
            steps: this.formNumMethod.value.steps!,
            convergCriteria: this.formNumMethod.value.convergCriteria!,
      };

      this.numMethodsService.addNumMethod(newMethod).then(() => {
            this.formNumMethod.reset();
            this.router.navigate(['/'])
      }); 
    }
}
