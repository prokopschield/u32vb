class u32vb {
	u32: Uint32Array;
	size: number;
	constructor(size: number, from?: Uint32Array) {
		this.size = size;
		this.u32 = from || new Uint32Array(Math.ceil(size / 32));
	}
	get(p: number) {
		return (this.u32[p >> 5] >> (p & 31)) & 1;
	}
	set_true(p: number) {
		this.u32[p >> 5] |= 1 << (p & 31);
	}
	set_false(p: number) {
		this.u32[p >> 5] &= 0xffffffff - (1 << (p & 31));
	}
	get count(): number {
		let r = 0;
		for (let n of this.u32) {
			while (n) {
				r += n & 1;
				n >>= 1;
			}
		}
		return r;
	}
}

export default u32vb;
module.exports = u32vb;
