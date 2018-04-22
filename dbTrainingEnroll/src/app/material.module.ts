import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatSelectModule } from '@angular/material';
import { MatCardModule, MatGridListModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';
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
        MatSlideToggleModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatRippleModule,
        MatToolbarModule,
        MatSelectModule,
        MatTabsModule,
        FormsModule,
        MatSlideToggleModule,
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
        MatSelectModule,
        MatRippleModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        InfiniteScrollModule
    ]
})

export class MaterialModule { }
