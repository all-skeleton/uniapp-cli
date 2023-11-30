<template lang="pug">
div.nothing(:class="isBg ? 'bg' : ''")
  div.tips {{tips ? tips : '没有更多了'}}
  div.entry(v-if="entry" @tap="emit('entry')") {{entry}}
</template>

<script setup lang="ts">
const props = defineProps({
  tips: String,
  isBg: Boolean,
  entry: null
})
const emit = defineEmits(['entry'])
</script>

<style lang="scss">
.nothing {
  text-align: center;
  padding-bottom: 128rpx;
}
.bg{
  background-image: buildStaticUrl('images/nothing.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 267rpx;
}
.tips {
  padding: 50rpx;
  font-size: 30rpx;
  color: #9e9e9e;
}

.entry {
  width: 280rpx;
  height: 80rpx;
  color: #333;
  font-size: 30rpx;
  text-align: center;
  line-height: 80rpx;
  border-radius: 99rpx;
  border: 1px solid #ccc;
  margin: auto;

  &:active {
    background: darken(#fff, 5%);
  }
}
</style>