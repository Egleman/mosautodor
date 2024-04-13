const helpersFunc = () => {
    const calcScroll = () => {
        let div = document.createElement('div');
        div.style.width = '500px';
        div.style.height = '500px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    const blockBody = () => {
        const body = document.body;
        body.style.overflowY = 'hidden';
        body.style.touchAction = 'none';
        const bodyScroll = calcScroll();
        body.style.paddingRight = `${bodyScroll}px`;
    }
    const unBlockBody = () => {
        const body = document.body;
        body.style.overflowY = 'auto';
        body.style.touchAction = 'auto';
        body.style.paddingRight = `0`;
    }
    const closeModalActions = (modal) => {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.classList.add('close');
            setTimeout(() => {
                if (modal.classList.contains('close')) {
                    modal.classList.remove('close')
                }
            }, 600)
            unBlockBody();
        }
    }
    return {
        calcScroll,
        blockBody,
        unBlockBody,
        closeModalActions
    }
}
const { blockBody, closeModalActions } = helpersFunc();
const maskedInputs = () => {
    const phoneInputs = document.querySelectorAll('[data-input="masked"]');
    const im = new Inputmask({
        mask: '(+7|8) (999) 999-99-99',
        showMaskOnHover: false,
        showMaskOnFocus: false,
        jitMasking: true,
        inputmode: 'tel'
    })
    phoneInputs.forEach(input => {
        im.mask(input);
    })
}
const header = () => {
    const headerBurgerBtn = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.mobile-menu__close');
    headerBurgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        blockBody();
    })

    closeMenuBtn.addEventListener('click', () => {
        closeModalActions(mobileMenu);
    })
    mobileMenu.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu__body')) {
            closeModalActions(mobileMenu);
        }
    })

}
const accordions = () => {
    class Accordion {
        constructor(target, config) {
            this._el = typeof target === 'string' ? document.querySelector(target) : target;
            const defaultConfig = {
                alwaysOpen: true,
                duration: 350
            };
            this._config = Object.assign(defaultConfig, config);
            this.addEventListener();
        }
        addEventListener() {
            this._el.addEventListener('click', (e) => {
                const elHeader = e.target.closest('.accordion__header');
                if (!elHeader) {
                    return;
                }
                this.toggle(elHeader.parentElement);
            });
        }
        show(el) {
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style.display = 'block';
            const height = elBody.offsetHeight;
            elBody.style.height = 0;
            elBody.style.overflow = 'hidden';
            elBody.style.transition = `height ${this._config.duration}ms ease`;
            elBody.classList.add('collapsing');
            el.classList.add('accordion__item_slidedown');
            elBody.offsetHeight;
            elBody.style.height = `${height}px`;
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                el.classList.remove('accordion__item_slidedown');
                elBody.classList.add('collapse');
                el.classList.add('accordion__item_show');
                elBody.style.display = '';
                elBody.style.height = '';
                elBody.style.transition = '';
                elBody.style.overflow = '';
            }, this._config.duration);
        }
        hide(el) {
            const elBody = el.querySelector('.accordion__body');
            if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
                return;
            }
            elBody.style.height = `${elBody.offsetHeight}px`;
            elBody.offsetHeight;
            elBody.style.display = 'block';
            elBody.style.height = 0;
            elBody.style.overflow = 'hidden';
            elBody.style.transition = `height ${this._config.duration}ms ease`;
            elBody.classList.remove('collapse');
            el.classList.remove('accordion__item_show');
            elBody.classList.add('collapsing');
            window.setTimeout(() => {
                elBody.classList.remove('collapsing');
                elBody.classList.add('collapse');
                elBody.style.display = '';
                elBody.style.height = '';
                elBody.style.transition = '';
                elBody.style.overflow = '';
            }, this._config.duration);
        }
        toggle(el) {
            el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
        }
    }
    document.querySelectorAll('.accordion').forEach(accordion => {
        new Accordion(accordion, {
            alwaysOpen: false
        });
    })
}
const filterListeners = () => {
    const filterVacancy = document.querySelector('.vacancys__filters');
    if (filterVacancy) {
        const openBtnFilter = document.querySelector('.vacancys__button');
        const closeBtnFilter = document.querySelector('.vacancys__filters-close');
        const showMoreButttons = document.querySelectorAll('.vacancys__filters-button');
        const hiddenContents = document.querySelectorAll('.vacancys__filters-block');
        openBtnFilter.addEventListener('click', (e) => {
            e.preventDefault();
            filterVacancy.classList.add('active');
            blockBody();
        })
        closeBtnFilter.addEventListener('click', () => {
            closeModalActions(filterVacancy);
        })
        showMoreButttons.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                hiddenContents[index].querySelectorAll('[data-label="hidden"]').forEach(label => {
                    if (label.classList.contains('hidden')) label.classList.remove('hidden')
                })
            link.style.display = 'none';
            })
        })
    }
}
header();
maskedInputs();
accordions();
filterListeners();