import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() type = "text"
  @Input() name = "generic"

  @Input() label = "label"

  @Input() fc!:FormControl;

  @Input() required = false
  
}
