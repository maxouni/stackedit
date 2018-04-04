import axios from 'axios';

export default {
  server: 'https://apograf-test.herokuapp.com',
  http: axios,
  get() {
    return window.cacheArticle;
  },
  update() {
    window.console.log('update');
    this.getArticlesByID(96, () => {});
    this.getArticlesByID(95, () => {});
  },
  getArticlesSuggest(text, success, error) {
    this.http.get(`${this.server}/api/article-suggest?search_string=${text}`).then(
      (response) => {
        success(response.data.articles);
      },
      (response) => {
        error(response);
      },
    );
  },
  getArticlesByID(id, success, error) {
    this.http.get(`${this.server}/api/article/${id}`).then(
      (response) => {
        if (response.data.article) {
          window.cacheArticle[id] = response.data.article;
          success(response.data.article);
        }
      },
      (response) => {
        error(response);
      },
    );
  },
};
