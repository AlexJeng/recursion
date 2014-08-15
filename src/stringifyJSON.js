// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // your code goes here
  console.log(obj);
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
  else if (typeof obj === "object"){
  	console.log('object is an object');
  	var object = [];
  	var keys = []
  	var counter = 1;
  	var str = ""; 
  	var type = Function.prototype.call.bind( Object.prototype.toString );

  	// obj is an object
  	if (type(obj) === '[object Object]'){
  		console.log('is an object instead of an array');

  		if(_.isEmpty(obj)){ //Object is empty
  			console.log('object is empty');
  			return ('{}');  
  		} 
  		else {  //Object is not empty
  			


  			

  			return (recurseObject(obj, str));
  		}
  	}

  	//shouldn't be writing past here

  	else {
	  	//object is an array
		if(obj.length === 0){ 
			console.log('object is empty');
			return ('[' + obj + ']');  
		}

		else { //object is bigger than 1
			for (var i = 0; i < obj.length; i++){
				console.log('i is at ' + i);
				console.log(obj[i]);
				if (typeof obj[i] === "string"){
					console.log('obj i is a string and =' + obj[i]);
					object[i] = ['"' + obj[i] + '"'];
					console.log('object i ' + object[i]);
				}
				else if (typeof obj[i] === "number"){
					console.log('object i is a number');
					object[i] = obj[i];
					console.log('object i ' + object[i]);
				}
				else if (Object.prototype.toString.call(obj[i]) === '[object Array]' ){
					var tempArray = obj[i];
					var temp = ""; //I'm using a string instead of an array to use concat instead of push because push adds commas that I don't want to stringify
					var counter = 0;
					temp = temp.concat('[');
					console.log('object is an array: ' + temp);

					for(var j = 0; j < tempArray.length; j++){
						if(j !== 0){
							temp = temp.concat(','); //Don't want a commaa in the first array
						}
						if(Object.prototype.toString.call(tempArray[j]) === '[object Array]' ){
							console.log ('ARRAY IS IN ANOTHER ARRAY');
							//temp = temp.concat('[');
							//check to see if there's another array in the array
							
							var tempArr = tempArray[j][counter];
							if(tempArray[j][counter] !== undefined){  //either want to get into the while loop or into the else section. It uses very similar code, probably a better way to write this
								while(tempArray[j][counter] !== undefined){

									console.log('while loop traversing. counter =' + counter);
									temp = temp.concat('[');
									console.log('temp array j + counter ' + tempArray[j][counter]);

									if (tempArray[j][counter].length === 0){
										console.log('array is null');	
										temp = temp.concat('[' + tempArray[j] + ']');
									}
									else{
										console.log('else in while loop');
										temp = temp.concat('[' + '"' + tempArray[j] + '"' + ']');
									}
									counter++;
								}
							}
							else{
								if(typeof tempArray[j] === "string"){ 
										console.log('is a string');
										temp = temp.concat('[' + '"' + tempArray[j] + '"' + ']');
									}
									else if (tempArray[j].length === 0){
										console.log('array is null');	
										temp = temp.concat('[' + tempArray[j] + ']');
									}
									else{
										console.log('else of else');
										temp = temp.concat('[' + tempArray[j] + ']');
									}
								}
							
						}
					
						else{ 
							console.log('else');
							temp = temp.concat(tempArray[j]);
						}
					}
					while(counter > 0){
						temp = temp.concat(']');
						counter--;
					}
					temp = temp.concat(']');
					object[i] = temp;
				}
			}
			return ('[' + object + ']');
		}
	  }
	}
};

var recurseObject = function(obj, str){

	var newStr = str;
	var object = [];
  	var keys = []
  	var counter = 1;

  	var type = Function.prototype.call.bind( Object.prototype.toString );
  	newStr = newStr.concat('{');

  	for(var key in obj){
  		keys.push(key);
  	}

	for (var key in obj){
		
		console.log('key in object');
		object = obj[key];
		console.log('TYPE OF OBJ' + typeof object);
		newStr = newStr.concat('"' + key + '":');
		
		console.log ('object = ' + object);
		if(typeof object === "string"){
			newStr = newStr.concat('"');
			for (var property in object)
			{
				console.log('property in objects');
				newStr = newStr.concat(object[property])
				console.log(property + '<- property  object -->' + object[property])
				console.log('object' + object);
				console.log(str);
			}
			newStr = newStr.concat('"');
		}
		else if (typeof object === "boolean"){
			console.log('object is a bool');
			if (object) {
				newStr = newStr.concat('true');
			}
			else {
				newStr = newStr.concat('false');
			}
		}

		else if(object === null){ //object is null
			console.log('obj in obj is null');
			newStr = newStr.concat('null');
		}

		else if (typeof object === "object"){
			console.log('is recurisng');
			newStr = recurseObject(object, newStr);
		}

		console.log(' obj keys length ' + keys.length + 'counter length ' + counter );
		if(keys.length !== counter){
			newStr = newStr.concat (',');
			counter++;
		}
	}
	newStr = newStr.concat('}');
	console.log('newStr before return' + newStr);
  	return newStr;
};

