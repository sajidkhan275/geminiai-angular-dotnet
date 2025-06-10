import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class GeminiaiService {
  private apiKey = environment.geminiApiKey;
  private apiUrl = environment.geminiApiUrl;

  constructor(private http: HttpClient) { }

  getGeminiResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
    });
     const body = { prompt };
    // const body1 = {
    //   contensts: [{
    //     parts: [{ text: prompt }],
    //   }]
    // };
    //const url = `${this.proxyUrl+this.apiUrl}?key=${this.apiKey}`;
    const url = 'https://localhost:7134/api/Proxy/generate';  //calling .net api  direct api calling is not working, becasue of cors issue

    console.log('Request URL:', url);
    console.log('Request Body:', body);
    return this.http.post<any>(url, body, { headers });
  }
}
