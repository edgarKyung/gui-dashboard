const Matrix = (() => {
  function getTopIndex({ bin, width, height }) {
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        const cellIdx = i * width + j;
        if (bin[cellIdx] !== -1) {
          return i - 1;
        }
      }
    }
  }

  function getBottomIndex({ bin, width, height }) {
    for (let i = height - 1; i >= 0; i -= 1) {
      for (let j = 0; j < width; j += 1) {
        const cellIdx = i * width + j;
        if (bin[cellIdx] !== -1) {
          return i + 1;
        }
      }
    }
  }

  function getLeftIndex({ bin, width, height }) {
    for (let i = 0; i < width; i += 1) {
      for (let j = 0; j < height; j += 1) {
        const cellIdx = i + j * width;
        if (bin[cellIdx] !== -1) {
          return i - 1;
        }
      }
    }
  }

  function getRightIndex({ bin, width, height }) {
    for (let i = width - 1; i >= 0; i -= 1) {
      for (let j = 0; j < height; j += 1) {
        const cellIdx = i + j * width;
        if (bin[cellIdx] !== -1) {
          return i + 1;
        }
      }
    }
  }

  function getEdges({ bin, width, height }) {
    return {
      top: getTopIndex({ bin, width, height }),
      bottom: getBottomIndex({ bin, width, height }),
      left: getLeftIndex({ bin, width, height }),
      right: getRightIndex({ bin, width, height })
    };
  }

  function removePadding({ bin, width, height }, padding) {
    const edges = getEdges({ bin, width, height });
    const newWidth = (edges.right - edges.left + 2 * padding);
    const newHeight = (edges.bottom - edges.top + 2 * padding);
    const newBinSize = newWidth * newHeight;
    const newBin = new Array(newBinSize).fill(-1);
    for (let i = edges.top; i <= edges.bottom; i += 1) {
      for (let j = edges.left; j <= edges.right; j += 1) {
        newBin[(i - edges.top + padding) * newWidth + (j - edges.left + padding)] = bin[i * width + j];
      }
    }
    return {
      bin: newBin,
      width: newWidth,
      height: newHeight
    }
  }

  function rotaion({ bin, width, height }, radian, padding) {
    const cosValue = Math.cos(radian);
    const sinValue = Math.sin(-radian);
    const xCenter = width / 2;
    const yCenter = height / 2;

    const outputSquareX = [];
    outputSquareX.push(parseInt(xCenter + (0 - yCenter) * sinValue + (0 - xCenter) * cosValue));
    outputSquareX.push(parseInt(xCenter + (0 - yCenter) * sinValue + (width - xCenter) * cosValue));
    outputSquareX.push(parseInt(xCenter + (height - yCenter) * sinValue + (0 - xCenter) * cosValue));
    outputSquareX.push(parseInt(xCenter + (height - yCenter) * sinValue + (width - xCenter) * cosValue));
    const minX = Math.min(...outputSquareX);
    const maxX = Math.max(...outputSquareX);

    const outputSquareY = [];
    outputSquareY.push(parseInt(yCenter + (0 - yCenter) * cosValue - (0 - xCenter) * sinValue));
    outputSquareY.push(parseInt(yCenter + (0 - yCenter) * cosValue - (width - xCenter) * sinValue));
    outputSquareY.push(parseInt(yCenter + (height - yCenter) * cosValue - (0 - xCenter) * sinValue));
    outputSquareY.push(parseInt(yCenter + (height - yCenter) * cosValue - (width - xCenter) * sinValue));
    const minY = Math.min(...outputSquareY);
    const maxY = Math.max(...outputSquareY);

    const outputWidth = maxX - minX;
    const outputHeight = maxY - minY;
    const output = new Array(outputWidth * outputHeight).fill(-1);

    for (let y = minY; y < maxY; y += 1) {
      for (let x = minX; x < maxX; x += 1) {
        const orig_x = parseInt(xCenter + ((y) - yCenter) * sinValue + ((x) - xCenter) * cosValue);
        const orig_y = parseInt(yCenter + ((y) - yCenter) * cosValue - ((x) - xCenter) * sinValue);
        if ((orig_y >= 0 && orig_y < height) && (orig_x >= 0 && orig_x < width)) {
          output[(y - minY) * outputWidth + x - minX] = bin[orig_y * width + orig_x];
        }
      }
    }

    return removePadding({
      bin: output,
      width: outputWidth,
      height: outputHeight
    }, padding);
  }


  return {
    rotaion
  };

})();