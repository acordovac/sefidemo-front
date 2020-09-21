import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../../models/user';

@Pipe({
  name: 'fullname'
})
export class UserPipe implements PipeTransform {

  transform(value: User, ...args: unknown[]): unknown {
    return `${value.nombre} ${value.primerApellido} ${value.segundoApellido}`;;
  }

}
