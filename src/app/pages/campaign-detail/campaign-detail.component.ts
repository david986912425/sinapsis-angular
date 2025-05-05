import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';
import {DatePipe, NgIf} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {Campaign} from '../../models/campaign.interfaces';
import {CampaignService} from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatProgressBar,
    MatTableModule,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  campaign: Campaign | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');

    if (uuid) {
      this.fetchCampaign(uuid);
    } else {
      this.error = 'No se proporcionó el UUID de la campaña.';
    }
  }

  fetchCampaign(uuid: string): void {
    this.loading = true;
    this.campaignService.getCampaignById(uuid)
      .then(response => {
        this.campaign = response.data;
      })
      .catch(error => {
        this.error = error.message || 'Error desconocido';
      })
      .finally(() => {
        this.loading = false;
      });
  }

  getProcessStatus(status: number): string {
    switch (status) {
      case 1: return 'Pendiente';
      case 2: return 'Enviado';
      case 3: return 'Error';
      default: return 'Desconocido';
    }
  }

  getProcessCampaignStatus(process_status: number):string {
    switch (process_status) {
      case 1: return 'Pendiente';
      case 2: return 'En proceso';
      case 3: return 'Finalizado';
      default: return 'Desconocido';
    }
  }
}
