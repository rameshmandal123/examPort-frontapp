 export class UserDetails{
    getItems() {
      throw new Error('Method not implemented.');
    }

    id: number | undefined;
    firstName: String | undefined;
    lastName: String | undefined;
    username: String | undefined;
    email: String | undefined;
    password: String | undefined;
    phoneNumber?: number;
    DateOfBirth?: Date;
    about: String | undefined;
    enable: boolean | undefined;

 }
