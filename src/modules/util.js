/**
 * Created on 2018/6/21.
 */
/**
 * 将URL查询参数转换为Object
 * @param str：可选参数，如果不传入默认解析当前页面查询参数
 * @returns {{object}}
 */
exports.url2Obj = function (str) {
    if (!str) {
        //单页面 hash 模式下 search ='';
        str = location.search || location.hash || location.href;
    }

    var query = {};

    str.replace(/([^?&=]*)=([^?&=]*)/g, function (m, a, d) {
        if (typeof query[a] !== 'undefined') {
            query[a] += ',' + decodeURIComponent(d);
        } else {
            query[a] = decodeURIComponent(d);
        }
    });

    return query;
}