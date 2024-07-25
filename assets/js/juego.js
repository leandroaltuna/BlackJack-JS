

const miModulo = (() => {

    'use strict';

    /* 
    * 2C = Two of Clubs,
    * 2D = Two of Diamonds,
    * 2H = Two of Hearts,
    * 2S = Two of Spades,
    */
    
    
    let deck         = [];
    const tipos      = [ 'C', 'D', 'H', 'S' ], 
          especiales = [ 'A', 'Q', 'J', 'K' ];
    
    let puntoJugadores = [];
    
    //* Referencias del HTML
    const btnPedir   = document.querySelector( '#btnPedir' ),
          bntDetener = document.querySelector( '#btnDetener' ),
          bntNuevo   = document.querySelector( '#btnNuevo' );

    const divCartasJugadores = document.querySelectorAll( '.divCartas' ),
          puntosHTML         = document.querySelectorAll( 'small' );
    
    // Esta funcion inicializa el juegos
    const inicializaJuego = ( numJugadores = 2 ) => {
        
        deck = crearDeck();
        
        puntoJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntoJugadores.push( 0 );
        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
    
        btnPedir.disabled   = false;
        bntDetener.disabled = false;
    
    }

    // Esta funcion crea un nuevo deck.
    const crearDeck = () => {
    
        deck = [];

        for (let i = 2; i <= 10; i++) {
            
            for (const tipo of tipos) {
                deck.push( i + tipo );
            }
            
        }
    
        for (const tipo of tipos) {
            for (const especial of especiales) {
                deck.push( especial + tipo );
            }
        }
    
        return _.shuffle( deck );
    
    }
    
    // Esta funcion permite pedir carta.
    const pedirCarta = () => {
    
        if ( deck.length === 0 ) {
            throw 'No hay mas cartas en el deck';
        }

        return deck.pop();
    
    }
    
    const valorCarta = ( carta ) => {
    
        const valor = carta.substring( 0, carta.length - 1 ) ;
        
        return ( !isNaN( valor ) ) ? valor * 1 :
                ( valor === 'A' ) ? 11 : 10;
        
        // let puntos = 0;
        // if ( isNaN( valor ) ) {
            
        //     puntos = ( valor === 'A' ) ? 11 : 10;
        
        // } else {
        //     puntos =  valor * 1; // Multiplica por 1 para convertir el numero de string en version numerica.
        // }
        
        // console.log( puntos);
    }

    // Turno: 0 es el primer jugador y el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {
        
        puntoJugadores[ turno ] = puntoJugadores[ turno ] + valorCarta( carta );
        puntosHTML[ turno ].innerText = puntoJugadores[ turno ];
        return puntoJugadores[ turno ];

    }

    const mostrarCarta = ( carta, turno ) => {

        const imgCarta = document.createElement( 'img' );
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );

        divCartasJugadores[ turno ].append( imgCarta );

    }

    const determinarGanador = () => {
        
        const [ puntosMinimos, puntosComputadora ] = puntoJugadores;
        
        setTimeout(() => {
            
            if ( puntosComputadora === puntosMinimos ) {
                alert( 'Nadie gana :(' );
            } else if ( puntosMinimos > 21 ) {
                alert( 'Computadora Gana!' );
            } else if ( puntosComputadora > 21 ) {
                alert( 'Jugador Gana!' );
            } else if ( puntosMinimos === 21 ) {
                alert( 'Jugador Gana!' );
            } else if ( puntosComputadora === 21) {
                alert( 'Computadora Gana' );
            } else {
                alert( 'Computadora Gana' );
            }
    
        }, 100);
    
    }
    
    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
    
        let puntosComputadora = 0;
        const turnoComp = puntoJugadores.length - 1;

        if ( puntoJugadores.length === 2 ) {
            
            do {
                const carta = pedirCarta();
            
                puntosComputadora = acumularPuntos( carta, turnoComp );
                mostrarCarta( carta, turnoComp );
        
            } while ( ( puntosComputadora < puntosMinimos[0] ) && ( puntosMinimos[0] <= 21 ) );
        
            determinarGanador();

        } else {
            //TODO: en caso sean mas jugadores.
        }
    
    }
    
    
    //* Eventos
    btnPedir.addEventListener( 'click', () => {
    
        const carta = pedirCarta();
    
        const puntosJugador = acumularPuntos( carta, 0 );
    
        mostrarCarta( carta, 0 );
 
        if ( puntosJugador > 21 ) {
    
            btnPedir.disabled = true;
            bntDetener.disabled = true;
            turnoComputadora( puntosJugador );
            
        } else if ( puntosJugador === 21 ) {
            
            btnPedir.disabled = true;
            bntDetener.disabled = true;
            turnoComputadora( puntosJugador );
    
        }
    
    });
    
    bntDetener.addEventListener( 'click', () => {
    
        btnPedir.disabled = true;
        bntDetener.disabled = true;
        turnoComputadora( puntoJugadores );
    
    });
    
    bntNuevo.addEventListener( 'click', () => {
    
        inicializaJuego();    
    
    });

    return {
        nuevoJuego: inicializaJuego
    };

})();