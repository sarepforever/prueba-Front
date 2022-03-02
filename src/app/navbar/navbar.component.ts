import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/services/books.service';
import { LoginService } from 'src/services/login.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: ModalComponent;
  modalConfig = {
    modalTitle: 'Notificación',
    dismissButtonLabel: 'OK',
    closeButtonLabel: 'Cerrar',
  };
  loading: boolean = false;

  async openModal() {
    return await this.modalComponent.open();
  }

  constructor(
    public loginService: LoginService,
    public router: Router,
    private booksService: BooksService
  ) {}

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  syncBooks() {
    this.loading = true;

    this.booksService.syncAuthorsAndBooks().subscribe(
      (res) => {
        this.openModal();
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {}
}
