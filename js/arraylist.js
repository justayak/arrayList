(function(){

    var IntByteSize = 4;
    //var DoubleSize = 8;
    var GrowFactor = 2;

    var root = this;

    var ArrayList = function(){

    };

    if (typeof  exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports){
            exports = module.exports = ArrayList;
        }
        exports.ArrayList = ArrayList;
    }else{
        root.ArrayList = ArrayList;
    }

    ArrayList.VERSION = '0.0.1';

    var IntList = ArrayList.Int = function(size){
        this.__pointer = 0;
        this.size = 0;
        this.capacity = size || 5;
        var buffer = new ArrayBuffer(this.capacity * IntByteSize);
        this.array = new Int32Array(buffer);
    };

    IntList.prototype.grow = function(){
        this.capacity = this.capacity * GrowFactor;
        var buffer = new ArrayBuffer((this.capacity) * IntByteSize);
        var array = new Int32Array(buffer);
        array.set(this.array);
        this.array = array;
    };

    IntList.prototype.at = function(index, value){
        if (typeof value === 'undefined'){
            return this.array[index];
        }else{
            this.array[index] = value;
            if ((index + 1) > this.size) this.size = index + 1;
            this.__pointer = index + 1;
            return this;
        }
    };

    IntList.prototype.add = function(value){
        if (this.size === this.capacity){
            this.grow();
        }
        this.array[this.__pointer++] = value;
        this.size++;
    };

    IntList.prototype.remove = function(index){
        for (var i = index; i < this.size; i++){
            this.array[i] = this.array[i + 1];
        }
        this.size--;
        this.__pointer--;
    };

    /**
     * @param callback {function} item, index
     */
    IntList.prototype.forEach = function(callback){
        for(var i = 0; i < this.size; i++){
            callback(this.array[i], i);
        }
    };

    var IntMatrix = ArrayList.IntMatrix = function(w,h){
        var buffer = new ArrayBuffer(w*h*IntByteSize);
        this.data = new Int32Array(buffer);
        this.width = w;
        this.height = h;
    };

    IntMatrix.prototype.get = function(x,y){
        return this.data[ (y * this.width) + x ];
    };

    IntMatrix.prototype.set = function(x,y, value){
        this.data[ (y * this.width) + x ] = value;
        return this;
    };

    IntMatrix.prototype.setField = function(x,y,w,h, value){
        for (var Y= 0;Y<h; Y++){
            for (var X = 0; X < w; X++){
                this.data[((y + Y) * this.width) + (x + X)] = value;
            }
        }
        return this;
    };

    IntMatrix.prototype.checkForValue = function(x,y,width,height, value){
        var ret = {
            hasValue : false,
            positions : []
        };
        for (var h = 0; h < height; h++){
            for (var w = 0;w<width;w++){
                if(this.get(x+w,y+h)===value){
                    ret.hasValue = true;
                    ret.positions.push({x : (x+w), y : (y+h)});
                }
            }
        }
        return ret;
    };

    // TODO impl

    /*var DoubleArray = ArrayList.Double = function(size){
        this.__pointer = 0;
        this.size = 0;
        this.__fillLevel = size || 5;
        var buffer = new ArrayBuffer(this.__fillLevel * DoubleSize);
        this.array = new Float64Array(buffer);
    };

    DoubleArray.prototype.grow = grow;*/


}).call(this);