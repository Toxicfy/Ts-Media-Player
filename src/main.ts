import './font/font.css'
import './style.scss'
import popup from "./component/pop/index";

const list = document.querySelectorAll('#list li')

for (let i = 0; i < list.length; i++) {
    const ele = list[i]
    ele.addEventListener('click', function () {
        const {url, title} = this.dataset
        popup({
            width: "880px",
            height: "556px",
            title,
            position: 'center',
            mark: true,
        })
    })
}
