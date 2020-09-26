import './font/font.css';
import './style.scss';
import popup from "./component/pop/index";
var list = document.querySelectorAll('#list li');
for (var i = 0; i < list.length; i++) {
    var ele = list[i];
    ele.addEventListener('click', function () {
        var _a = this.dataset, url = _a.url, title = _a.title;
        popup({
            width: '100%',
            height: '100%',
            title: title,
            position: 'center',
            mark: true,
        });
    });
}
