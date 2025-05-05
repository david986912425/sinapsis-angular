import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import {CampaignCreateComponent} from '../campaign-create/campaign-create.component';
import {Campaign} from '../../models/campaign.interfaces';
import {CampaignService} from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class CampaignListComponent implements OnInit {
  filterForm: FormGroup;

  displayedColumns: string[] = ['name', 'status', 'created_at', 'process_date', 'process_hour', 'actions'];
  campaigns: Campaign[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private campaignService: CampaignService
  ) {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null],
    });
  }

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns(startDate?: string, endDate?: string) {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    this.campaignService.getCampaigns(params)
      .then(response => {
        this.campaigns = response.data;
      })
      .catch(error => {
        console.error('Error al obtener campañas:', error);
      });
  }

  filterCampaigns() {
    const { startDate, endDate } = this.filterForm.value;

    const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : undefined;
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : undefined;

    this.loadCampaigns(formattedStartDate, formattedEndDate);
  }

  getProcessStatus(status: number): string {
    switch (status) {
      case 1: return 'Pendiente';
      case 2: return 'En proceso';
      case 3: return 'Finalizado';
      default: return 'Desconocido';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'status-pending';
      case 2: return 'status-processing';
      case 3: return 'status-completed';
      default: return '';
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CampaignCreateComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCampaigns();
      }
    });
  }
}
