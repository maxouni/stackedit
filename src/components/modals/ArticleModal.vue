<template>
  <modal-inner aria-label="Article name">
    <div class="modal__content">
      <p>Please add article name</p>
      <div class="suggest__wrap">
        <form-entry label="Name or ID" error="url">
          <input slot="field" class="textfield" type="text"
                 v-on:input="updateValue($event.target.value)"
                 @keydown.enter="resolve()"
                 @keydown.up="changeSelected(1)"
                 @keydown.down="changeSelected(-1)"
                 v-model.trim="text">
        </form-entry>
        <div class="suggest" v-if="suggest.length">
          <div class="suggest__item"
               v-bind:class="{ 'suggest__item--active': suggestSelected === index}"
               v-for="(item, index) in suggest" v-on:click="resolve()">{{item.name}}</div>
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
import axios from 'axios';
import modalTemplate from './common/modalTemplate';

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
      axios.get(`https://apograf-test.herokuapp.com/api/suggest?limit=10&search-string=${value}`)
        .then((response) => {
          this.cache[value] = response.data.suggests;
          this.suggest = response.data.suggests;
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
    resolve() {
      this.text = '';
      this.suggest = [];
      // if (!this.text) {
      //   this.setError('text');
      // } else {
      //   const callback = this.config.callback;
      //   this.config.resolve();
      //   callback(this.text);
      // }
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
