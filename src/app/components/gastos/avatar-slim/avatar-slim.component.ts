import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { Person, Usuario } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ToastrService } from 'src/app/services/toastr.service';


@Component({
  selector: 'app-avatar-slim',
  templateUrl: './avatar-slim.component.html',
  styleUrls: ['./avatar-slim.component.scss']
})
export class AvatarSlimComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadPercent: Observable<number>;
  @Input() user = null
  @Input() showUser :boolean = true;


  defaultUrlAvatar:string = './assets/avatars/av-1.png';

  constructor(
    private storage: AngularFireStorage,
    private personService : PersonService,
    private authService: AuthService,
    private toastr: ToastrService,
    private chgRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

  }



}

