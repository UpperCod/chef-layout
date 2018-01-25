(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Chef = factory());
}(this, (function () { 'use strict';

function Chef$1(media,version){
    this.media   = media;
    this.css     = [];
    this.version = version;
    this.cache   = Chef$1.cache;
    this.prefix  = Chef$1.prefix;
}
Chef$1.cache  = false;
Chef$1.prefix = '';

Chef$1.prototype = {
     global: function global(css){
        this.css.unshift(css);
        return this;
    },
    repeat: function repeat( css, cache , version, namespace ){
        var this$1 = this;
        if ( cache === void 0 ) cache = this.cache;
        if ( version === void 0 ) version = this.version;
        if ( namespace === void 0 ) namespace = this.prefix;

        if( version && cache ){
            version  = version+(namespace?("[" + namespace + "]"):'');
            var next$1 = localStorage.getItem(version);
            if( !next$1  ){
                var instance = new Chef$1(this.media);
                    next$1 = instance.repeat(css).css[0];
                    localStorage.setItem(version,next$1);
            }
            this.css.push(next$1);
            return this;
        }
        var format = function (prefix){ return prefix === 'global' ? '' : prefix; },
            varsGlobal = {},
            next = this.media.map(function (ref,count){
                    var parentPrefix = ref[0];
                    var media = ref[1];
                    var vars = ref[2];

                    vars = (parentPrefix === 'global' ? (varsGlobal = media || vars)  : vars) || varsGlobal || {};
                var next = css.replace(/@([\w]+)\(([^\)\(]+)\)/g,function (all,type,args){
                    switch(type){
                            case 'map':
                                return this$1.media.map(function (ref,index){
                                    var prefix = ref[0];

                                    if( count >= index ){
                                        return args.replace(/@childPrefix/g,format(prefix))
                                                .replace(/@prefix/g,format(parentPrefix))
                                    }
                                }).filter(function (content){ return content; })
                            break;
                            case 'var':
                                return vars[args] || this$1[args] || '';
                            default:
                                return all;
                    }
                }).replace(/@prefix/g,format(parentPrefix));
                return parentPrefix == 'global' ? next :  ("@media " + media + "{ " + next + " }");
            }).join(' ');
            this.css.push( namespace ? next.replace(/\.([a-zA-Z]+)/g,("." + namespace + "$1")) : next);
            return this;
    },
    toString: function toString(){
        return this.css.join(' ');
    },
    print: function print(parent){
        if ( parent === void 0 ) parent = document.head;

        if( !this.element ){
            this.element = document.createElement('style');
            this.element.dataset.version = this.version || '0.0.0';
            parent.appendChild(this.element);
        }
        this.element.innerHTML = this;
        return this;
    },
    remove: function remove(){
        this.element.parentElement.removeChild(this.element);
        return this;
    }
};

var version = 'flexbox.0.0.1';
/**
 * css minificado con : https://www.minifier.org/
 */
var style = '.row@prefix,.column@prefix{width:100%;height:auto;display:flex;box-sizing:border-box}.row@prefix{flex-flow:row wrap}.column@prefix{flex-flow:column nowrap}.column@prefix{flex-direction:column}.inline@prefix{width:auto;display:inline-flex}@map(.row@childPrefix.reverse@prefix){flex-direction:row-reverse}@map(.column@childPrefix.reverse@prefix){flex-direction:column-reverse}.centered@prefix,@map(.row@childPrefix.center@prefix),@map(.column@childPrefix.middle@prefix){justify-content:center}.centered@prefix,@map(.row@childPrefix.middle@prefix),@map(.column@childPrefix.center@prefix){align-items:center}@map(.column@childPrefix.left@prefix),@map(.row@childPrefix.top@prefix){align-items:flex-start}@map(.column@childPrefix.right@prefix),@map(.row@childPrefix.bottom@prefix){align-items:flex-end}@map(.column@childPrefix.top@prefix),@map(.row@childPrefix.left@prefix){justify-content:flex-start}@map(.column@childPrefix.bottom@prefix),@map(.row@childPrefix.right@prefix){justify-content:flex-end}.between@prefix{justify-content:space-between}.around@prefix{justify-content:space-around}.evenly@prefix{justify-content:space-evenly}.split@prefix{flex-grow:1;flex-shrink:1;flex-basis:0%}.auto@prefix{flex-grow:0;flex-shrink:0;flex-basis:auto}.contain@prefix{width:auto;height:auto;max-width:100%;max-height:100%}';

Chef$1.defaultMedia = [
    ['global'],
    ['_xl' ,'(max-width:1440px)'],
    ['_l'  ,'(max-width:1280px)'],
    ['_m'  ,'(max-width:1024px)'],
    ['_s'  ,'(max-width:768px)'],
    ['_xs' ,'(max-width:414px)'] ];

Chef$1.default = function( config){
    if ( config === void 0 ) config = Chef$1.defaultMedia;

    return (new Chef$1(config,version))
                    .repeat(style)
                    .print()
};

Chef$1.columns = function(max,margin,padding){
    if ( max === void 0 ) max = 20;

    var instance = new Chef$1(Chef$1.defaultMedia,'column.0.0.0'),
        css = '';
        for(var key = 1 ; key <= max ; key++){
            var percent = key / max * 100,
                prefix  = String(percent).split('.')[0],
                cursor  = ".c" + prefix + "\\%@prefix",
                next = (void 0);
            if(margin || padding ){
                if(margin ){
                    next = "calc(" + percent + "% - " + margin + " * 2);margin:" + margin;
                }else{
                    next = percent + "%";
                }
                if(padding){
                    next+=(next ? ';' : '')+"padding:" + padding;
                }
                css+=cursor + "{flex-basis:" + next + "}";
            }else{
                css+=cursor + "{flex-basis:" + percent + "%}";
            }
        }
        instance.repeat(css);
        instance.print();
        return instance;
};

return Chef$1;

})));
