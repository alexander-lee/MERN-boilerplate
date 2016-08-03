/*
  - Takes in an object and request object
  - Recursively sets properties in object to the same ones in the request object
  - Throws an Error if the property is not found (Defined in the Schema)
*/
var propertyHelper = function(object, request){
  _.each(request, function(value, property, body){
    if(property in object){
      //If the property you want to change itself is a JS Object (Not Empty), then recursively call the propertyHelper
      if(!_.isEmpty(value) && typeof value === 'object' && !Array.isArray(value)){
        propertyHelper(object[property], value)
      } 
      else {
        object[property] = value;
      }
    }
    else {
      throw "Property " + property + " was not found!";
    }
  });
}

module.exports = propertyHelper;
