import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatGridListModule,
  MatTabsModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatGridListModule,
  MatTabsModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatProgressSpinnerModule
]

@NgModule({

  imports: [material],
  exports: [material]
})
export class MaterialModule { }
