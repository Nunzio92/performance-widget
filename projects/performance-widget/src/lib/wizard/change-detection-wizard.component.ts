import { Component, OnInit } from '@angular/core';
import { ChangeDetectionTrickService } from '../change-detection-trick.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-detection-wizard',
  templateUrl: './change-detection-wizard.component.html',
  styleUrls: ['./change-detection-wizard.component.scss']
})
export class ChangeDetectionWizardComponent implements OnInit {
  counters: Observable<{ totalCount: number; errorCount: number, jsHeap: string }> = this.cdt.getEventStream();

  constructor(private cdt: ChangeDetectionTrickService) { }

  ngOnInit(): void {
  }

}
