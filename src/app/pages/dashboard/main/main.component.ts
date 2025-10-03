import { Component } from '@angular/core';
import { StatsResponse } from '../../../core/interfaces/IStats';
import { StatsService } from '../../../core/services/stats/stats.service';
import { NumberformatPipe } from "../../../core/pipes/numberformat/numberformat.pipe";
import { TranslateModule } from '@ngx-translate/core';
import { OverviewCardSkeletonComponent } from "../../../ui/overview-card-skeleton/overview-card-skeleton.component";
import { ErrorPlaceholderComponent } from "../../../ui/error-placeholder/error-placeholder.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NumberformatPipe, TranslateModule, OverviewCardSkeletonComponent, ErrorPlaceholderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {


  statsOverview!: StatsResponse['data'];
  loading = true;

  constructor(
    private statsService: StatsService
  ) { }

  ngOnInit(): void {

    this.statsService.getStatsSummery<{ data: StatsResponse['data'] }>()
      .subscribe((res) => {
        this.statsOverview = res.body?.data as StatsResponse['data'];
        this.loading = false;
      }, (err) => {
        console.error('Failed to fetch stats:', err);
        this.loading = false;
      })
  }
}
