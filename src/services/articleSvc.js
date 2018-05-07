import axios from 'axios';

export default {
  server: 'https://apograf.io',
  http: axios,
  get() {
    return window.cacheArticle;
  },
  getArticlesByIDs(ids, success, error) {
    this.http.get(`${this.server}/api/article-by-ids?article-ids=${ids.join('&article-ids=')}`).then(
      (response) => {
        if (typeof success === 'function') {
          success(response.data.articles);
        }
      },
      (response) => {
        if (typeof error === 'function') {
          error(response);
        }
      },
    );
  },
  getArticlesSuggest(text, success, error) {
    this.http.get(`${this.server}/api/article-suggest?search_string=${text}`).then(
      (response) => {
        if (typeof success === 'function') {
          success(response.data.articles);
        }
      },
      (response) => {
        if (typeof error === 'function') {
          error(response);
        }
      },
    );
  },
  getArticleByID(id, success, error) {
    this.http.get(`${this.server}/api/article/${id}`).then(
      (response) => {
        if (response.data.article) {
          window.cacheArticle[id] = response.data.article;
          if (typeof success === 'function') {
            success(response.data.article);
          }
        }
      },
      (response) => {
        if (typeof error === 'function') {
          error(response);
        }
      },
    );
  },
};
