import Vue from 'vue';

declare module 'vue/types/vue' {
  // 可以使用 `VueConstructor` 接口
  // 来声明全局属性
  interface Vue {
    readonly $services: any;
    readonly $ELEMENT: any;
  }
}
