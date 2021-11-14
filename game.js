(function () {
  // Строим модель.
  const fifteen = {
    emptyEl: null,
    cellSize: 100,
    rows: 4,
    elMap: new Map(),
    order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    boxSize: function(){ return this.cellSize * this.rows},
    createTable: function () {
      for (let i = 0; i < this.order.length; i++) {
        const div = document.createElement('div');
        div.style.cssText =
          `border:solid 1px;
      position:absolute;
      width:${this.cellSize}px;
      height:${this.cellSize}px;
      display:flex;
      align-items: center;
      justify-content: center;
      font-size:36px;
      font-weight:bold;
      font-family: sans-serif;
      transition: all .3s;
      index:1;
      background-color: #fff;
      cursor:pointer;`;
        div.textContent = this.order[i];

        if (this.order[i] === 0) {
          div.textContent = '';
          div.style.index = '0';
          this.emptyEl = div;
        };
        box.appendChild(div);
      }
    },
    swapHendler: function (e) {
      const elem = e.target;

      if (elem.parentNode === box) {
        const elPosition = fifteen.elMap.get(elem);
        const emptyPosition = fifteen.elMap.get(fifteen.emptyEl);
        const diffX = elPosition.x - emptyPosition.x;
        const diffY = elPosition.y - emptyPosition.y;
        const canMove = Math.abs(diffX) + Math.abs(diffY) > 100;

        if (canMove) {
          return false
        };
        elem.style.top = emptyPosition.y + 'px';
        elem.style.left = emptyPosition.x + 'px';
        fifteen.emptyEl.style.top = elPosition.y + 'px';
        fifteen.emptyEl.style.left = elPosition.x + 'px';
        fifteen.elMap.set(elem, { i: emptyPosition.i, x: emptyPosition.x, y: emptyPosition.y });
        fifteen.elMap.set(fifteen.emptyEl, { i: elPosition.i, x: elPosition.x, y: elPosition.y });
      };
    },
    draw: function () {
      const sortedArr = fifteen.order.sort(function () { return Math.random() - .5; });

      if (!fifteen.solvable(sortedArr)) fifteen.swap(0, 1, sortedArr);

      for (let i = 0; i < sortedArr.length; i++) {
        const tile = box.childNodes[(sortedArr[i])]
        const x = i % this.rows;
        const y = Math.floor(i / this.rows);
        this.elMap.set(tile, { i: i, x: x * this.cellSize, y: y * this.cellSize });
        tile.style.top = `${y * this.cellSize}px`;
        tile.style.left = `${x * this.cellSize}px`;
      };
    },
    //замена элементов если не решаем
    swap: function (i1, i2, arr) { const t = arr[i1]; arr[i1] = arr[i2]; arr[i2] = t; },
    // проверка на решаемость
    solvable: function (a) {
      let kDisorder = 0;
      const len = a.length - 1;

      for (let i = 1; i < len; i++)
        for (let j = i - 1; j >= 0; j--) if (a[j] > a[i]) kDisorder++;
      return !(kDisorder % 2);
    }
  };

  const box = document.body.appendChild(document.createElement('div'));
  box.style.cssText = `border:solid 1px; position:relative; height:${fifteen.boxSize()}px; width:${fifteen.boxSize()}px; box-sizing: content-box;`;
  box.addEventListener('click', fifteen.swapHendler);
  fifteen.createTable();
  fifteen.draw();
})();
