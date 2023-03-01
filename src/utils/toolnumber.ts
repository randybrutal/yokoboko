/**
 * 金額格式化 - 每千位數加逗號
 * @param  {Number|String} num 欲格式化的數字
 * @param  {boolean} hasSymbol 是否有正號
 * @return {String}            格式化結果
 */
export function formatMoney(num: string | number = 0, hasSymbol = false) {
    if (Number.isNaN(+num)) return num;
    const symbol = +num > 0 ? '+' : '';
    const number = `${num}`.split('.');
    return `${hasSymbol ? symbol : ''}${`${number[0]}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${number[1] ? `.${number[1]}` : ''}`;
}

/**
 * 小數點到第二位
 * @param  {Number|String} num 欲格式化的數字
 * @return {String}            格式化結果
 */
export function formatOdds(num: any = 0) {
    if (typeof num === 'string') return num;
    return num.toFixed(2);
}

/**
 * 若是小於10則補0
 * @param {String} date 字串
 * @return {String} 字串
 */
function timePreFix(date: string | number) {
    if (+date < 10) {
        return `0${date}`;
    }
    return date;
}

export function getTimeString(timeObj: Date) {
    const hour = timeObj.getHours();
    const minute = timeObj.getMinutes();
    const second = timeObj.getSeconds();
    return `${timePreFix(hour)}:${timePreFix(minute)}:${timePreFix(second)}`;
}

/**
 * 格式化日期 2017-05-05 - 07:07:07
 * @param {Object} timeObj 時間物件
 * @param {Boolean} hasTime 是否有時分秒
 * @param {Boolean} hasDash 是否有減號
 * @return {String} 時間字串
 */
export function formatTime(timeObj: Date, hasTime = true, hasDash = false) {
    const year = timeObj.getFullYear();
    const month = timeObj.getMonth() + 1;
    const day = timeObj.getDate();
    const hour = timeObj.getHours();
    const minute = timeObj.getMinutes();
    const second = timeObj.getSeconds();
    if (hasTime) {
        return `${year}-${timePreFix(month)}-${timePreFix(day)}${hasDash ? ' - ' : ' '}${timePreFix(hour)}:${timePreFix(minute)}:${timePreFix(second)}`;
    }
    return `${year}-${timePreFix(month)}-${timePreFix(day)}`;
}

/**
 * 格式化日期 月份第一天 2017-05-01
 * @param {Object} timeObj 時間物件
 * @return {String} 時間字串
 */
export function formatDate1st(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = new Date(date.setDate(1)).getDate();

    return `${year}-${timePreFix(month)}-${timePreFix(day)}`;
}

/**
 * 格式化日期 2017-05-05 - 07:07:07
 * @param {Object} timeObj 時間物件
 * @param {Boolean} hasTime 是否有時分秒
 * @param {Boolean} hasDash 是否有減號
 * @return {String} 時間字串
 */
export function formatUTCTime(timeObj: Date, hasTime = true, hasDash = true) {
    const year = timeObj.getUTCFullYear();
    const month = timeObj.getUTCMonth() + 1;
    const day = timeObj.getUTCDate();
    const hour = timeObj.getUTCHours();
    const minute = timeObj.getUTCMinutes();
    const second = timeObj.getUTCSeconds();
    if (hasTime) {
        return `${year}-${timePreFix(month)}-${timePreFix(day)}${hasDash ? ' - ' : ' '}${timePreFix(hour)}:${timePreFix(minute)}:${timePreFix(second)}`;
    }
    return `${year}-${timePreFix(month)}-${timePreFix(day)}`;
}

/**
 * 把本地時間轉換為其他時區時間
 * @param {Number} timeZone 要轉過去的時區
 * @return {Number} 時間戳 此時間戳顯示出來的本地時間就是轉過去的時區時間
 */
export function getTimeLocal(timeZone: number, timeString = '') {
    let transTime = timeString ? new Date(timeString) : new Date();

    if (Number.isNaN(transTime.getTime())) {
        transTime = new Date();
    }
    // eslint-disable-next-line
    const GMTTime = transTime.getTime() + (transTime.getTimezoneOffset() * 60000);
    return GMTTime + (timeZone * 3600000);
}

/**
 * 把其他時區時間轉換為格林威治時間
 * @param {Number} timeZone timeObject的時區
 * @return {Number} 時間戳 用此時間戳call toISOString 就會得到timeObject所代表時區的格林威治時間
 */
export function getTimeGMT(timeZone: number, timeObject: Date) {
    const transTime = timeObject || new Date();
    // eslint-disable-next-line
    const GMTTime = transTime.getTime() - (transTime.getTimezoneOffset() * 60000);
    return GMTTime - (timeZone * 3600000);
}

/**
 * getAllUrlParams - 抓取所有url變數
 *
 * @param  {type} url 連結
 * @return {object}   變數物件
 */
export function getAllUrlParams(url: string) {
    const queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    const obj: any = {};
    if (queryString) {
        const querys = queryString.split('#')[0];
        const arr = querys.split('&');
        for (const item of arr) {
            const a = item.split('=');
            let paramNum = '';
            let paramName = a[0].replace(/\[\d*\]/, (v: any) => {
                paramNum = v.slice(1, -1);
                return '';
            });
            const paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            // 變數名稱皆轉小寫
            paramName = paramName.toLowerCase();
            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName][paramNum] = paramValue;
                }
            } else {
                obj[paramName] = paramValue;
            }
        }
    }
    return obj;
}

/**
 * 乘法
 * @param  {Number} arg1 乘數1
 * @param  {Number} arg2 乘數2
 * @return {Number}      乘數1 * 乘數2
 */
export function accMul(arg1: number, arg2: number) {
    let pow = 0;
    const arguments1 = arg1.toString();
    const arguments2 = arg2.toString();
    // eslint-disable-next-line
    try { pow += arguments1.split('.')[1].length; } catch (e) { }
    // eslint-disable-next-line
    try { pow += arguments2.split('.')[1].length; } catch (e) { }
    return Number(arguments1.replace('.', '')) * Number(arguments2.replace('.', '')) / 10 ** pow;
}

/**
 * 除法
 * @param  {Number} arg1 除數
 * @param  {Number} arg2 被除數
 * @return {Number}      除數 / 被除數
 */
export function accDiv(arg1: number, arg2: number) {
    let t1 = 0;
    let t2 = 0;
    // eslint-disable-next-line
    try { t1 = arg1.toString().split('.')[1].length; } catch (e) { }
    // eslint-disable-next-line
    try { t2 = arg2.toString().split('.')[1].length; } catch (e) { }
    const r1 = Number(arg1.toString().replace('.', ''));
    const r2 = Number(arg2.toString().replace('.', ''));
    return accMul(r1 / r2, 10 ** (t2 - t1));
}

export function sizeTransToBytes(sizeString = '') {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    for (const [index, size] of sizes.entries()) {
        if (~sizeString.indexOf(size)) {
            const sizeNumber = +sizeString.replace(size, '');
            return accMul(sizeNumber, 1024 ** index);
        }
    }
    return 0;
}

export function bytesTranslate(bytes = 0): string {
    const bytesLength = `${bytes}`.length;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const sizeBytesLength = [0, 4, 7, 10, 13];
    let sizeIndex = 0;

    while (sizeBytesLength[sizeIndex + 1] !== undefined
        && (bytesLength >= sizeBytesLength[sizeIndex + 1])
    ) {
        sizeIndex += 1;
    }
    return `${accDiv(bytes, 1024 ** sizeIndex).toFixed(2)}${sizes[sizeIndex]}`;
}

/**
 * 根據路徑設定屬性
 * @param {Object} target 設定屬性的目標
 * @param {string} path 屬性的路徑 => 'aaa.bbb.ccc'
 * @param {any} value 屬性的新值
 */
export function setPropertyByPath({ target, path, value }: { target: any; path: string; value: any }) {
    const pathArray = path.split('.');
    let findTarget = target;
    while (pathArray.length > 1) {
        // 如果路經中間遇到undefined, 就產生空物件
        if (findTarget[pathArray[0]] === undefined) {
            findTarget[pathArray[0]] = {};
        }
        findTarget = findTarget[pathArray.shift() as string];
    }
    findTarget[pathArray[0]] = value;
}

/**
 * 根據路徑取得屬性
 * @param {Object} target 取屬性的目標
 * @param {string} path 屬性的路徑 => 'aaa.bbb.ccc'
 * @return {any} 取到的屬性值, 若沒取到就是undefined
 */
export function getPropertyByPath({ target, path }: { target: any; path: string }) {
    const pathArray = path.split('.');
    let findTarget = target;
    try {
        while (pathArray.length > 0) {
            findTarget = findTarget[pathArray.shift() as string];
        }
        return findTarget;
    } catch (e) {
        // eslint-disable-next-line
        console.warn('從物件', target, `上取路徑'${path}'失敗`);
        return undefined;
    }
}

/**
 * 防抖函數 用法==> debounce(() => { func(args) })
 * @param {function} fn 要執行的函數
 * @param {Number} interval 延遲執行時間
 * @param {String} debounceName 防抖函式名稱
 */
export function debounce(fn: () => void, interval = 500, debounceName = '') {
    const w: any = window;

    if (!w.$_debounce_timer) {
        w.$_debounce_timer = {};
    }
    clearTimeout(w.$_debounce_timer[debounceName]);
    w.$_debounce_timer[debounceName] = setTimeout(fn, interval);
}

/**
 * 判斷時間大小並交換位置
 * @param  {String}   _startDate 時間字串1
 * @param  {String}   _endDate   時間字串2
 * @return {Array<String>}       時間字串陣列
 */
export function checkDate(startDate: string, endDate: string) {
    const startTimestamp = Date.parse(startDate.replace(/-/g, '/'));
    const endTimestamp = Date.parse(endDate.replace(/-/g, '/'));
    // 如果開始時間大於結束時間, 就把時間調換
    if (startTimestamp > endTimestamp) {
        return [endDate, startDate];
    }
    return [startDate, endDate];
}

/**
 * 將Promise物件重新包裝，回傳一個新的Promise，使其不管成功失敗都會回傳一個物件
 * 並利用物件的status來判斷結果
 * @param  {Promise} promiseObject Promise物件
 * @return {Promise} 重新包裝後的Promise，不管成功或失敗都會resolve一個物件
 */
export function asyncify<T = any>(promiseObject: Promise<T>): Promise<{
    status: boolean;
    response?: T;
    error?: any;
}> {
    return new Promise(resolve => {
        promiseObject
            .then((res: T) => {
                resolve({
                    status: true,
                    response: res
                });
            })
            .catch((e: any) => {
                resolve({
                    status: false,
                    error: e
                });
            });
    });
}

export function lightOrDark(color: any) {
    // Variables for red, green, blue values
    let r;
    let g;
    let b;
    let param = R.clone(color);

    // Check the format of the color, HEX or RGB?
    if (param.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        // eslint-disable-next-line no-param-reassign
        param = param.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        [, r, g, b] = param;
    } else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        param = +(`0x${param.slice(1).replace(
            param.length < 5 && /./g, '$&$&'
        )}`);

        // eslint-disable-next-line no-bitwise
        r = param >> 16;
        // eslint-disable-next-line no-bitwise
        g = param >> 8 & 255;
        // eslint-disable-next-line no-bitwise
        b = param & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(
        0.299 * (r * r)
        + 0.587 * (g * g)
        + 0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        return 'light';
    }
    return 'dark';
}

export const dateFormat = (dateString: string, type: 'start' | 'end') => {
    const dataObject = new Date(dateString.replace(/-/g, '/'));
    const setTime = {
        start: () => {
            dataObject.setHours(0, 0, 0, 0);
        },
        end: () => {
            dataObject.setHours(23, 59, 59, 0);
        },
        // before_time 多加一天
        before: () => {
            dataObject.setHours(23, 59, 59, 0);
            dataObject.setDate(dataObject.getDate() + 1);
        }
    };
    if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(dateString)) {
        (setTime[type] || setTime.start)();
    }
    dataObject.setTime(getTimeGMT(+8, dataObject));
    return dataObject.toISOString();
};
