import { inject, Injectable, signal } from '@angular/core';
import { NumMethodModel } from '../models/num-method-model';
import { ImplementationsService } from './implementations-service';
import { DbService } from './db-service';

@Injectable({
  providedIn: 'root',
})

export class NumMethodService {
  private numMethodsSignal = signal<NumMethodModel[]>([]);
  implementationsService = inject(ImplementationsService);
  private dbService = inject(DbService);

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

  // updateNumMethod(id: number, title: string, desc: string, foundingYear: number, rating?: number) {
  //   return this.dbService.developers
  //   .update(id, {name:name, countryOrigin:countryOrigin, foundingYear:foundingYear, rating:rating})
  //   .then(() => this.dbService.developers.toArray())
  //   .then((developers: Developer[]) => this.developersSignal.set(developers));
  // }

  removeNumMethod(id: number) {
    // if (this.gamesService.games().filter(game => game.developerId === id).length != 0) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...", 
    //     text: "Desenvolvedora possui jogos cadastrados. Não é possível excluir.",
    //   });
    //   return null

    // } else {
    //     return this.dbService.developers.delete(id).then(() => {
    //       this.developersSignal.update((devs: Developer[]) =>
    //         devs.filter((d: Developer) => d.id != id)
    //       );
    //     });
    // }

    return this.dbService.numMethods.delete(id).then(() => {
          this.numMethodsSignal.update((methods: NumMethodModel[]) =>
            methods.filter((m: NumMethodModel) => m.id != id)
      );
    });
  }
}
