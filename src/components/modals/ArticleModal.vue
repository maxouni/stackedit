<template>
  <modal-inner aria-label="Article name">
    <div class="modal__content">
      <p>Please add article name</p>
      <form-entry label="Name or ID" error="url">
        <input slot="field" class="textfield" type="text" v-model.trim="text" @keydown.enter="resolve()">
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">Cancel</button>
      <button class="button" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from './common/modalTemplate';

export default modalTemplate({
  data: () => ({
    text: '',
  }),
  methods: {
    resolve() {
      if (!this.text) {
        this.setError('text');
      } else {
        const callback = this.config.callback;
        this.config.resolve();
        callback('{"article":{"article-date":"2017-11-23T00:00:00.000Z","publication-name":"arXiv.org","featured":1,"doi":null,"keywords":[],"citedby-count":0,"title":"A blockchain-based Decentralized System for proper handling of temporary\\n  Employment contracts","link-pdf":"http://arxiv.org/pdf/1711.09758v1","id":2,"view-publisher":null,"promoted":false,"authors":["Ibba&nbsp;Simona","Pinna&nbsp;Andrea"],"views":28}}');
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
