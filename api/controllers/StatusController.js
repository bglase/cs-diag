/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 */


 /**
 * Prints a set of controller items to the console
 * 
 * @param error
 * @param data
 */
function outputItems( error, data ) {
    if( error ) {
        console.error( error.toString );
    }
    else {
        if( data.complete ) {
            for( var i = 0; i < data.items.length; i++ ) {
                if( 'object' == typeof( data.items[i].value )) {
                    for( key in data.items[i].value ) {
                        console.log( data.items[i].name + ': ' + key + ': ' + data.items[i].value[key] + ' ' + data.items[i].units);
                    }
                }
                else
                    console.log( data.items[i].name + ': ' + data.items[i].value + ' ' + data.items[i].units);
            }
        }
        else {
            console.log('progress: ' + data.progress );
        }
    }
};


module.exports = {

        
        /**
         * Default (index) page handler
         */
        index: function (req, res) {
            
            res.view('status', {
                title: 'Status',
                data: {},
            });
        },
        

        statuspanel: function (req, res) {

            var stuffToRead = [
                PortManager.map.throttleValue,
                PortManager.map.pwm,
                PortManager.map.speed,
                ];
            

            PortManager.readRam(  stuffToRead, function( error, data ) {
                outputItems( error, data );
                 return res.json( data );
            } );


           
          
        },
        

        pwm: function (req, res) {
                PortManager.readRam(  PortManager.map.pwm, function( error, data ) {
                    outputItems( error, data );
                     return res.send( '&value=' + data.items[0].value );
                } );
          
        },

        volts: function (req, res) {
            return res.send( '&value=50');
                PortManager.readRam(  PortManager.map.volts, function( error, data ) {
                    outputItems( error, data );
                     return res.send( '&value=' + data.items[0].value );
                } );
          
        },

         current: function (req, res) {
            return res.send( '&value=50');
                PortManager.readRam(  PortManager.map.current, function( error, data ) {
                    outputItems( error, data );
                     return res.send( '&value=' + data.items[0].value );
                } );
          
        },

        temp: function (req, res) {

                PortManager.readRam( [PortManager.map.tempLo, PortManager.map.tempHi], function( error, data ) {
                    outputItems( error, data );
                     return res.send( '&value=' + data.items[0].value );
                } );
          
        },

       idiotpanel: function (req, res) {

                PortManager.readRam( [PortManager.map.targetPortB, PortManager.map.targetPortC], function( error, data ) {
                    outputItems( error, data );
//                     return res.send( '&value=' + data.items[0].value );

           var status = {
                    key: data.items[0].value.key,
                    brakeRelease: data.items[1].value.brakeRelease,
                    fault: false,
                    quickstop: data.items[1].value.quickstop,
                    forward: !data.items[1].value.reverse,
                    reverse: data.items[1].value.reverse,
                    indoor: data.items[0].value.indoor,
                    outdoor: !data.items[0].value.indoor,
                    
            };
            return res.json( status );

                } );
 
},
          

 
          
};

