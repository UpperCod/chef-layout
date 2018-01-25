export let version = 'flexbox.0.0.1';
export let style = `
    .row@prefix,
    .column@prefix{
        width  : 100%;
        height : auto;
        display : flex;
        box-sizing: border-box;
    }

    .row@prefix{
        flex-flow : row wrap;
    }

    .column@prefix{
        flex-flow : column nowrap;
    }

    .column@prefix{
        flex-direction : column;
    }

    .inline@prefix{
        width  : auto;
        display : inline-flex;
    }

    @map(.row@childPrefix.reverse@prefix){
        flex-direction : row-reverse;
    }

    @map(.column@childPrefix.reverse@prefix){
        flex-direction : column-reverse;
    }

    .centered@prefix,
    @map(.row@childPrefix.center@prefix),
    @map(.column@childPrefix.middle@prefix){
        justify-content : center;
    }

    .centered@prefix,
    @map(.row@childPrefix.middle@prefix),
    @map(.column@childPrefix.center@prefix){
        align-items : center;
    }

    @map(.column@childPrefix.left@prefix),
    @map(.row@childPrefix.top@prefix){
        align-items : flex-start;
    }

    @map(.column@childPrefix.right@prefix),
    @map(.row@childPrefix.bottom@prefix){
        align-items : flex-end;
    }

    @map(.column@childPrefix.top@prefix),
    @map(.row@childPrefix.left@prefix){
        justify-content : flex-start;
    }

    @map(.column@childPrefix.bottom@prefix),
    @map(.row@childPrefix.right@prefix){
        justify-content : flex-end;
    }

    
    .between@prefix{
        justify-content : space-between;
    }

    .around@prefix{
        justify-content : space-around;
    }

    .evenly@prefix{
        justify-content : space-evenly;
    }

    .split@prefix{
        flex-grow : 1;
        flex-shrink : 1;
        flex-basis : 0;
    }

    .auto@prefix{
        flex-grow : 0;
        flex-shrink : 0;
        flex-basis : auto;
    }

    .contain@prefix{
        width: auto;
        height : auto;
        max-width : 100%;
        max-height : 100%;
    }
`;