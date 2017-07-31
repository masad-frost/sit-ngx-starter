export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;

  constructor({ id = 0, first_name = '', last_name = '', username = '', email = '' }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.username = username;
    this.email = email;
  }

  public isLoggedIn(): boolean {
    return !!this.id;
  }
}
