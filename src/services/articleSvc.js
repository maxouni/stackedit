import axios from 'axios';

export default {
  server: 'https://apograf-test.herokuapp.com',
  http: axios,
  get() {
    return window.cacheArticle;
  },
  update() {
    window.console.log('update');
  },
  getArticlesByIDs(ids, success, error) {
    this.http.get(`${this.server}/api/article-by-ids?article-ids=${ids.join('&article-ids=')}`).then(
      (response) => {
        success(response.data.articles);
      },
      (response) => {
        error(response);
      },
    );
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
  getArticleByID(id, success, error) {
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
