import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INavbarData } from './helper';

@Component({
  selector: 'app-sublevel-menu',
  template: `  <!-- inline html  code for sub-level menu list (account,security,payment,etc) -->
    <ul *ngIf="collapsed && data.items && data.items.length > 0" 
    
    [@submenu]="expanded 
    ? {value: 'visible',
    params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',height: '*'}}
    : {value: 'hidden', 
    params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',height: '*'}}"
    
    class="sublevel-nav"
    >
    <li *ngFor="let item of data.items" class="sublevel-nav-item">

    <!-- sublevel of sublevel -->
    <a class="sublevel-nav-link"
    (click)="handleClick(item)"
     *ngIf="item.items && item.items.length > 0"
     [ngClass]="getActiveClass(item)"
    >
      <i class="sublevel-link-icon fa fa-circle"></i>
      <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
      <i *ngIf="item.items && collapsed" class="menu-collapse-icon"
        [ngClass]="!item.expanded ? 'fal fa-angle-right': 'fal fa-angle-down'"
        ></i>
    </a>

    <!-- sublevel of sidenav element-->
    <a class="sublevel-nav-link"
      *ngIf="!item.items || (item.items && item.items.length === 0)"
      [routerLink]="[item.routeLink]"
      routerLinkActive="active-sublevel"
      [routerLinkActiveOptions]="{exact:true}"
    >
    <!-- sublevel-menu list -->
    <i class="sublevel-link-icon fa fa-circle"></i>
    <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
    </a>
  <div *ngIf="item.items && item.items.length > 0">
  <app-sublevel-menu
    [data]="item"
    [collapsed]="collapsed"
    [multiple]="multiple"
    [expanded]="item.expanded"
    ></app-sublevel-menu>
  </div>  
  </li>
    </ul>
  `,
  styleUrls: ['./sidenav.component.css'],
  animations:[
    trigger('submenu',[
      state('hidden',style({
        height:'0',
        overflow: 'hidden'
      })),
      state('visible',style({
        height:'#'
      })),
      transition('visible <=> hidden',[style({overflow: 'hidden'}),
      animate('{{transitionParams}}')]),
      transition('void => *',animate(0))
    ])
  ]
})
export class SublevelMenuComponent {

  constructor(private router:Router) {}

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() collapsed =false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  // handing the click for sublevel menu list
  handleClick(item:any):void{
    // for sublevel of sublevel of menu list
    if(!this.multiple){
      if(this.data.items && this.data.items.length > 0){
        for(let modelItem of this.data.items){
          if(item != modelItem && modelItem.expanded){
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;            // for making sidenav menu true and false
  }
  
  // adding class="active-sublevel" CSS to sub-component which is active 
  getActiveClass(item:INavbarData):string{
    return item.expanded && this.router.url.includes(item.routeLink)? 'active-sublevel' : '';
  }
}
