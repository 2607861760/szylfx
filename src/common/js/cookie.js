export function getCookie(c_name) //根据分隔符每个变量的值
    {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          var c_end = document.cookie.indexOf("^", c_start);
          if (c_end == -1)
            c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start,
            c_end));
        }
      }
      return "";
    }
export function   setCookie(c_name, n_value,p_name, p_value, expiredays) //设置cookie
    {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = c_name
              + "="
              + escape(n_value)
              + "^"
              + p_name
              + "="
              + escape(p_value)
              + ((expiredays == null) ? "" : "^;expires="
                      + exdate.toGMTString());
      // console.log(document.cookie);
    }
export function delCookie(c_name){
  setCookie(c_name,"",-1)
}