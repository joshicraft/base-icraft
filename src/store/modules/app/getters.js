// https://vuex.vuejs.org/en/getters.html

export default {
  getLazy: state => state.lazyLoaded,
  getLoader: state => state.loader
}
