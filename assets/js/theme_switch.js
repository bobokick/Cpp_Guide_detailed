
/*
    给定当前状态和状态序列，获取下一个状态。
*/
function get_next_status(crt_status, status_list) {
    crt_status_index = status_list.indexOf(crt_status);
    return status_list[(crt_status_index + 1) % status_list.length];
}

/*
    主题显示名称字典
*/
var theme_display_dict = {
    light: "明亮",
    dark: "黑暗"
};
/*
    主题序列
*/
var theme_id_array = ["light", "dark"];
/*
    用于记录跟踪当前主题的键名。
*/
var theme_id_key_name = "current_theme_id";

/*
    给定主题id设置网页的主题以及更新相应的主题跟踪记录。
*/
function set_theme(crt_theme_id, theme_switch_button_obj, theme_name_obj) {
    jtd.setTheme(crt_theme_id);
    sessionStorage.setItem(theme_id_key_name, crt_theme_id);
    theme_switch_button_obj.setAttribute("theme_id", crt_theme_id);
    theme_name_obj.innerHTML = theme_display_dict[get_next_status(crt_theme_id, theme_id_array)];
}

/*
    给定当前主题id设置下一个网页的主题以及更新相应的主题跟踪记录。
*/
function set_next_theme(crt_theme_id, theme_switch_button_obj, theme_name_obj) {
    next_theme_id = get_next_status(crt_theme_id, theme_id_array);
    set_theme(next_theme_id, theme_switch_button_obj, theme_name_obj);
}

/*
    给定主题操作函数来进行主题设置。
*/
function theme_setter(setter_function) {
    var crt_theme_id = sessionStorage.getItem(theme_id_key_name);
    var button_obj = document.getElementById("theme_switch_button");
    var name_obj = document.getElementById("current_theme_name");
    setter_function(crt_theme_id, button_obj, name_obj);
}

/*
    根据当前主题创建主题跟踪记录/根据主题跟踪记录设置主题。
*/
if (!sessionStorage.getItem(theme_id_key_name)) {
    sessionStorage.setItem(theme_id_key_name, document.getElementById("theme_switch_button").getAttribute("theme_id"));
}
else
    theme_setter(set_theme);

/*
    主题切换函数，用于切换按钮的切换实现。
*/
function switch_theme() {
    theme_setter(set_next_theme);
}
