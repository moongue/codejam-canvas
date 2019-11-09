window.addEventListener('DOMContentLoaded', () => {
    //Menu
    const menuToggle = document.querySelector('.ham');
    const dropDownMenu = document.querySelector('.drop-down-menu');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        dropDownMenu.classList.toggle('show');
    });

    //Toggle class list size
    let listSize = document.querySelectorAll('.panel-list');

    listSize.forEach((item => {
        item.addEventListener('click', (e) => {
            let target = e.target;
            let parent = target.closest('.panel-list');
            let item = parent.querySelectorAll('.panel-list__item');
            if (target.tagName === 'IMG') {
                let imgParent = target.closest('.panel-list__item');
                item.forEach((item) => {
                    item.classList.remove('panel-list__item_active');
                });
                imgParent.classList.add('panel-list__item_active');
            }
            if (target && target.classList.contains('panel-list__item')) {
                item.forEach((item) => {
                    item.classList.remove('panel-list__item_active');
                });
                target.classList.add('panel-list__item_active');
            }
        });
    }));

    //Canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const concat = (xs, ys) => xs.concat(ys);

    const hexToRGBA = hexStr => [
        parseInt(hexStr.substr(0, 2), 16),
        parseInt(hexStr.substr(2, 2), 16),
        parseInt(hexStr.substr(4, 2), 16),
        255
    ];

    let choose4x4 = document.getElementById('4x4');
    let choose32x32 = document.getElementById('32x32');
    let choose256x256 = document.getElementById('256x256');

    function show4x4() {
        fetch('../assets/data/4x4.json')
            .then(response => response.json())
            .then(commits => {

                const flattenedRGBAValues = commits
                    .reduce(concat)
                    .map(hexToRGBA)
                    .reduce(concat);

                canvas.width = canvas.height = 4;
                const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), 4, 4);
                ctx.putImageData(imgData, 0, 0);
            });
    }

    show4x4();

    function show32x32() {
        fetch('../assets/data/32x32.json')
            .then(response => response.json())
            .then(commits => {
                const flattenedRGBAValues = commits
                    .reduce(concat)
                    .reduce(concat);

                canvas.width = canvas.height = 32;
                const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), 32, 32);
                ctx.putImageData(imgData, 0, 0);
            });
    }

    function show256x256() {
        let img = new Image();
        img.addEventListener('load', () => {
            ctx.drawImage(img,0,0);
        });
        img.src="../assets/img/256x256.png";
        canvas.width = canvas.height = 256;
    }

    choose4x4.addEventListener('click', () => {
        show4x4()
    });

    choose32x32.addEventListener('click', () => {
        show32x32()
    });

    choose256x256.addEventListener('click', () => {
       show256x256();
    });

    //Size switcher
    const rangeSize = document.getElementById('switcher-size');
    const showSize = document.getElementById('show-size');

    rangeSize.addEventListener('input', (e) => {
       showSize.value = e.target.value;
       canvas.style.width = canvas.style.height = e.target.value + 'px';
    });
});