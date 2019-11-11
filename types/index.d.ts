interface Window {
  LOCAL_CONFIG?: any;
  tinymce?: any;
  webkitURL?: any;
}

declare var window: Window & typeof globalThis;

// @liwb/cloud-utils -> webpack alias utils
declare module 'utils';

declare module '*.png';

declare module '*.gif';

declare module 'vue-count-to';

declare module 'vuedraggable';

declare module 'vue-splitpane';
