/**
 * Created by yongmingjiang on 16/7/20.
 */
var Flock = function(n) {
    this.reoDeer = n;
};

Flock.prototype.conjoin = function(other){
    this.reoDeer += other.reoDeer;
    return this;
}

Flock.prototype.breed = function(other) {
    this.reoDeer = this.reoDeer * other.reoDeer;
    return this;
}


var conjoin = function(flock_x, flock_y) { return flock_x + flock_y };
var breed = function(flock_x, flock_y) { return flock_x * flock_y };

var flock_a = 4;
var flock_b = 2;
var flock_c = 1;

var result = conjoin(breed(flock_b, conjoin(flock_a, flock_c)), breed(flock_a, flock_b));
// //=>16
// var flock_a = new Flock(4);
// var flock_b = new Flock(2);
// var flock_c = new Flock(1);

// var result =
// flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).reoDeer;
console.log(result)