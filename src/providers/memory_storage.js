(function (_global) {
    "use strict";
    
    var MemoryStorage, MemoryStorageValidator;
    
    
    /**
     * MemoryStorageValidator
     */
    MemoryStorageValidator = (function () {
        /**
         * MemoryStorageValidator
         * 
         * @constructor
         */
        function MemoryStorageValidator () {}
        
        
        /** 
         * validateKey Method
         * 
         * @param {String} _query 
         */
        MemoryStorageValidator.validateKey = function (_key) {
            // undefined or null validation
            if (typeof _key === "undefined" || _key === null) {
                throw new Error("key parameter is required.");
            }

            // type validation
            if (typeof _key !== "string") {
                throw new Error("key parameter should be a string.");
            }
        };
        
        
        /**
         * validateValue Method
         * 
         * @param {Any} _value
         */
        MemoryStorageValidator.validateValue = function (_value) {
            // undefined validation
            if (typeof _value === "undefined") {
                throw new Error("value parameter is required.");
            }
        };


        /**
         * validateIndex Method
         * 
         * @param {Number} _index
         */
        MemoryStorageValidator.validateIndex = function (_index) {
            // undefined or null validation
            if (typeof _index === "undefined" || _index === null) {
                throw new Error("index parameter is required.");
            }

            // type validation
            if (typeof _index !== "number") {
                throw new Error("index parameter should be a number.");
            }
        };   
        
        
        return MemoryStorageValidator;
    })(); 
    
    
    /**
     * MemoryStorage
     */
    MemoryStorage = (function (_Validator) {
        var storage;
        
        /**
         * MemoryStorage
         * 
         * @constructor
         */
        function MemoryStorage () {}
        
        
        /**
         * storage Property
         * 
         * @private
         * @typeof object
         * @instanceof Array
         */
        storage = [];
        
        
        /**
         * length Property
         * 
         * @description Returns a number representing the number of data 
         * items stored in the Storage object.
         * @readOnly
         * @typeof number
         * @instanceof Number
         */
        Object.defineProperty(MemoryStorage, "length", {
            get: function () { return storage.length || 0; },
            enumerable: true,
            configurable: false
        });
        
        
        /**
         * getItem Method
         *
         * @description When passed a key name, will return that key's value.
         * @param {String} _key
         * @return {Object|Null} value
         */
        MemoryStorage.getItem = function (_key) {
            var result, i;

            try {
                _Validator.validateKey(_key);

                result = null;

                for (i = 0; i < storage.length; i++) {
                    if (MemoryStorage.key(i) === _key) {
                        result = storage[i].value;
                        break;
                    }
                }
            } catch (e) {
                console.error(e.message);
                result = null;
            } finally {
                return result;
            }   
        };


        /**
         * key method
         *
         * @description When passed a number n, this method will return the 
         * name of the nth key in the storage.
         * @param {Number} _index
         * @return {String|Null} result
         */
        MemoryStorage.key = function (_index) {
            var result;

            try {
                _Validator.validateIndex(_index);

                result = (storage[_index] && storage[_index].key) || null;
            } catch (e) {
                console.error(e.message);
                result = null;
            } finally {
                return result;
            }
        };


        /**
         * setItem Method
         * 
         * @description  When passed a key name and value, will add that key 
         * to the storage, or update that key's value if it already exists.
         * @param {String} _key
         * @param {Any} _value
         * @return {Number|Null} result
         */
        MemoryStorage.setItem = function (_key, _value) {
            var result;

            try {
                _Validator.validateKey(_key);
                _Validator.validateValue(_value);

                MemoryStorage.removeItem(_key);

                result = storage.push({ "key": _key, "value": _value });
            } catch (e) {
                console.error(e.message);
                result = null;
            } finally {
                return result;
            }
        };


        /**
         * removeItem Method
         * 
         * @description When passed a key name, will remove that key 
         * from the storage.
         * @param {String} _key
         * @return {Number|Null} result
         */
        MemoryStorage.removeItem = function (_key) {
            var result, i;

            try {
                _Validator.validateKey(_key);

                for (i = 0; i < storage.length; i++) {
                    if (MemoryStorage.key(i) === _key) {
                        storage.splice(i, 1);
                        break;
                    };
                }

                result = storage.length;
            } catch (e) {
                console.error(e.message);
                result = null;
            } finally {
                return result;
            }
        };
        
        
        /**
         * clear Method
         * 
         * @description When invoked, will empty all keys out of the storage.
         * Deletes everything in the "storage" array, which does hit other 
         * references.
         */
        MemoryStorage.clear = function () {
            storage.length = 0;
        };
        
                
        return MemoryStorage;
    })(MemoryStorageValidator || {});
    
    // Assigned to global object
    _global._memoryStorage = MemoryStorage;
    
})(window || {});