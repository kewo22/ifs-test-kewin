import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { PageType } from '../../core/enums/page-type.enum';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-template',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-template.component.html',
  styleUrl: './header-template.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class HeaderTemplateComponent {
  @Input()
  pageType?: PageType;

  @HostBinding('class') classes = '';

  ngOnInit() {
    console.log(this.pageType)
    // this.classes = this.pageType === PageType.PLANT ? "plant" : "plants";
  }

  afterViewInit() {

  }
}
