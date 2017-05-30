export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;

  constructor(createDefault = false, user: any = null) {
    if (createDefault) {
      this.id = 0;
      this.firstName = '';
      this.lastName = '';
      this.username = '';
      this.email = '';
    }
    if (user) {
      this.id = user.id;
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.username = user.username;
      this.email = user.email;
    }
  }
}
