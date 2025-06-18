import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AdminService } from '../../../services/admin.service';
import { DistribuicaoDashboard } from '../../../models/distribuicao-dashboard';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [ChartModule],
})
export class AdminDashboardComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() atualizar: any;

  barData: any = { labels: [], datasets: [] };
  pieData: any = { labels: [], datasets: [] };
  pieOptions = { plugins: { legend: { labels: { color: '#e5e7eb' } } } };
  barOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#e5e7eb' } },
    },
    scales: {
      x: {
        ticks: {
          color: '#e5e7eb',
          font: { size: 8.5 },
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        ticks: { color: '#e5e7eb' },
      },
    },
  };

  constructor(private adminService: AdminService) {}

  resizeListener: any;

  ngAfterViewInit() {
    this.resizeListener = () => {
      this.barData = { ...this.barData };
      this.pieData = { ...this.pieData };
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['atualizar'] && !changes['atualizar'].firstChange) {
      this.carregarGraficos();
    }
  }

  ngOnInit() {
    this.carregarGraficos();
  }

  carregarGraficos() {
    this.adminService
      .getDistribuicaoEscolaridade()
      .subscribe((data: DistribuicaoDashboard & { contagem?: any }) => {
        const contagem = (data as any).contagem ?? data;
        this.barData = {
          labels: Object.keys(contagem).map((label) => label.split(' ')),
          datasets: [
            {
              label: 'Candidatos',
              data: Object.values(contagem),
              backgroundColor: '#3b82f6',
            },
          ],
        };
      });

    this.adminService
      .getDistribuicaoStatus()
      .subscribe((data: DistribuicaoDashboard & { contagem?: any }) => {
        const contagem = (data as any).contagem ?? data;
        this.pieData = {
          labels: Object.keys(contagem),
          datasets: [
            {
              data: Object.values(contagem),
              backgroundColor: ['#fbbf24', '#22c55e', '#ef4444'],
            },
          ],
        };
      });
  }
}
