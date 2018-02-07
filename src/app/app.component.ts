import { Component } from '@angular/core';
import { TesterService } from './tester/tester.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TesterService]
})
export class AppComponent {
  title = 'Loc QA Scheduler';
}
