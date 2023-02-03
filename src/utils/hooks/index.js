/**
 * @description 自定义hooks
 * @use Hooks.useEventListener('scroll', function, DOM);
 * @example Hooks.useEventListener('scroll', ()=> {}, document) //滚动监听
 * @example useTimeout(()=>{}, 1000) //延时操作
*/
export * from './useEventListener';
export * from './useTimer';