// https://vuex.vuejs.org/en/getters.html

export default {
  getLazy: state => state.lazyLoaded,
  getBGColor: state => state.bgColor,
  getQuestionsResult: state => state.questionsResult,
  getLoader: state => state.loader
}
