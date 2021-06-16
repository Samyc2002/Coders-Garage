type NewType = any;

export class ContactEmail {
  private static instance: ContactEmail;
  private contactEmail: any;
  /**
   * The ContactEmail's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * The static method that controls the access to the ContactEmail instance.
   *
   * This implementation let you subclass the ContactEmail class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): ContactEmail {
    if (!ContactEmail.instance) {
      ContactEmail.instance = new ContactEmail();
    }

    return ContactEmail.instance;
  }

  /**
   * Finally, any ContactEmail should define some business logic, which can be
   * executed on its instance.
   */
  public setContactEmail(contactEmail: NewType): void {
    this.contactEmail = contactEmail;
    return;
  }
  public getContactEmail(): any {
    return this.contactEmail;
  }
}
