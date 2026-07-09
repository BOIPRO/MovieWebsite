function _0x334cc6(_0x166d5f) {
    try {
        var _0x12d788;
        var _0x318b75 = avsDomain || [];
        var _0x4e546f = false;
        for (var _0x10ea81 = 0; _0x10ea81 < _0x318b75.length; _0x10ea81++) {
            var _0x2804df = _0x318b75[_0x10ea81];
            var _0x59a743 = '';
            for (var _0x41273d = 0; _0x41273d < _0x2804df.length; _0x41273d++) {
                _0x59a743 += String.fromCharCode(_0x2804df[_0x41273d]);
            }
        }
        if (_0x4e546f) {
            _0x12d788 = 127;
        } else {
            var _0xb57ed = 0;
            var _0x1b6186 = Math.min(_0xf0ed39.length, 8);
            for (var _0x3b2550 = 0; _0x3b2550 < _0x1b6186; _0x3b2550++) {
                _0xb57ed += _0xf0ed39.charCodeAt(_0x3b2550);
            }
            _0x12d788 = 127 + _0xb57ed;
        }
        return _0x166d5f.slice(_0x12d788);
    } catch (_0x4a65a2) {
        return _0x166d5f.slice(127);
    }
}
function SliceData(_0x577c43) {
    try {
        var _0x54865c;
        var _0x1247cc = _0x577c43 && _0x577c43;
        if (_0x1247cc) {
            _0x54865c = _0x334cc6(new Uint8Array(_0x1247cc));
            _0x577c43 = _0x54865c.buffer.slice(_0x54865c.byteOffset, _0x54865c.byteOffset + _0x54865c.byteLength);
            return _0x577c43
            // } else if (null != _0x1247cc.byteLength) {
            //     console.log("Vao day roi")
            //     _0x54865c = _0x334cc6(_0x1247cc);
            //     _0x577c43 = _0x54865c;
            //     console.log(_0x577c43.data)

            // }
        }
    } catch (_0x365d3c) {
        console.log(_0x365d3c)
    }
}
export default SliceData