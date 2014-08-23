// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var str = "";
  var beg = "";
  var end = "";
  var counter = 0;
  var keys = [];


  if(typeof obj === "number"){
  	return String(obj);
  }
  else if (obj === null){
  	return "null";
  }
  else if (typeof obj === "undefined"){
  	return "undefined";
  }
  else if(typeof obj === "boolean"){
  	return obj ? "true" : "false";
  }
  else if (typeof obj === "string"){
  	return ('"' + obj + '"');
  }

  if(_.isArray(obj)){ //if it's an array, set the end brackets
 		beg = '[';
 		end = ']';
 	}

  else if(_.isObject(obj)){ //otherwise set the object brackets
  		beg = '{';
  		end = '}';

  		for(var key in obj){ //create list of keys to find end of object
  			keys.push(key);
  		}
  }

  if(_.isEmpty(obj)){
  	return (beg + end);
  }

   var length = obj.length; //variable is set down here because it will exist at this point

  _.each(obj, function(item, index){

  	   if(item === undefined || typeof item === 'function'){ //used for objects that can be stringified 
  	   	 return false;
  	   }

  	  if(index > 0 && index <= length-1){ //works only for arrays
  	  	str += (',');
  	  }
  	  else if(counter > 0 && counter < keys.length){ 
  	  	str += (',');
  	  }  	  
  	  
  	  counter ++;
  	  
  	  if(!_.isArray(obj)){
  	  	str += ('"' + index + '":');
  	  }
	  if(typeof item === "number"){
	  	return str += String(item);
	  }
	  else if (item === null){
	  	return str += "null";
	  }
	  else if (typeof item === "undefined"){
	  	return str += "undefined";
	  }
	  else if(typeof item === "boolean"){
	  	var itemBool = item ? "true" : "false";
	  	return str += itemBool;
	  }
	  else if (typeof item === "string"){
	  	return str += ('"' + item + '"');
	  }
	  else if(Object.prototype.toString.call(item) === '[object Array]'){
	  	str += stringifyJSON(item);
	  }
	  else if (typeof item === 'object'){
	  	str += stringifyJSON(item);
	  }
  	});

  return (beg + str + end);
};



