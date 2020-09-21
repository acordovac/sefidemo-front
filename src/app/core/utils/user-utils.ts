import {User} from '../../shared/models/user';

export class UserUtils {

  public getUserFullName(user: User): string {
    return `${user.nombre} ${user.primerApellido} ${user.segundoApellido}`;
  }
}

