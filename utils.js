Array.prototype.chunk = (maxGroupSize) => {
  var sets = [], chunks, i = 0;
  chunks = this.length / groupsize;

  while(i < chunks){
    sets[i] = this.splice(0,groupsize);
    i++;
  }
  return sets;
}
