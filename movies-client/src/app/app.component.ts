import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, ToastComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  authService = inject(AuthService);

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    this.authService.setSecret(token);
  }

  isConnected() {
    if (!this.authService.decodedToken) {
      return false;
    }
    if (this.authService.decodedToken.exp > new Date().getTime()) {
      this.authService.disconnect();
      return false;
    }
    return true;
  }
}
