import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SubscriptionComponent } from '../subscription/subscription.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SubscriptionComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private fb = inject(FormBuilder);
  service = inject(AuthService);
  subIsOpen = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[^\s]{8,}$/)]]
  });

  connection() {
    if (!this.form.controls.email.value) return;
    if (!this.form.controls.password.value) return;
    this.service.login(this.form.controls.email.value, this.form.controls.password.value).subscribe(
      (response) => {
        if (response.data) {
          this.service.setSecret(response.data);
        } 
      }
    )
  }
}
