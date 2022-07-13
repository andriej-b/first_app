export class AuthUserModel {
  constructor (
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiresIn: Date
  ) { }
  get token() {
    if (!this._token || new Date() > this._tokenExpiresIn) {
      return null;
    } else {
      return this._token;
    }
  }
}
