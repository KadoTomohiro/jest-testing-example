<template>
  <div class="container">
    <input
      v-model="kana"
      type="text"
      placeholder="かな入力"
      @input="convertKana"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { KanaConverter } from '~/modules/CharConverter'

export default Vue.extend({
  data() {
    return {
      kana: '',
    }
  },
  methods: {
    convertKana() {
      this.kana = KanaConverter.convertToKatakana(this.kana)
    },
  },
})
</script>
