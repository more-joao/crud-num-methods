import { inject, Injectable, signal } from '@angular/core';
import { Implementation } from '../models/implementation';
import { DbService } from './db-service';

@Injectable({
  providedIn: 'root',
})

export class ImplementationsService {
  implementationsSignal = signal<Implementation[]>([]);
  dbService = inject(DbService);

  constructor() {
    this.dbService.implementations.toArray().then(implementations => {
      this.implementationsSignal.set(implementations);
    })
  }

  implementations = this.implementationsSignal.asReadonly();

  getLastId(): number {
    return this.implementationsSignal.length;
  }

  getImplementation(id: number) {
    return this.dbService.implementations.get(id);
  }

  addImplementation(implementation: Implementation) {
      return this.dbService.implementations.add(implementation).then(newId => {
        implementation.id = newId;
        this.implementationsSignal.update(implementations => [...implementations, implementation]);
      });
    }
  
  updateImplementation(id: number, title: string, progLang: string, code: string, numLines: number) {
    return this.dbService.implementations
    .update(id, {title:title, progLang:progLang, code:code, numLines:numLines})
    .then(() => this.dbService.implementations.toArray())
    .then((implementations: Implementation[]) => this.implementationsSignal.set(implementations));
  }

  removeImplementation(id: number) {
    return this.dbService.implementations.delete(id).then(() => {
      this.implementationsSignal.update((implementations: Implementation[]) =>
        implementations.filter((imp: Implementation) => imp.id != id)
      );
    });
  }
}
