import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { ConfigService } from 'src/app/services/config.service';

import { MessageService } from 'primeng/api';

import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  @Input() displayLogin;

  @Output() closeLoginClicked = new EventEmitter<boolean>();

  loginConfig;

  isLoading = false;

  private authSub: Subscription;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginConfig = this.configService.getConfig('login');
  }

  onCloseLoginClick() {
    this.closeLoginClicked.emit(false);
  }

  onLoginClicked(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    this.authSub = this.authService.login(form.value)
      .subscribe(response => {
      const error = response['error'];
      const message = response['message'];
      const user = response['user'];

      if (error) {
        this.messageService.add({severity: 'error', summary: 'Login', detail: message});
        this.isLoading = false;
        return false;
      }
      if (user) {
        this.authService.user.next(user);
        this.messageService.add({severity: 'success', summary: 'Login', detail: message});
        this.closeLoginClicked.emit(false);
      }
      this.isLoading = false;
    },
    errorMessage => {
      this.messageService.add({severity: 'error', summary: 'Login falhou', detail: errorMessage});
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
