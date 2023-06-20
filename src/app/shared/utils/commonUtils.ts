import moment from 'moment';

export class CommonUtils {

    public static removeEmptyValue (obj: any):any {
        if(!this.isEmpty(obj)){
            Object.keys(obj).forEach(key => {
                if (this.isEmpty(obj[key])) {
                    delete obj[key];
                }
            });
        }
        return obj;
    }

    public static isEmpty(value: any): boolean {
        if ( value === ''   ||
            value === null ||
            value === undefined ||
            ( value != null && typeof value === 'object' && !Object.keys(value).length )
        ) {
            return true;
        } else {
            return false;
        }
    }

    public static isUndefined(value: any) {
        return typeof value === 'undefined';
    }

    public static isNull(value: any) {
        return value === null;
    }

    public static isNullOrUndefined(value: any) {
        return value === null ||  value === undefined;
    }

    public static isFunction(value: any) {
        return typeof value === 'function';
    }

    public static isNumber(value: any) {
        return typeof value === 'number';
    }

    public static isString(value: any) {
        return typeof value === 'string';
    }

    public static isBoolean(value: any) {
        return typeof value === 'boolean';
    }

    public static isObject(value: any) {
        return value !== null && typeof value === 'object';
    }

    public static isNumberFinite(value: any) {
        return this.isNumber(value) && isFinite(value);
    }

    public static isVowel(letter: string): boolean {
        const vowels = ['a', 'e', 'i', 'o', 'u'];

        return vowels.indexOf(letter) !== -1;
    }

    public static ucFirst(text: string) {
        const [part, ...split] = text.split(/\s/g);

        const ucd = part
            .toLowerCase()
            .split(/(?=['|-])/g)
            .map(
                (word: any) =>
                    word.indexOf('-') + word.indexOf(`'`) > -2
                        ? word.slice(0, 2).toUpperCase() + word.slice(2)
                        : word.slice(0, 1).toUpperCase() + word.slice(1)
            )
            .join('');

        return [ucd, ...split].join(' ');
    }

    public static applyPrecision(num: number, precision: number) {
        if (precision <= 0) {
            return Math.round(num);
        }

        const tho = 10 ** precision;

        return Math.round(num * tho) / tho;
    }

    public static extractDeepPropertyByMapKey(obj: any, map: string): any {
        const keys = map.split('.');
        const head = keys.shift();

        return keys.reduce((prop: any, key: string) => {
            return !this.isUndefined(prop) && !this.isNull(prop) && !this.isUndefined(prop[key]) ? prop[key] : undefined;
        }, obj[head || '']);
    }

    public static extractDeepPropertyByParentMapKey(obj: any, map: string): any {
        const keys = map.split('.');
        const tail = keys.pop();
        const props = this.extractDeepPropertyByMapKey(obj, keys.join('.'));

        return { props, tail };
    }

    public static getKeysTwoObjects(obj: any, other: any): any {
        return [...Object.keys(obj), ...Object.keys(other)].filter((key, index, array) => array.indexOf(key) === index);
    }

    public static isDeepEqual(obj: any, other: any): any {
        if (!this.isObject(obj) || !this.isObject(other)) {
            return obj === other;
        }

        return this.getKeysTwoObjects(obj, other).every(
            (key: any): boolean => {
                if (!this.isObject(obj[key]) && !this.isObject(other[key])) {
                    return obj[key] === other[key];
                }
                if (!this.isObject(obj[key]) || !this.isObject(other[key])) {
                    return false;
                }

                return this.isDeepEqual(obj[key], other[key]);
            }
        );
    }

   public static byteCal(bytes: any): string {
        if (bytes === 0) {
        return '0 B';
      }
  
      let k = 1000,
          dm = 3,
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
   
    }

    public static nullToString(value: any): any {
        if ( value === ''   ||
            value === null ||
            value === undefined
        ) {
            
            return '';
        } else {
            return value;
        }
    }

    public static getSortList(sort: any, orgData: any) : any{

        Object.keys(sort).forEach(key => {

            if(sort[key] != undefined){
                if(sort[key] != ''){
                    orgData = orgData.filter((t) => t[key] == sort[key])
                }
            }
        })

        return orgData
    }

    public static getDate(value: any){
        const date = moment()
        
        if(value === 'now'){
            return date
        }else if(value === 'start'){
            return date.startOf('month')
        }else if(value === 'end'){
            return date.endOf('month')
        }
    }

    
    public static isFindString(str: any, strArray:any[]): any {

        let rtn = false;

        if (this.isEmpty(str)) {
			rtn = false;
		}

        if (this.isEmpty(strArray)) {
			rtn = false;
		}

        strArray?.map((arr)=>{
            if(str == arr){
                rtn = true;
            }
        })

        return rtn;
    }

    public static addComma(str:any): any {
        let result = str
        if(str != undefined){
            result = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
        }
        
        return result
    }

    public static formikValidationChk(param1, param2): any {
        return Boolean(param1 && param2);
    }

    public static formikValidationStyle(param1, param2): any {
        let className = '';

        if(Boolean(param1 && param2)) {
            className = 'p-invalid';
        }
        return className;
    }

    public static isTextEditorEmpty(value: any): boolean {
        
        if ( value === ''   ||
            value === null ||
            value === undefined ||
            ( value != null && typeof value === 'object' && !Object.keys(value).length ) ||
            ( value != null && typeof value === 'string' && value.trim().length == 0)
        ) {
            return true;
        } else if(value.length > 0){
            
            const text = value.replace(/(<([^>]+)>)/gi, '').trim()
                
            if(text.length == 0){
                return true;
            }

        }else {
            return false;
        }
    }

}



