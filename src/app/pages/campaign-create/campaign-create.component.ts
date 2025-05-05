import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import axios from 'axios';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {User} from '../../models/campaign.interfaces';
import {CampaignService} from '../../services/campaign.service';
import {env} from '../../../environments/env';

@Component({
  selector: 'app-campaign-create-dialog',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CampaignCreateComponent implements OnInit {
  campaignForm: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private dialogRef: MatDialogRef<CampaignCreateComponent>
  ) {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      phone_list: this.fb.array([this.fb.control('', Validators.required)]),
      message_text: ['', Validators.required],
      process_date: ['', Validators.required],
      process_hour: ['', Validators.required],
      user_uuid: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    axios.get(`${env.apiUrl}/users`)
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Error al obtener campañas:', error);
      });
  }

  get phoneList(): FormArray {
    return this.campaignForm.get('phone_list') as FormArray;
  }

  addPhone() {
    this.phoneList.push(this.fb.control('', Validators.required));
  }

  removePhone(index: number) {
    this.phoneList.removeAt(index);
  }

  submit() {
    if (this.campaignForm.valid) {
      const formValue = this.campaignForm.value;

      const processDate = formValue.process_date instanceof Date
        ? formValue.process_date.toISOString().split('T')[0]
        : formValue.process_date;

      const payload = {
        ...formValue,
        process_date: processDate
      };

      this.campaignService.createCampaign(payload).then(response => {
        this.dialogRef.close(true);
      }).catch(error => {
        console.error('Error al enviar la campaña:', error);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
