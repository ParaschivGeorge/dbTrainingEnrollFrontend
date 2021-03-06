import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatSelectModule, MatSnackBarModule, MatRadioModule } from '@angular/material';
import { MatDatepickerModule, NativeDateModule, MatNativeDateModule, MatMenuModule } from '@angular/material';
import { MatCardModule, MatGridListModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';
import { MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatRippleModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from 'ng2-translate';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatRippleModule,
        MatToolbarModule,
        MatSelectModule,
        MatRadioModule,
        MatTabsModule,
        MatSnackBarModule,
        FormsModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatExpansionModule,
        MatDatepickerModule,
        NativeDateModule,
        MatNativeDateModule,
        TranslateModule
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatMenuModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatRadioModule,
        MatSelectModule,
        MatRippleModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TranslateModule
    ]
})

export class MaterialModule { }
