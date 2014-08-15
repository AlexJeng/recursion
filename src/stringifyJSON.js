// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  console.log(obj);
  var str = "";
  var beg = "";
  var end = "";
  var counter = 0;
  var keys = [];


  if(typeof obj === "number"){
  	console.log('is a number');
  	return String(obj);
  }
  else if (obj === null){
  	console.log('object is null');
  	return "null";
  }
  else if (typeof obj === "undefined"){
  	console.log('object is undefined');
  	return "undefined";
  }
  else if(typeof obj === "boolean"){
  	console.log('object is a bool');
  	return obj ? "true" : "false";
  }
  else if (typeof obj === "string"){
  	console.log('object is a string');
  	return ('"' + obj + '"');
  }

  if(_.isArray(obj)){
 		beg = '[';
 		end = ']';
 	}

  else if(_.isObject(obj)){
  		beg = '{';
  		end = '}';

  		for(var key in obj){
  			keys.push(key);
  		}

  }

  if(_.isEmpty(obj)){
  	return (beg + end);
  }

   var length = obj.length;
  _.each(obj, function(item, index){
  	   console.log('index =' + index);
  	   console.log('item =' + item);
  	   //console.log('item[index] = ' + item[index]);
  	   console.log('key length' + keys.length);
  	   console.log('counter = ' + counter);
  	   if(item === undefined || typeof item === 'function'){
  	   	 return false;
  	   }

  	  if(index > 0 && index <= length-1){ //works only for arrays
  	  	str += (',');
  	  }
  	  else if(counter > 0 && counter < keys.length){
  	  	console.log('keys counter');
  	  	str += (',');
  	  }  	  
  	  counter ++;
  	  

  	  if(!_.isArray(obj)){
  	  	str += ('"' + index + '":');
  	  }
	  if(typeof item === "number"){
	  	console.log('is a number');
	  	return str += String(item);
	  }
	  else if (item === null){
	  	console.log('object is null');
	  	return str += "null";
	  }
	  else if (typeof item === "undefined"){
	  	console.log('object is undefined');
	  	return str += "undefined";
	  }
	  else if(typeof item === "boolean"){
	  	console.log('object is a bool');
	  	var itemBool = item ? "true" : "false";
	  	return str += itemBool;
	  }
	  else if (typeof item === "string"){
	  	console.log('object is a string');
	  	return str += ('"' + item + '"');
	  }
	  else if(Object.prototype.toString.call(item) === '[object Array]'){
	  	str += stringifyJSON(item);
	  	console.log('array within each');
	  }
	  else if (typeof item === 'object'){
	  	str += stringifyJSON(item);
	  }


	  
  	});
  	
  

  return (beg + str + end);
};



