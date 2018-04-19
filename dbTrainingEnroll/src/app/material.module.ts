import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule, MatGridListModule } from '@angular/material';
import { MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatRippleModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatRippleModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        InfiniteScrollModule
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatRippleModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        InfiniteScrollModule
    ]
})

export class MaterialModule { }
