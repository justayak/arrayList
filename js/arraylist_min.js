(function(){var b=function(){};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports.ArrayList=b):this.ArrayList=b;b.VERSION="0.0.1";b=b.Int=function(a){this.size=this.__pointer=0;this.capacity=a||5;a=new ArrayBuffer(4*this.capacity);this.array=new Int32Array(a)};b.prototype.grow=function(){this.capacity*=2;var a=new ArrayBuffer(4*this.capacity);(new Int32Array(a)).set(this.array)};b.prototype.at=function(a,b){if("undefined"===typeof b)return this.array[a];
    this.array[a]=b;a+1>this.size&&(this.size=a+1);this.__pointer=a+1;return this};b.prototype.add=function(a){this.size===this.capacity&&this.grow();this.array[this.__pointer++]=a;this.size++};b.prototype.remove=function(a){for(;a<this.size;a++)this.array[a]=this.array[a+1];this.size--;this.__pointer--};b.prototype.forEach=function(a){for(var b=0;b<this.size;b++)a(this.array[b],b)}}).call(this);