/**
 * @name: Array数组拓展类
 */
Array.prototype.get = function(id: string): any {
  for (let i = 0; i < this.length; i++) {
    if (this[i].id === id)
      return this[i]
  }
  return null
}

Array.prototype.getIndexByKey = function(key: any, value: any): number {
  for (let i = 0; i < this.length; i++) {
    if (this[i][key] === value)
      return i;
  }
  return -1
}

Array.prototype.getByKey = function (key: any, value: any): any {
  for (let i = 0; i < this.length; i++) {
    if (this[i][key] == value)
      return this[i];
  }
  return null
}

Array.prototype.getByKeys = function(data1: any, data2: any): any {
  for (let i = 0; i < this.length; i++) {
    if (this[i][data1.key] == data1.value && this[i][data2.key] == data2.value)
      return this[i];
  }
  return null;
}

Array.prototype.getPrevByKey = function(key: any, value: any): any {
  for (let i = 0; i < this.length; i++) {
    if (this[i][key] === value)
      return this[i - 1];
  }
  return null;
}

Array.prototype.getNextByKey = function(key: any, value: any): any {
  for (let i = 0; i < this.length; i++) {
    if (this[i][key] === value)
      return this[i + 1];
  }
  return null;
}

Array.prototype.removeIndex = function(dx: number): Array<any> {
  if (isNaN(dx) || dx > this.length) {
    return this
  }
  for (let i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[dx]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
  return this
}

Array.prototype.remove = function(item: string): Array<any> {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      this.splice(i, 1);
      return this
    }
  }
  return this
}

Array.prototype.delete = function(id: string): Array<any> {
  for (let i = 0; i < this.length; i++) {
    if (this[i].id === id) {
      this.splice(i, 1);
      return this
    }
  }
  return this
}

Array.prototype.deleteByKey = function(key: any, value: any): Array<any> {
  for (let i = 0; i < this.length; i++) {
  if (this[i][key] === value) {
    this.splice(i, 1);
    return this
  }
}
return this
}

Array.prototype.clear = function(): Array<any> {
  this.splice(0 , this.length)
  return this
}

Array.prototype.replaceByKey = function(key:any, value: any, data:any): Array<any> {
  for (let i:number = 0; i < this.length; i++) {
    if (this[i][key] === value){
      this.splice(i,1,data)
      return this
    }
  }
  return this
}
export {}
