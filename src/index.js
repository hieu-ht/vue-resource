/**
 * Install plugin.
 */
import Url from './url/index';
import Http from './http/index';
import Promise from './promise';
import Resource from './resource';
import Util, {options} from './util';
let vueInstance
function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Util(Vue);
  Vue.url = Url;
  Vue.http = Http;
  Vue.resource = Resource;
  Vue.Promise = Promise;
  Object.defineProperties(Vue.prototype, {
    $url: {
      get() {
        return options(Vue.url, this, this.$options.url);
      }
    },
    $http: {
      get() {
        return options(Vue.http, this, this.$options.http);
      }
    },
    $resource: {
      get() {
        return Vue.resource.bind(this);
      }
    },
    $promise: {
      get() {
        return (executor) => new Vue.Promise(executor, this);
      }
    }
  });
}
export function register(Vue) {
  vueInstance = Vue
}
export function install() {
  if (typeof window !== 'undefined' && window.Vue && !window.Vue.resource && window.Vue.use) {
    window.Vue.use(plugin);
  } else if (vueInstance) {
    vueInstance.use(plugin)
  }
}
export default plugin;