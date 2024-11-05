class SushiExpress {
    constructor() {
        this.prodList = {};
        this.ordered = [];

        this.init();
    }

    init() {
        this.prodList = this.getProdList();
        this.addCheckbox();
        this.renderButtons();
        this.renderModal();
    }

    getProdList() {
        let prodList = {};
        document.querySelectorAll('.grid-item').forEach((item, index) => {
            let content = item.querySelector('.content');

            // build prod info
            const product_name = content.querySelector('p.product_name').innerText.split("\n");
            const product_img = content.querySelector('div.product_image img').src;
            prodList[`item_${index}`] = {
                id: `item_${index}`,
                name: {
                    tw: product_name[0],
                    en: product_name[1]
                },
                price: product_name[2],
                img: product_img
            };
        })
        return prodList;
    }

    getOrderedList() {
        return this.ordered.map(itemId => this.prodList[itemId]);
    }

    addCheckbox() {
        document.querySelectorAll('.grid-item').forEach((item, index) => {
            let content = item.querySelector('.content');

            // create checkbox
            let ele = document.createElement('div');
            ele.innerHTML = `<input type="checkbox" id="item_${index}" />`;
            content.prepend(ele);

            // listen to click event
            content.addEventListener('click', (e) => {
                const input = content.querySelector('input');
                const id = input.id;
                // toggle select and remove item from ordered list
                if (!input.checked) {
                    input.checked = true;
                    this.ordered.push(id);
                } else {
                    input.checked = false;
                    this.ordered = this.ordered.filter(value => value !== id);
                }

                document.querySelector('#list_ordered_items').innerHTML = this.renderOrderedList();
            })

            // add cursor style to each block
            content.style.cursor = 'pointer';
        })
    }

    renderButtons() {
        // ordered list button
        const list = document.createElement('button');
        list.id = 'ordered_list';
        list.innerHTML = `
            <span class="bi bi-list-ul"></span>
        `
        list.style.width = '40px';
        list.style.height = '40px';
        list.style.backgroundColor = 'grey';
        list.style.opacity = 0.7;
        // list.style.textAlign = 'center';
        list.style.display = 'flex';
        list.style.justifyContent = 'center';
        list.style.alignItems = 'center';
        list.style.color = 'white';
        list.style.fontSize = '1.3em';
        list.style.borderRadius = '50%';
        list.style.zIndex = '9999';
        list.style.position = 'fixed';
        list.style.bottom = '3%';
        list.style.left = '2%';

        list.dataset.toggle = 'modal';
        list.dataset.target = '#modal_ordered_list';
        // list.addEventListener('click', (e) => {
        //     // e.preventDefault();
        //     $('#modal_ordered_list').modal('show');
        // })
        document.querySelector('body').append(list);

        // fix back-to-top button icon
        const btt = document.querySelector('.glyphicon.glyphicon-chevron-up');
        btt.classList.add('bi');
        btt.classList.add('bi-chevron-up');
    }

    renderModal() {
        const modal = document.createElement('div');
        // modal.id = 'modal_ordered_list';
        modal.innerHTML = `
            <div class="modal fade" id="modal_ordered_list">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="display: flex;justify-content: space-between;align-items: center;">
                            <h5 class="modal-title" id="modalOrderedListLabel">已點餐項（<span id="ordered_list_count">0</span>）</h5>
                            <button type="button" class="btn btn-secondary btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x"></i></button>
                        </div>
                        <div class="modal-body">
                            <ul id="list_ordered_items" style="padding: 0;"></ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="sushiexpress.removeAllItems()">清除全部</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        document.querySelector('body').append(modal);
        modal.querySelectorAll('#modal_ordered_list button[data-bs-dismiss="modal"]').forEach(ele => {
            ele.addEventListener('click', (e) => {
                e.preventDefault();
                $('#modal_ordered_list').modal('hide');
            })
        })
        document.querySelector('#list_ordered_items').innerHTML = this.renderOrderedList();
    }

    renderOrderedList() {
        if (this.ordered.length === 0) {
            document.querySelector('#ordered_list_count').innerText = '0';
            return '<li>您還沒有點餐項</li>';
        }
        const orderedList = this.getOrderedList();
        document.querySelector('#ordered_list_count').innerText = orderedList.length;
        return orderedList.map(item => `<li>
            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                <div style="display: flex;justify-content: space-between;align-items: center; width: 100%">
                    <img src="${item.img}" style="width: 25%;height: 50px;border-radius: 50%;">
                    <span class="text-center" style="width: 50%; font-size: 1.2em;">${item.name.tw}</span>
                    <span style="width: 25%; font-size: 1.2em; text-align: right;">${item.price}</span>
                </div>
                <div style="display: flex;justify-content: space-between;align-items: center; width: 100%">
                    <button class="btn btn-outline-danger" style="width: 100%;" onclick="sushiexpress.removeItem('${item.id}')">移除</button>
                </div>
            </div>
        </li>`).join('<hr>');
    }

    removeItem(itemId) {
        this.ordered = this.ordered.filter(value => value !== itemId);
        document.querySelector(`input#${itemId}`).checked = false;
        document.querySelector('#list_ordered_items').innerHTML = this.renderOrderedList();
    }

    removeAllItems() {
        this.ordered = [];
        document.querySelectorAll('input').forEach(ele => ele.checked = false);
        document.querySelector('#list_ordered_items').innerHTML = this.renderOrderedList();
    }
}