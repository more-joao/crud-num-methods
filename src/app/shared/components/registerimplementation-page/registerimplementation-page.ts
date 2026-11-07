import { Component, inject } from '@angular/core';
import { NumMethodService } from '../../services/num-method-service';
import { ImplementationsService } from '../../services/implementations-service';
import { DbService } from '../../services/db-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Implementation } from '../../models/implementation';

@Component({
  selector: 'app-registerimplementation-page',
  imports: [ReactiveFormsModule],
  templateUrl: './registerimplementation-page.html',
  styleUrl: './registerimplementation-page.css',
})

export class RegisterimplementationPage {
    numMethodsService = inject(NumMethodService);
    implementationsService = inject(ImplementationsService);
    dbService = inject(DbService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    beingEdited = this.route.snapshot.paramMap.has('id');
    editedId = Number(this.route.snapshot.paramMap.get('id'))

    readonly implementations = this.implementationsService.implementations();
    readonly methods = this.numMethodsService.numMethods();

    constructor() { 
      if (this.beingEdited) {
        this.implementationsService.getImplementation(this.editedId).then(imp => {
          if (imp) {
            this.formImplementation.patchValue(imp) 
          } else {
            this.router.navigate(['/'])
          }
        })
      }
    }

    formImplementation = new FormGroup(
        {
          title: new FormControl('', Validators.required),
          progLang: new FormControl('', Validators.required),
          code: new FormControl('', Validators.required),
          numLines: new FormControl(0, Validators.required),
          methodId: new FormControl(-1, Validators.required)
        }
      )
  
    addImplementation() {
      const newId = this.implementationsService.getLastId() + 1;
      const newImplementation: Implementation = {
            title: this.formImplementation.value.title!,
            progLang: this.formImplementation.value.progLang!,
            code: this.formImplementation.value.code!,
            numLines: this.formImplementation.value.numLines!,
            methodId: this.formImplementation.value.methodId!
      };

      if (this.beingEdited) {
          this.implementationsService.updateImplementation(
          this.editedId, 
          this.formImplementation.value.title!,
          this.formImplementation.value.progLang!,
          this.formImplementation.value.code!,
          this.formImplementation.value.numLines!
        ).then(() => {
          this.formImplementation.reset();
          this.router.navigate(['/'])
        })

      } else {
        if (newImplementation.methodId != -1) {
            this.implementationsService.addImplementation(newImplementation).then(() => {
            this.formImplementation.reset();
            this.router.navigate(['/'])
          });
        }
        
      }
    }
}
