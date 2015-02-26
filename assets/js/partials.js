/**
 * Client-side scripts that support view partials
 *
 *
 */

$(document).ready(function() {

    // idiotpanel partial
    $('#idiotpanel').each(function( index ) {
        
       // var domId = $this.id;
        
        $.getJSON( 'status/statusPanel', function(data, textStatus, jqXHR) {
                console.log( data);
              });

        window.setInterval( function() {
            $.getJSON( 'status/idiotPanel', function(data, textStatus, jqXHR) {
                var leds = [];
                
                if( data.key )
                    leds.push({ label: 'Key', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Key', color: 'green', state: 'off'});
                
                if( data.brakeRelease )
                    leds.push({ label: 'Brake Rel', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Brake Rel', color: 'red', state: 'on'});
 
                if( data.fault )
                    leds.push({ label: 'Fault', color: 'red', state: 'blink'});
                else
                    leds.push({ label: 'Fault', color: 'red', state: 'off'});
                
                if( data.quickstop )
                    leds.push({ label: 'Quickstop', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Quickstop', color: 'green', state: 'off'});

                if( data.forward )
                    leds.push({ label: 'Forward', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Forward', color: 'green', state: 'off'});

                if( data.reverse )
                    leds.push({ label: 'Reverse', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Reverse', color: 'green', state: 'off'});

                  if( data.indoor )
                    leds.push({ label: 'Indoor', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Indoor', color: 'green', state: 'off'});

                  if( data.outdoor )
                    leds.push({ label: 'Outdoor', color: 'green', state: 'on'});
                else
                    leds.push({ label: 'Outdoor', color: 'green', state: 'off'});

                $('#idiotpanel').html( ledGroup(leds )); 

                
            })
            .fail(function() {
                console.log( "error" );
              })

        }, 1000);
    });
    
    
    
});



/**
 * view/partials/outputpanel.ejs client side script to show and refresh the gauges
 */
