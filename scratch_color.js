const fs = require('fs');

// We will just read the file as raw binary, but it's a PNG so we need to parse it.
// Since we don't want to install extra packages, we can't easily parse PNG without a library.
// Wait, I can install `node-vibrant` or `get-pixels` in a scratch directory.
