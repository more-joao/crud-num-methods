import { inject, Injectable, signal } from '@angular/core';
import { NumMethodModel } from '../models/num-method-model';
import { ImplementationsService } from './implementations-service';
import { DbService } from './db-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class NumMethodService {
  numMethodsSignal = signal<NumMethodModel[]>([]);
  implementationsService = inject(ImplementationsService);
  dbService = inject(DbService);

  constructor() {
    this.dbService.numMethods.toArray().then(numMethods => {
      this.numMethodsSignal.set(numMethods);
    })
  }

  numMethods = this.numMethodsSignal.asReadonly();
  
  getLastId(): number {
    return this.numMethodsSignal.length;
  }

  getNumMethod(id: number) {
    return this.dbService.numMethods.get(id);
  }

  addNumMethod(method: NumMethodModel) {
    return this.dbService.numMethods.add(method).then(newId => {
      method.id = newId;
      this.numMethodsSignal.update(methods => [...methods, method]);
    });
  }

  updateNumMethod(id: number, title: string, description: string, steps: string, convergCriteria: string) {
    return this.dbService.numMethods
    .update(id, {title:title, description:description, steps:steps, convergCriteria:convergCriteria})
    .then(() => this.dbService.numMethods.toArray())
    .then((methods: NumMethodModel[]) => this.numMethodsSignal.set(methods));
  }

  removeNumMethod(id: number) {
    if (this.implementationsService.implementations().filter(imp => imp.methodId === id).length != 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...", 
        text: "Method has existing implementations. Delete them before continuing.",
      });
      
      return null

    } else {
        return this.dbService.numMethods.delete(id).then(() => {
          this.numMethodsSignal.update((methods: NumMethodModel[]) =>
            methods.filter((m: NumMethodModel) => m.id != id)
          );
        });
    }
  }
}
