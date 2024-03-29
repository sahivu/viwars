
/**
 * Toast (https://github.com/itchief/ui-components/tree/master/toast)
 * Copyright 2020 - 2021 Alexander Maltsev
 * Licensed under MIT (https://github.com/itchief/ui-components/blob/master/LICENSE)
 * 
 * edited by @shokake
 **/
export class Toast {
    /**
     * 
     * @param {{title:string|false, text:string,theme:string, autohide:boolean, interval:int}} params 
     */
    constructor(params) {
        this._title = params['title'] === false ? false : params['title'] || 'Title';
        this._text = params['text'] || 'Message...';
        this._theme = params['theme'] || 'default';
        this._autohide = params['autohide'] && true;
        this._interval = +params['interval'] || 5000;
        this._create();
        this._el.addEventListener('click', (e) => {
            if (e.target.classList.contains('toast__close')) {
                this._hide();
            }
        });
        this._show();
    }
    _show() {
        this._el.classList.add('toast_showing');
        this._el.classList.add('toast_show');
        window.setTimeout(()=>this._el.classList.remove('toast_showing'));
        if (this._autohide) {
            setTimeout(() => this._hide(), this._interval);
        }
    }
    _hide() {
        this._el.classList.add('toast_showing');
        this._el.addEventListener('transitionend', () => {
                this._el.classList.remove('toast_showing');
                this._el.classList.remove('toast_show');
                this._el.remove();
            }, {
                once: true
        });
        const event = new CustomEvent('hide.toast', {
            detail: {
                target: this._el
            }
        });
        document.dispatchEvent(event);
    }
    _create() {
        const el = document.createElement('div');
        el.classList.add('toast');
        el.classList.add(`toast_${this._theme}`);

        const htmlHeader = this._title ? '' : `<div class="toast__header">${this._title}</div>`;
        const html = `${htmlHeader}<div class="toast__body">${this._text}</div><button class="toast__close" type="button"></button>`;
        el.innerHTML = html;
        if (!this._title) 
            el.classList.add('toast_message');
        Toast.Container.append(this._el = el);
    }
    static get Container() {
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.classList.add('toast-container');
            document.body.append(container);
        }
        return document.querySelector('.toast-container');
    }
}