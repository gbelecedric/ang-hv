export class User {
  constructor(
    public name: string,
    public firstname: string,
    public email: string,
    public pass: string,
    public photo_url: string,
    public is_admin: boolean,
    public is_active: boolean
  ) {}
}
