// 判断是否含有特殊字符
function isSpecial(str: string) {
    const specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\]<>/?~！%#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
    for (let i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
            return false;
        }
    }
    return true;
}

export default {
    isSpecial
};
