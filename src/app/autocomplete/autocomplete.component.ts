import { Component, EventEmitter, Output } from '@angular/core';
import { AutoCompleteService } from './autocomplete.service';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  @Output() public onSelect = new EventEmitter();

  constructor(private service: AutoCompleteService) {}

  options = [];
  loadStatus = false;

  ngOnInit() {
    this.getData('');
  }

  getData(searchText: any) {
    this.loadStatus = false;
    this.service.getData(searchText).subscribe(
      (response) => {
        this.options = response;
        this.loadStatus = true;
        console.log('response..', response);
      },
      (err) => {
        this.loadStatus = false;
        console.log('error', err);
      }
    );
  }

  onChangeHandler(e: any) {
    const searchText = e.target.value;
    this.getData(searchText);
  }

  onSelectHandler(event: any) {
    console.log(event.target.value);
  }
}
