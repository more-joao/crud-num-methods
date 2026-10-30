import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { NumMethodModel } from '../models/num-method-model';
import { Implementation } from '../models/implementation';


@Injectable({
  providedIn: 'root',
})

export class DbService extends Dexie {
  numMethods!: Table<NumMethodModel, number>;
  implementations!: Table<Implementation, number>;

  constructor() {
    super('NumericalMethodsDB')
    this.version(1).stores({
      numMethods: '++id, title, description, steps, convergCriteria',
      implementations: '++id, title, progLang, numLines, methodId'
    })
  }
}
