import { Component, inject } from '@angular/core';
import { NumMethodService } from '../../services/num-method-service';
import { ImplementationsService } from '../../services/implementations-service';
import { DbService } from '../../services/db-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-implementation-page',
  imports: [],
  templateUrl: './implementation-page.html',
  styleUrl: './implementation-page.css',
})

export class ImplementationPage {}
