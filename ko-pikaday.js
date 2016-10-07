// ------------------ ko Custom pikaday Binding -------------------------

    ko.bindingHandlers.pikaday = {
        init: function(element, valueAccessor, allBindings){     
            var minDate = ko.unwrap(allBindings.get('minDate')) || null,
                maxDate = ko.unwrap(allBindings.get('maxDate')) || null,
                disableWeekends = ko.unwrap(allBindings.get('disableWeekends')) || null;
            
            // use valueAccessor().pikstore to store the pikaday object on the observable
            // where it can be read in the update callback and in the viewmodel
            // Note: using valueAccessor.pikstore would store pikaday object on the valueAccessor.  
            //       the object would still be available to the update callback of the binding
            //       but not in the viewmodel
            valueAccessor().pikstore = new Pikaday({ field: element,
                                                     minDate: minDate,
                                                     maxDate: maxDate,
                                                     disableWeekends: disableWeekends,
                                                     onSelect: function(d) { valueAccessor()(d); },
                                                     onClose: function() { var el = element; 
                                                                           // null out observable value if element is cleared
                                                                           if ( el.value == '' ) {   
                                                                               valueAccessor()(null);
                                                                           }
                                                                         }
                                                  });
        },
        update: function(element, valueAccessor, allBindings) {

               var valueUnwrapped = ko.unwrap(valueAccessor());

               valueAccessor().pikstore.setDate(valueUnwrapped);
 
           } 
       };

 
