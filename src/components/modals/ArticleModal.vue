<template>
  <modal-inner aria-label="Article name">
    <div class="modal__content">
      <p>Please add article name</p>
      <div class="suggest__wrap">
        <form-entry label="Name or ID" error="url">
          <input slot="field" class="textfield" type="text"
                 v-on:input="updateValue($event.target.value)"
                 @keydown.enter="resolve($event)"
                 @keydown.up="changeSelected(-1)"
                 @keydown.down="changeSelected(1)"
                 v-model.trim="text">
        </form-entry>
        <div class="suggest" v-if="suggest.length">
          <div class="suggest__item"
               v-bind:class="{ 'suggest__item--active': suggestSelected === index}"
               v-for="(item, index) in suggest"
               v-on:click="suggestSelected = index;resolve($event);">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">Cancel</button>
      <button class="button" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from './common/modalTemplate';
import articleSvc from '../../services/articleSvc';

export default modalTemplate({
  data: () => ({
    text: '',
    suggest: [],
    suggestSelected: 0,
    cache: {},
  }),
  methods: {
    updateValue(value) {
      if (value in this.cache) {
        this.suggest = value;
      }
      articleSvc.getArticlesSuggest(value, (response) => {
        this.cache[value] = response;
        this.suggest = response;
      });
    },
    changeSelected(dir) {
      const nextIndex = this.suggestSelected;

      if (nextIndex + dir < 0) {
        this.suggestSelected = this.suggest.length - 1;
      } else if (nextIndex + dir === this.suggest.length) {
        this.suggestSelected = 0;
      } else {
        this.suggestSelected = nextIndex + dir;
      }
    },
    resolve(event) {
      if (event) event.preventDefault();
      const callback = this.config.callback;
      const idArticle = this.suggest[this.suggestSelected].id;

      this.text = '';
      this.suggest = [];

      if (idArticle in window.cacheArticle) {
        this.config.resolve();
        callback(idArticle);
      } else {
        articleSvc.getArticleByID(idArticle, (response) => {
          if (response) {
            this.config.resolve();
            callback(idArticle);
          }
        });
      }
    },
    reject() {
      const callback = this.config.callback;
      this.config.reject();
      callback(null);
    },
  },
});
</script>

<style lang="scss">
  .suggest {
    position: absolute;
    width: 355px;
    left: 2px;
    top: 66px;
    background: #fff;
    z-index: 2;

    &__item {
      padding: 2px 10px;

      &--active {
        background: #a6cbdb;
      }
    }

    &__wrap {
      position: relative;
    }
  }

  .modal__inner-2 {
    overflow: visible;
  }
</style>
