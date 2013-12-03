/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
  	var newArray = [];
  	if(n === undefined){
  		return array[0];
  	}else if(n > array.length){
  		return array;
  	}else{
  		for(var i = 0; i < n; i++){
  			newArray[i] = array[i];
  		}
  		return newArray;
  	}
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  	var newArray = [];
  	if(n === undefined){
  		return array.pop();
  	}else if(n > array.length){
  		return array;
  	}else{
  		for(var i = array.length - 1; i >= n - 1; i--){
  			if(n === 0){
  			    return [];
  			}else{
  			   newArray.push(array[i]);
  			}
  		}
  		return newArray.reverse();
  	}
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
 _.each = function(collection, iterator) {
 		if( Array.isArray(collection) ){
  	  	for (var i = 0; i < collection.length; i++){
   			iterator(collection[i], i, collection);
   			};
    }else{
    	for (var key in collection){
   	 	iterator(collection[key], key, collection);
    };
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var key = -1;
    var flag = 0;
    _.each(array, function (value, index, collection){
    		if(value === target){
    		  flag++;
    		  if(flag === 1)
    			key = index;
    		}
			
    	})
    	
    	return key;
    
    };
    
  //};

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
  	var arr = [];
  	  for (var i = 0; i < collection.length; i++){
  		if( iterator(collection[i]) ){
  			arr.push(collection[i]);
  		}
  	  }
  	return arr; 		

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var array = [];
    _.each(collection, function(value, index, collection){
    	if(iterator(value) === false){
    		array.push(value);
    	}
    	
    })
    return array;
    	
  };

  // Produce a duplicate-free version of the array.
_.uniq = function(array) {
  var dupeFree = [];
  dupeFree.push(array[0]);
  
  _.each(array, function(value, index, collection)
  	 {
  	   var flag = 0;

  		for(var i = 0; i < dupeFree.length; i++)
  		{
  			if(value === dupeFree[i]){
               flag++;
            }
  		}
  		 if(flag === 0){
          	dupeFree.push(value);
  	 	}
    	});

    return dupeFree;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(array, function(value, index, collection){
    	results.push(iterator(value));
    })
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  
  // var people = [
  //  {name : 'moe', age : 30},
  //    {name : 'curly', age : 50}  ];
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.

    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
 
  _.invoke = function(list, methodName, args) {
    
  	var isFunction = typeof methodName === 'function';

    return _.map(list, function(value){
  	// value is the actual value of each item in list (per _.each_)
    // in this case, each value is an array (since list is an array of arrays)
    return(isFunction ? methodName : value[methodName]).apply(value);
  		
  	});
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
    _.reduce = function(collection, iterator, initialValue) {
		
	if(!initialValue){
		previousValue = 0;
	}else{
    var previousValue = initialValue;
    }
    _.each(collection, function(value, index, collection){
      
    	previousValue = iterator(previousValue, value);
      	
    })
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


// Determine whether all of the elements match a truth test.
 // try using reduce
  _.every = function(collection, iterator) {
  	var truth = true;
  	if(!iterator){
       _.each(collection, function(value, index, collection){
       truth = (value && truth); 
  	   })
       if (truth !== true){
          return false ;
       }else {
    	  return truth;
       }
  	}else{
   	 truth = _.reduce(collection, function(testResults, item){
    	return testResults = iterator(item) && testResults;
    }, true)
    if (truth !== true) return false ;
    else return truth;
    }
  };



  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
    _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    
    // determine whether any of the elements pass a truth test.
    // get each element, compare it to a truth test
    // if any element passes, the some function should return true
    // *** compare each element to true
    // *** if any element is true and _.every returns false
    // *** then _.some should return true
    
    var flag = 0;
    var every = _.every(collection, iterator);
    
    
    _.each(collection, function(value, index, collection){
    
        if(value === true)
            flag++;
        if(value === ('yes' || 'true') )
            flag++;
        if(iterator){
        	if(iterator(value) === true )
            	flag++;
       	   
       	 }
    })
    if( (collection.length > 0) && every){
        return every;
    }else if( (flag ) && (!every) )
        return Boolean(true);
    else 
    	return Boolean (false);
        
    
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj, obj2, obj3) {
  
     var args = arguments;
     // for each object, we can assign each object's properties to the original object
     for(var i = 1; i < args.length; i++)
     {
       for(var prop in args[i])
       {
         obj[prop] = args[i][prop];
       }
       
     }
     
     return obj;
  
  
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj  beforeEach(function() {
  // options = {zero: 0, one: 1, empty: "", nan: NaN, string: "string"};
  // _.defaults(options, {zero: 1, one: 10, twenty: 20}, {empty: "full"}, {nan: "nan"}, {word: "word"}, {word: "dog"});
  // });
  // don't overwrite a key that already exists
  _.defaults = function(obj) {
    var args = arguments;
     // for each object, we can assign each object's properties to the original object
     for( var i = 1; i < args.length; i++)
     {
       for(var prop in args[i])
       {
         if(obj.hasOwnProperty(prop))
           obj[prop] = obj[prop];
         else
           obj[prop] = args[i][prop];
       }
      }
    
  };


  /**
   * FUNCTIONS
   * =========
   
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   
   _.once = function (func){
     var alreadyCalled = false;
     var result;
     
     return function(){
       if(!alreadyCalled){
         result = func.apply(this, arguments);
         alreadyCalled =  true;
       }
       return result;
     };
     
   };

   
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  
  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    
    return function(){
      
      var results = false;

      if(!results){
        results = func.apply(this, arguments);
        return results;
        }
      else
        return results;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
