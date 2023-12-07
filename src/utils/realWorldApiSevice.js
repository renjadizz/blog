import ResourceError from './ResourceError';
class realWorldApiService {
  _articlesUrl = 'https://api.realworld.io/api/articles?limit=5';
  _ticketsUrl = 'https://aviasales-test-api.kata.academy/tickets?searchId=';

  async getArticles(pageNumber) {
    const offset = (pageNumber - 1) * 5;
    return await this.sendData(`${this._articlesUrl}&offset=${offset}`);
  }
  async geTickets(searchId) {
    return await this.sendData(this._ticketsUrl + searchId);
  }
  async sendData(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new ResourceError('Error number is ' + res.status);
      }
      const resJson = await res.json();
      return resJson;
    } catch (error) {
      return error;
    }
  }
}
export default realWorldApiService;
