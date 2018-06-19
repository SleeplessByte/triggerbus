function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var EventBus=/*#__PURE__*/function(){function a(){_classCallCheck(this,a),this.callbacks={};}return _createClass(a,[{key:"_callbacks",value:function _callbacks(a){return this.callbacks[a]||(this.callbacks[a]=[]),this.callbacks[a]}/**
   * Trigger an event
   *
   * @param {String} name name of the event to trigger
   * @param {any[]} args arguments to pass to callback
   *
   * @returns {EventBus}
   */},{key:"trigger",value:function trigger(a){for(var b=arguments.length,d=Array(1<b?b-1:0),c=1;c<b;c++)d[c-1]=arguments[c];return this._callbacks(a).forEach(function(a){a.apply(void 0,d);}),this}/**
   * Add a callback to an event name
   *
   * @param {String} name name of the event to listen on
   * @param {(...args) => void} fn callback to call when it's triggered
   *
   * @returns {() => EventBus} unsubscribe this callback
   */},{key:"on",value:function on(a,b){var c=this;return this._callbacks(a).push(b),function(){return c.off(a,b)}}/**
  * Remove callbacks from a name, or a specific one if given
  *
  * @param {String} name name of the event to remove from
  * @param {(...args) => void}[]fn optional callback to remove from the event
  *
  * @returns {EventBus}
  */},{key:"off",value:function off(a,b){return this.callbacks[a]=b?this._callbacks(a).filter(function(a){return a!==b}):[],this}/**
   * Add a callback to an event name, which is removed the first time it is
   *   triggered.
   *
   * @param {String} name name of the event to listen on
   * @param {(...args) => void} fn callback to call when it's triggered
   *
   * @returns {() => EventBus} unsubscribe this callback
   */},{key:"once",value:function once(a,b){function c(){for(var e=arguments.length,f=Array(e),g=0;g<e;g++)f[g]=arguments[g];b.apply(void 0,f),d.off(a,c);}var d=this;return this.on(a,c)}}]),a}(),triggerbus=function(){return new EventBus};/**
 * Create a new {EventBus}
 *
 * @returns {EventBus}
 */triggerbus.EventBus=EventBus;

export default triggerbus;
