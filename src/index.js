import Chef   from './Chef';
import * as Flex from './Flex.min';

Chef.defaultMedia = [
    ['global'],
    ['_xl' ,'(max-width:1440px)'],
    ['_l'  ,'(max-width:1280px)'],
    ['_m'  ,'(max-width:1024px)'],
    ['_s'  ,'(max-width:768px)'],
    ['_xs' ,'(max-width:414px)'],
];

Chef.default = function( config = Chef.defaultMedia){
    return (new Chef(config,Flex.version))
                    .repeat(Flex.style)
                    .print()
}

Chef.columns = function(max = 20,margin,padding){
    let instance = new Chef(Chef.defaultMedia,'column.0.0.0'),
        css = '';
        for(let key = 1 ; key <= max ; key++){
            let percent = key / max * 100,
                prefix  = String(percent).split('.')[0],
                cursor  = `.c${prefix}\\%@prefix`,
                next;
            if(margin || padding ){
                if(margin ){
                    next = `calc(${percent}% - ${margin} * 2);margin:${margin}`;
                }else{
                    next = `${percent}%`;
                }
                if(padding){
                    next+=(next ? ';' : '')+`padding:${padding}`;
                }
                css+=`${cursor}{flex-basis:${next}}`;
            }else{
                css+=`${cursor}{flex-basis:${percent}%}`;
            }
        }
        instance.repeat(css);
        instance.print();
        return instance;
}

export default Chef;