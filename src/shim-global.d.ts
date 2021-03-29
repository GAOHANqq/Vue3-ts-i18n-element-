export {}
declare global {
  interface Window{
  }
  interface Array<T> {
    get(id:string): any;
    getByKey(key: any, value: any): any;
    getByKeys(data1: any, data2: any): any;
    getPrevByKey(key: any, value: any): any;
    getIndexByKey(key: any, value: any): number;
    getNextByKey(key: any, value: any): any;
    removeIndex(dx: number): Array<any>;
    remove(value:string):Array<any>;
    delete(id: string): Array<any>;
    deleteByKey(key: any, value: any): Array<any>;
    clear(): Array<any>;
    replaceByKey(key:any,value:any, data:any): Array<any>;
  }
}
