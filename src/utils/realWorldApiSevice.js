import ResourceError from './ResourceError';
class realWorldApiService {
  _articlesUrl = 'https://api.realworld.io/api/articles?limit=5';
  _articleUrl = 'https://api.realworld.io/api/articles/';

  async getArticles(pageNumber) {
    const offset = (pageNumber - 1) * 5;
    return await this.sendData(`${this._articlesUrl}&offset=${offset}`);
  }
  async getArticle(slug) {
    return await this.sendData(this._articleUrl + slug);
  }
  async articleDelete(slug, token) {
    return await fetch(this._articleUrl + slug, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  async signUp(data) {
    return await fetch('https://api.realworld.io/api/users', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async signIn(data) {
    return await fetch('https://api.realworld.io/api/users/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async editProfile(data, token) {
    return await fetch('https://api.realworld.io/api/user', {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  async articleNew(data, token) {
    return await fetch('https://api.realworld.io/api/articles', {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  async articleEdit(data, token, slug) {
    return await fetch(`https://api.realworld.io/api/articles/${slug}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  async articleLike(slug, token) {
    return await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
