import { Component, inject, Signal, signal } from '@angular/core';
import { DbService } from '../../services/db-service';
import { ImplementationsService } from '../../services/implementations-service';
import { NumMethodService } from '../../services/num-method-service';
import { NumMethodModel } from '../../models/num-method-model';
import { Implementation } from '../../models/implementation';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  dbService = inject(DbService);
  methodsService = inject(NumMethodService);
  implementationsService = inject(ImplementationsService);

  searchBar = '';
  showImplementations = true;
  showMethods = true;
  
  currentShowMode = 'All';

  fetchedMethods = this.methodsService.numMethods;
  fetchedImplementations = this.implementationsService.implementations 

  search() {
    console.log(this.fetchedMethods().length);
    console.log(this.searchBar);
    this.fetchedMethods = signal<NumMethodModel[]>([]);
  }

  // very lazy...
  toggleListing() {
    if (this.currentShowMode == 'All') {
      this.currentShowMode = 'Implementations'
      this.showMethods = false;
      this.showImplementations = true;
    }

    else if (this.currentShowMode == 'Implementations') {
      this.currentShowMode = 'Methods'
      this.showMethods = true;
      this.showImplementations = false;
    }

    else if (this.currentShowMode == 'Methods') {
      this.currentShowMode = 'All'
      this.showMethods = true;
      this.showImplementations = true;
    }
  }
}
