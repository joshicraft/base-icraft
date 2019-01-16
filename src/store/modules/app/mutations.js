import { set, toggle } from '@/utils/vuex'

export default {
  setDrawer: set('drawer'),
  setLoader: set('loader'),
  setLazyLoaded: set('lazyLoaded'),
  setBGColor: set('lazyLoaded'),
  toggleDrawer: toggle('drawer')
}
