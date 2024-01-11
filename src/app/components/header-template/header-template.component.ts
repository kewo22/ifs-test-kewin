import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PageType } from '../../core/enums/page-type.enum';

@Component({
  selector: 'app-header-template',
  standalone: true,
  imports: [],
  templateUrl: './header-template.component.html',
  styleUrl: './header-template.component.scss',
})
export class HeaderTemplateComponent {
  @Input()
  pageType?: PageType;

  ngOnInit() {
    console.log(this.pageType)
  }
}
