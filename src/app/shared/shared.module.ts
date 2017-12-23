import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDialogModule,MatButtonModule, MatInputModule } from '@angular/material'

@NgModule({
  imports:  [ CommonModule, MatButtonModule, MatDialogModule, MatInputModule],
exports:  [ CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule   ]
})

export class SharedModule {}
