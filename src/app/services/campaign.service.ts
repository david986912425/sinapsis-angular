import { Injectable } from '@angular/core';
import axios from 'axios';
import {env} from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {

  private apiUrl = `${env.apiUrl}/campaigns`;

  getCampaigns(params: any = {}) {
    return axios.get(this.apiUrl, { params });
  }

  getCampaignById(uuid: string) {
    return axios.get(`${this.apiUrl}/${uuid}`);
  }

  createCampaign(payload: any) {
    return axios.post(this.apiUrl, payload);
  }
}
