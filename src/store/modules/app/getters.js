// https://vuex.vuejs.org/en/getters.html

export default {
  getLazy: (state) => {
    return state.lazyLoaded
  }
}
