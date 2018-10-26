import { set, toggle } from '@/utils/vuex'

export default {
  setDrawer: set('drawer'),
  setLazyLoaded: set('lazyLoaded'),
  toggleDrawer: toggle('drawer')
}
