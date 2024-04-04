import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {

  @Output() close = new EventEmitter();

  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  service = inject(AuthService);
  

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[^\s]{8,}$/)]],
    password2: ['', [Validators.required]]
  }, { validators: [this.matchPasswordsValidator] } as AbstractControlOptions);


  private matchPasswordsValidator(control: FormControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;
  
    return password === password2 ? null : { passwordsNotMatch: true };
  };
  

  subscription() {
    if (!this.form.controls.email.value) return;
    if (!this.form.controls.password.value) return;
    if (!this.form.controls.name.value) return;
    this.service.subscribe(
      this.form.controls.email.value, 
      this.form.controls.name.value, 
      this.form.controls.password.value).subscribe(res => {
        if (res.data) {
          this.toastService.addToast({message: 'Inscris avec succès', summary: 'Succès', severity: 'success'});
          this.emitClose();
        }
        else {
          this.toastService.addToast({message: 'Inscription échouée', summary: 'Erreur', severity: 'error'});
        }
      });
  }

  emitClose() {
    this.close.emit();
  }
}
