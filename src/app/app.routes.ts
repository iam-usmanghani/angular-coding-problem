import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./count-down-timer/count-down-timer.component').then(m => m.CountDownTimerComponent)
    }
];
