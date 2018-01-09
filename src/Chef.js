export default function Chef(media,version){
    this.media   = media;
    this.css     = [];
    this.version = version;
    this.cache   = Chef.cache;
    this.prefix  = Chef.prefix;
}
Chef.cache  = false;
Chef.prefix = '';

Chef.prototype = {
     global(css){
        this.css.unshift(css);
        return this;
    },
    repeat( css, cache = this.cache , version = this.version, namespace = this.prefix ){
        if( version && cache ){
            version  = version+(namespace?`[${namespace}]`:'');
            let next = localStorage.getItem(version);
            if( !next  ){
                let instance = new Chef(this.media);
                    next = instance.repeat(css).css[0];
                    localStorage.setItem(version,next);
            }
            this.css.push(next);
            return this;
        }
        let format = (prefix)=>prefix === 'global' ? '' : prefix,
            varsGlobal = {},
            next = this.media.map(([parentPrefix,media,vars],count)=>{
                    vars = (parentPrefix === 'global' ? (varsGlobal = media || vars)  : vars) || varsGlobal || {};
                let next = css.replace(/@([\w]+)\(([^\)\(]+)\)/g,(all,type,args)=>{
                    switch(type){
                            case 'map':
                                return this.media.map(([prefix],index)=>{
                                    if( count >= index ){
                                        return args.replace(/@childPrefix/g,format(prefix))
                                                .replace(/@prefix/g,format(parentPrefix))
                                    }
                                }).filter(content=>content)
                            break;
                            case 'var':
                                return vars[args] || this[args] || '';
                            default:
                                return all;
                    }
                }).replace(/@prefix/g,format(parentPrefix));
                return parentPrefix == 'global' ? next :  `@media ${media}{ ${next} }`;
            }).join(' ');
            this.css.push( namespace ? next.replace(/\.([a-zA-Z]+)/g,`.${namespace}$1`) : next);
            return this;
    },
    toString(){
        return this.css.join(' ');
    },
    print(parent = document.head){
        if( !this.element ){
            this.element = document.createElement('style');
            this.element.dataset.version = this.version || '0.0.0';
            parent.appendChild(this.element);
        }
        this.element.innerHTML = this;
        return this;
    },
    remove(){
        this.element.parentElement.removeChild(this.element);
        return this;
    }
}