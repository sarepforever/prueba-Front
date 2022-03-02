import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: ModalComponent;
  email?: string;
  password?: string;

  modalConfig = {
    modalTitle: 'Error',
    dismissButtonLabel: 'OK',
    closeButtonLabel: 'Cerrar',
  };

  async openModal() {
    return await this.modalComponent.open();
  }

  constructor(private loginService: LoginService, public router: Router) {}

  login() {
    const user = { userName: this.email, password: this.password };
    this.loginService.login(user).subscribe(
      (data) => {
        if (data.token) {
          this.loginService.setToken(data.token);
          this.router.navigateByUrl('/home');
        } else {
          this.openModal();
        }
      },
      (error) => {
        this.openModal();
      }
    );
  }
  ngOnInit(): void {}
}
