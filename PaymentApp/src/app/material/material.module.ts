import { NgModule } from '@angular/core';
//Material Angular Addition
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MaterialModule { }