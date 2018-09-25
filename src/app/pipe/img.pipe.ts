import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgPipe'
})
export class ImgPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const content = value['enclosure'];
    return content.link;
  }

}
