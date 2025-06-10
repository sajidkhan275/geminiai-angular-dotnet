import { Component } from '@angular/core';
import { GeminiaiService } from '../../Services/geminiai.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-query',
  imports: [ CommonModule,FormsModule ],
  templateUrl: './ai-query.component.html',
  styleUrl: './ai-query.component.css'
})
export class AiQueryComponent {
  userQuery: string = '';
  aiResponse: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private geminiService: GeminiaiService) { }

  submitQuery() {
  
    if (!this.userQuery.trim()) {
      this.errorMessage = 'Please enter a query.';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';

    this.geminiService.getGeminiResponse(this.userQuery).subscribe({
      next:(res) => {
        try{
          // getting direct response from direct calling of gemini api
          //const candidates = response.candidates || [];
         // if (candidates.length > 0 && candidates[0].content?.parts?.length > 0) {
            //this.aiResponse = candidates[0].content.parts[0].text.trim();
          //} else {
          //  this.aiResponse = 'No meaningful response from AI.';
         // }
         this.aiResponse  = res.response;
        }
        catch (error) {
          this.aiResponse = 'Error parsing AI response.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to get AI response.';
        this.isLoading = false;
      }
    });
  }
}

