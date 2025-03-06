import Vue from 'vue'
import App from './App.vue'
import './assets/main.css'
import {
  Button,
  Table,
  TableColumn,
  Tag,
  Icon,
  Tooltip,
  Checkbox,
  CheckboxGroup,
  Rate
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Rate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
