<template>
  <aside :class="$style.top">
    <div :class="$style.container">
      <span>Precisamos de mais dados. Ajude-nos compartilhando essa página.</span>
      <button @click="share">compartilhar</button>
    </div>
  </aside>
</template>

<script>
export default {
  methods: {
    share() {
      window.open(`https://www.addtoany.com/share#url=${location.href}`)
    }
  }
}
</script>


<style lang="scss" module>
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(#372F45, 1);
  color: #ADABC9;
  padding: 10px 0;
  text-align: center;

  button {
    display: inline-block;
    margin: 0 6px;
    border: 0;
    padding: 6px 10px;
    border-radius: 4px;
    background-color: #A8435D;
    transition: background-color linear .15s;
    color: #fef;
    outline: none;
    font-size: .8em;

    &:hover {
      background-color: darken(#A8435D, 5%);
    }
  }

  @media (max-height: 500px) {
    display: none;
  }
}

.container {
  display: block;
  margin: 0 auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    > span {
      display: block;
      margin-bottom: 8px;
    }
  }
}
</style>
