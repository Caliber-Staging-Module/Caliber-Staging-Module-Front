import { Associate } from './../../models/associate-model/associate.model';
import { SwotComponent } from './../swot/swot.component';
import { AssociateService } from '../../services/associate/associate.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-view-associate',
  templateUrl: './view-associate.component.html',
  styleUrls: ['./view-associate.component.css']
})
export class ViewAssociateComponent implements OnInit {

  associates: Associate[];
  newAssociates: Associate[];
  private associateSubject: BehaviorSubject<Associate>;
  public associate: Observable<Associate>;
  testAssociate = new Associate(1, 'SF-1234', 'testEmail@email.com', 'test', 'tester', 14, 379, 'Training');

  private toggle = true;

  constructor(private service: AssociateService, private modalService: NgbModal, private changeDetect: ChangeDetectorRef) {
    this.associateSubject = new BehaviorSubject<Associate>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.associate = this.associateSubject.asObservable();
  }

  ngOnInit(): void {
    console.log(this.associateValue.email);
    this.getAllAssociates(1);
  }

  public toggleAssociateView() {

    const button = document.getElementById('associate-btn');
    button.innerHTML = '';

    if (this.toggle) {
      this.toggle = false;
      button.innerHTML = 'View All';
      this.getAllNewAssociates(1);
    } else {
      this.toggle = true;
      button.innerHTML = 'View New';
      this.getAllAssociates(1);
    }
  }

  public trackItem(index: number, item: Associate ) {
    return `${item.id}-${index}`;
  }

  public get associateValue(): Associate {
    return this.associateSubject.value;
  }

  open() {
    const modalRef = this.modalService.open(SwotComponent);
    modalRef.componentInstance.name = 'CreateSwot';
  }

  public getAllAssociates(id: number): void {
    this.service.getAllAssociates(id)
    .subscribe(
      data => {
        console.log(data);
        this.associates = data;
        this.changeDetect.detectChanges();
        console.log(this.associates);
      }
      );
    this.associates = this.newAssociates;
      // change to appropriate title
    const title = document.getElementById('users-list');
    title.innerHTML = '';
    title.innerHTML = 'View All Associates';
    }

  public getAllNewAssociates(id: number): void {
    this.service.getAllNewAssociates(id)
    .subscribe(
      data => {
        this.associates = data;
        this.changeDetect.detectChanges();
      }
    );
     // change to appropriate title
    const title = document.getElementById('users-list');
    title.innerHTML = '';
    title.innerHTML = 'View New Associates';
  }

}
