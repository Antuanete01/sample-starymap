import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {BaseFormComponent} from '../../../shared/components/base-form.component';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Community} from '../../model/community.entity';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-community-create-and-edit',
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatFormField,
    MatButton,
    MatToolbar,
    MatIcon,
    NgIf,
    MatIconButton,
    MatLabel
  ],
  templateUrl: './community-create-and-edit.component.html',
  styleUrl: './community-create-and-edit.component.css'
})
export class CommunityCreateAndEditComponent extends BaseFormComponent{
  @Input() community!: Community;
  @Input() editMode: boolean = false;
  @Output() add = new EventEmitter<Community>();
  @Output() update = new EventEmitter<Community>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('communityForm', { static: false }) protected communityForm!: NgForm;

  constructor() {
    super();
    this.community = new Community({});
  }

  showForm = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  private resetEditState() {
    this.community = new Community({});
    this.editMode = false;
    this.communityForm.reset();
  }

  private isValid = () => this.communityForm.valid;

  protected isEditMode = () : boolean => this.editMode;

  /*protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }*/

  onSubmit() {
    if (!this.isValid()) return;
    if (this.editMode) {
      this.update.emit(this.community);
    } else {
      this.add.emit(this.community);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
