const style = require('./popup.css')

interface Ipopup {
    width?: string;
    height?: string;
    title?: string;
    position?: string;
    mark?: boolean;
    content?: (content: HTMLElement) => void
}

interface Icomponent {
    container: HTMLElement;
    init: () => void;
    createTemplate: () => void;
    handle: () => void
}

class Popup implements Icomponent {
    public container;
    public mark;

    constructor(private settings) {
        this.settings = Object['assign'](
            {
                width: "100%",
                height: "100%",
                title: "",
                position: "center",
                mask: true,
                content: function () {
                },
            },
            this.settings
        );
        this.init()
    }

    init() {
        this.createTemplate()// 创建模板
        this.createMark()// 创建遮罩层
        this.handle()// 绑定关闭事件
    }

    createTemplate() {
        this.container = document.createElement("div")
        this.container.style.width = this.settings.width
        this.container.style.height = this.settings.height
        this.container.className = style.popup

        this.container.innerHTML = `
            <div class="${style['popup-title']}">
                <h3>${this.settings.title}</h3>
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="${style['popup-content']}"></div>
        `
        document.body.appendChild(this.container)
        if (this.settings.postion === "left") {
            this.container.style.left = 0 + "px";
            this.container.style.top =
                window.innerHeight - this.container.offsetHeight + "px";
        } else if (this.settings.postion === "right") {
            this.container.style.right = 0 + "px";
            this.container.style.top =
                window.innerHeight - this.container.offsetHeight + "px";
        } else {
            this.container.style.left =
                (window.innerWidth - this.container.offsetWidth) / 2 + "px";
            this.container.style.top =
                (window.innerHeight - this.container.offsetHeight) / 2 + "px";
        }
    }

    handle() {
        let popupClose = this.container.querySelector(
            `.${style['popup-title']}`
        )
        popupClose.addEventListener('click', () => {
            document.body.removeChild(this.container)
            this.settings.mask && document.body.removeChild(this.mark)
        })
    }

    createMark() {
        this.mark = document.createElement('div')
        this.mark.className = style.mask
        this.mark.style.width = '100%'
        this.mark.style.height = document.body.offsetHeight + "px";
        document.body.appendChild(this.mark)
    }
}

function popup(options: Ipopup) {
    return new Popup(options)
}

export default popup
