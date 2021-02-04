import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {
  closeResult: string;
  revenueGroupForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
    ) {
      this.revenueGroupForm = this.fb.group({
        revenueGroupData: this.fb.array([])
      });
     }

  ngOnInit(): void {
    this.addRevenueField();
  }

  revenueGroupData(): FormArray {
    return this.revenueGroupForm.get('revenueGroupData') as FormArray;
  }

  newRevenueFormField(): FormGroup {
    return this.fb.group({
      parameter_1: '',
      parameter_2: '',
      insert_parameter: ''
    });
  }

  addRevenueField() {
    console.log('Adding a employee');
    this.revenueGroupData().push(this.newRevenueFormField());
  }

  removeRevenueField(empIndex: number) {
    this.revenueGroupData().removeAt(empIndex);
  }
  clearDefaultFields() {
    // this.revenueGroupForm.reset();
    this.revenueGroupData().reset();
  }

  getPhonesFormControls(): AbstractControl[] {
    return (this.revenueGroupForm.get('revenueGroupData') as FormArray).controls;
  }

  onSubmit(values: any) {
    console.log(values);
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

