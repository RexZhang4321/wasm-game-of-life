export class UniverseJs {

    constructor() {
        this._width = 200;
        this._height = 100;

        this._cells = new Uint8Array(Math.ceil(this._width * this._height / 8));

        for (let i = 0; i < this._width * this._height; i++) {
            if (Math.random() < 0.5) {
                this._set_bit(i, this._cells);
            }
        }
    }

    _get_index(row, col) {
        return row * this._width + col;
    }

    _get_bit(i, arr) {
        const nByte = Math.floor(i / 8);
        const nBit = 1 << (i % 8);
        return (arr[nByte] & nBit) === nBit;
    }

    _set_bit(i, arr) {
        const nByte = Math.floor(i / 8);
        const nBit = 1 << (i % 8);
        arr[nByte] = arr[nByte] | nBit;
    }

    _clear_bit(i, arr) {
        const nByte = Math.floor(i / 8);
        const mask = 0x7 ^ (1 << (i % 8));
        arr[nByte] = arr[nByte] & mask;
    }

    _count_neighbors(row, col) {
        let count = 0;
        const rowOffset = [this._height - 1, 0, 1];
        const colOffset = [this._width - 1, 0, 1];
        for (let ri in rowOffset) {
            for (let ci in colOffset) {
                if (ri == 1 && ci == 1) {
                    continue;
                }

                const neighbor_row = (row + rowOffset[ri]) % this._height;
                const neighbor_col = (col + colOffset[ci]) % this._width;
                const idx = this._get_index(neighbor_row, neighbor_col);
                count += this._get_bit(idx, this._cells);
            }
        }
        return count;
    }

    width() {
        return this._width;
    }

    height() {
        return this._height;
    }

    cells() {
        return this._cells;
    }

    toggle_cell() {

    }

    tick() {
        let next = new Uint8Array(Math.ceil(this._width * this._height / 8));

        for (let row = 0; row < this._height; row++) {
            for (let col = 0; col < this._width; col++) {
                const idx = this._get_index(row, col);
                const cell = this._get_bit(idx, this._cells);
                const living_neighbors = this._count_neighbors(row, col);

                if (cell === true) {
                    if (living_neighbors == 2 || living_neighbors == 3) {
                        this._set_bit(idx, next);
                    }
                } else {
                    if (living_neighbors == 3) {
                        this._set_bit(idx, next);
                    }
                }
            }
        }

        this._cells = next;
    }

}