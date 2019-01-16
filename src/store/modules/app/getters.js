// https://vuex.vuejs.org/en/getters.html

export default {
  getLazy: state => state.lazyLoaded,
  getBGColor: state => state.bgColor,
  getLoader: state => state.loader
}
