import { Routes } from '@angular/router';
import { AiQueryComponent } from './Components/ai-query/ai-query.component';

export const routes: Routes = [
    { path: 'ai-query', component: AiQueryComponent, title: 'Gemini AI' },
    { path: "", redirectTo: "/ai-query", pathMatch: "full" },
];
