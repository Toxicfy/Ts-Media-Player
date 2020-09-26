var style = require('./popup.css');
var Popup = /** @class */ (function () {
    function Popup(settings) {
        this.settings = settings;
        this.settings = Object['assign']({
            width: "100%",
            height: "100%",
            title: "",
            position: "center",
            mask: true,
            content: function () {
            },
        }, this.settings);
        this.init();
    }
    Popup.prototype.init = function () {
        this.createTemplate(); // 创建模板
        this.createMark(); // 创建遮罩层
        this.handle(); // 绑定关闭事件
    };
    Popup.prototype.createTemplate = function () {
        this.container = document.createElement("div");
        this.container.style.width = this.settings.width;
        this.container.style.height = this.settings.height;
        this.container.className = style.popup;
        this.container.innerHTML = "\n            <div class=\"" + style['popup-title'] + "\">\n                <h3>" + this.settings.title + "</h3>\n                <i class=\"iconfont icon-guanbi\"></i>\n            </div>\n            <div class=\"" + style['popup-content'] + "\"></div>\n        ";
        document.body.appendChild(this.container);
    };
    Popup.prototype.handle = function () {
        var _this = this;
        var popupClose = this.container.querySelector("." + style['popup-title']);
        popupClose.addEventListener('click', function () {
            document.body.removeChild(_this.container);
            _this.settings.mask && document.body.removeChild(_this.mark);
        });
    };
    Popup.prototype.createMark = function () {
        this.mark = document.createElement('div');
        this.mark.className = style.mask;
        this.mark.style.width = '100vw';
        this.mark.style.height = document.body.offsetHeight + 'px';
        document.body.appendChild(this.mark);
    };
    return Popup;
}());
function popup(options) {
    return new Popup(options);
}
export default popup;
