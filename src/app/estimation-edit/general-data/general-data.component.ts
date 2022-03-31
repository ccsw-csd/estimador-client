import { Component, Input, OnInit } from '@angular/core';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Customer } from 'src/app/core/model/Customer';
import { Estimation } from 'src/app/core/model/Estimation';
import { User } from 'src/app/core/model/User';
import { EstimationEditService } from '../services/estimation-edit.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  @Input() estimation: Estimation;
  @Input() collaborators: Collaborator[];
  customers: Customer[] = [];
  users: User[] = [];
  nueva: boolean = false;
  customer: any;

  constructor(private estimationEditService: EstimationEditService,
    private userService: UserService) { }

  ngOnInit(): void {

    if(this.estimation.id == undefined) {
      this.nueva = true;
      this.estimation.created = new Date();
    }
    else {
      var date = new Date(this.estimation.created);
      this.estimation.created = date;
    }
    this.estimation.lastUpdate = new Date();
  }

  searchCustomers(event) {
    this.estimationEditService.findCustomersByFilter(event.query).subscribe((data) => {
      this.customers = data;
    })
  }

  updateCustomer() {
    if(typeof(this.customer) === "string")
      this.estimation.project.customer = {id: null, name: this.customer};
    else 
      this.estimation.project.customer = this.customer;
  }

  searchCollaborator(event) {
    this.userService.findUsersByFilter(event.query).subscribe((data) => {
      this.users = data;
    })
  }

  addCollaborator(event) {
    if(!this.collaborators.find(c => c.collaborator.username === event.username)) {
      var newCollaborator = new Collaborator();
      newCollaborator.collaborator = event;
      newCollaborator.estimation = this.estimation;
      this.collaborators.push(newCollaborator);
    }
  }

  deleteCollaborator(collaborator) {
    const index = this.collaborators.indexOf(collaborator, 0);
    this.collaborators.splice(index, 1);
  }
}
