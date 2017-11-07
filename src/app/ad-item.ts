import { Type } from '@angular/core';

export class AdItem {
  constructor(public component: Type<any>, public directory: any, public slide: string, public data: any) {}
}
