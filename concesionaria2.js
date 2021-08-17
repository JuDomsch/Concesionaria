let autos = require("./autos.js")

let personas ={
    nombre: "Juan",
    capacidadDePagoEnCuotas: 00000,
    capacidadDePagoTotal: 10000000
}


let concesionaria = {

   autos: autos,

   buscarAuto: function (bPatente){
    let buscado = null;
    for (let i = 0; i<this.autos.length; i++){
        if (bPatente == this.autos[i].patente){
            buscado = this.autos[i];
        }
    };
    return buscado
    },

   venderAuto: function(vPatente){
       this.buscarAuto(vPatente).vendido = true;
    },

   autosParaLaVenta: function(){
       return this.autos.filter(function(autoPLV){
           return autoPLV.vendido == false;
    });
   },

   autosNuevos: function(){
       return this.autosParaLaVenta().filter(function(okm){
           return okm.km < 100;
       })
   },

   listaDeVentas: function(){
       let ventas = this.autos.filter(function(autoV){
        return autoV.vendido == true;
            });
        let preciosVentas = [];
        for (let i = 0; i<ventas.length; i++){
            preciosVentas.push(ventas[i].precio);
        };
        return preciosVentas; 
    },
     
     totalDeVentas: function () {
        let reducir = (acum, ini) => acum + ini;
        return this.listaDeVentas().reduce(reducir, 0);
    },

    puedeComprar: function(auto, persona){
        let valorCuota = auto.precio / auto.cuotas; //Funca
        if(valorCuota <= persona.capacidadDePagoEnCuotas && auto.precio <= persona.capacidadDePagoTotal){
            return true
        }else{
            return false
        }
    },

    autosQuePuedeComprar: function(persona){
        let autosDisponibles = this.autosParaLaVenta();

        let comprables = [];

        for (i = 0; i <autosDisponibles.length; i++){
            let valorCuota = autosDisponibles[i].precio / autosDisponibles[i].cuotas; //Funca
            if(valorCuota <= persona.capacidadDePagoEnCuotas && autosDisponibles[i].precio <= persona.capacidadDePagoTotal){
                comprables.push(autosDisponibles[i])
            }
        }
        return (comprables);

    }


};
concesionaria.buscarAuto("min499")



