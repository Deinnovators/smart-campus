import Cookies, { CookieAttributes, CookiesStatic } from 'js-cookie';

class _CookieService {
  private instance: CookiesStatic;

  constructor() {
    this.instance = Cookies.withAttributes({
      expires: 29,
    });
  }

  /**
   * Create a cookie
   *
   * @param {string} name
   * @param {string} value
   * @param {CookieAttributes} [options]
   * @return {*}  {(string | undefined)}
   */
  set(
    name: string,
    value: string,
    options?: CookieAttributes,
  ): string | undefined {
    return this.instance.set(name, value, options);
  }

  /**
   * Read cookie
   *
   * @param {string} name
   * @return {*}  {(string | undefined)}
   */
  get(name: string): string | undefined {
    return this.instance.get(name);
  }

  /**
   * Read all available cookies
   *
   * @return {*}  {{ [key: string]: string }}
   */
  getAll(): { [key: string]: string } {
    return this.instance.get();
  }

  /**
   * Delete cookie
   *
   * @param {string} name
   * @param {CookieAttributes} [options]
   * @memberof _CookieService
   */
  remove(name: string, options?: CookieAttributes): void {
    return this.instance.remove(name, options);
  }
}

export const cookieService = new _CookieService();
