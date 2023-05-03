Object.defineProperty(exports,"__esModule",{value:true});exports.WebView=undefined;var _jsxFileName='src/index.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _qs=require('qs');var _qs2=_interopRequireDefault(_qs);var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var WebView=exports.WebView=function(_Component){_inherits(WebView,_Component);function WebView(props){_classCallCheck(this,WebView);var _this=_possibleConstructorReturn(this,(WebView.__proto__||Object.getPrototypeOf(WebView)).call(this,props));_this.state={html:null};_this.setRef=function(ref){return _this.frameRef=ref;};_this.handleSource=function(source,newWindow){if(!source.method)return;if(newWindow){_this.handleSourceInNewWindow(source,newWindow);}else{_this.handleSourceInIFrame(source);}};_this.handleSourceInIFrame=function(source){var uri=source.uri,options=_objectWithoutProperties(source,['uri']);var baseUrl=uri.substr(0,uri.lastIndexOf('/')+1);fetch(uri,options).then(function(response){return response.text();}).then(function(html){return _this.setState({html:'<base href="'+baseUrl+'" />'+html});});};_this.handleSourceInNewWindow=function(source,newWindow){if(source.method==='POST'){var contentType=source.headers['Content-Type'];var body='';if(contentType&&contentType.includes('application/x-www-form-urlencoded')){body=_qs2.default.parse(source.body);}else{console.warn('[WebView] When opening a new window, this content-type is not supported yet, please make a PR!',contentType);return;}window.open(require('./postMock.html')+'?'+_qs2.default.stringify({uri:source.uri,body:JSON.stringify(body)}),newWindow.name||'webview',newWindow.features||undefined);}else{console.warn('[WebView] When opening a new window, this method is not supported yet, please make a PR!',source.method);}};_this.onMessage=function(nativeEvent){return _this.props.onMessage({nativeEvent:nativeEvent});};_this.postMessage=function(message,origin){_this.frameRef.contentWindow.postMessage(message,origin);};_this.handleInjectedJavaScript=function(html){if(_this.props.injectedJavaScript){if(html){return html.replace('</body>','<script>'+_this.props.injectedJavaScript+'</script></body>');}else{return html;}}else{return html;}};_this.handleSource(props.source,props.newWindow);return _this;}_createClass(WebView,[{key:'componentDidMount',value:function componentDidMount(){if(this.props.onMessage){window.addEventListener('message',this.onMessage,true);}}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){if(this.props.source.uri!==nextProps.source.uri||this.props.source.method!==nextProps.source.method||this.props.source.body!==nextProps.source.body){this.handleSource(nextProps.source,nextProps.newWindow);}}},{key:'componentWillUnmount',value:function componentWillUnmount(){if(this.props.onMessage){window.removeEventListener('message',this.onMessage,true);}}},{key:'render',value:function render(){if(this.props.newWindow){return _react2.default.createElement(_reactNative.View,{style:styles.loadingContainer,__source:{fileName:_jsxFileName,lineNumber:112}},_react2.default.createElement(_reactNative.ActivityIndicator,{__source:{fileName:_jsxFileName,lineNumber:113}}));}var _props=this.props,title=_props.title,source=_props.source,onLoad=_props.onLoad,scrollEnabled=_props.scrollEnabled,allow=_props.allow;var styleObj=_reactNative.StyleSheet.flatten(this.props.style);var defaultAllowAll='geolocation *; microphone *; camera *';return(0,_reactNative.unstable_createElement)('iframe',{title:title,ref:this.setRef,src:!source.method?source.uri:undefined,srcDoc:this.handleInjectedJavaScript(this.state.html||source.html),width:styleObj&&styleObj.width,height:styleObj&&styleObj.height,style:_reactNative.StyleSheet.flatten([styles.iframe,scrollEnabled&&styles.noScroll,this.props.style]),allowFullScreen:true,allowpaymentrequest:'true',frameBorder:'0',seamless:true,onLoad:onLoad,allow:allow||defaultAllowAll});}}]);return WebView;}(_react.Component);WebView.defaultProps={scrollEnabled:true};exports.default=WebView;var styles=_reactNative.StyleSheet.create({loadingContainer:{flex:1,alignItems:'center',justifyContent:'center'},iframe:{width:'100%',height:'100%',borderWidth:0},noScroll:{overflow:'hidden'}});