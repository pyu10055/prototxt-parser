import * as prototxtParser from '../src/index';

describe('prototxtParser::parse', () => {
  
  it('parses input layer', () => {
    const input = `
    layer {
      name: "data"
      type: "Input"
      top: "data"
      input_param { shape: { dim: 10 dim: 3 dim: 227 dim: 227 } }
    }`;

    const actual = prototxtParser.parse(input);
    const expected: any = {
      layer: {
        name: "data",
        type: "Input",
        top: "data",
        input_param: { shape: { dim: [10, 3, 227, 227] } }
      }
    };

    expect(actual).toEqual(expected);
  });

  it('parses comments before layer', () => {
    const input = `
    # Comment Line 1 ({foo: bar})
    # Comment Line 2 ({foo: baz})
    layer {
      name: "data"
      type: "Input"
      top: "data"
      input_param { shape: { dim: 10 dim: 3 dim: 227 dim: 227 } }
    }`;

    const actual = prototxtParser.parse(input);
    const expected: any = {
      layer: {
        name: "data",
        type: "Input",
        top: "data",
        input_param: { shape: { dim: [10, 3, 227, 227] } }
      }
    };

    expect(actual).toEqual(expected);
  });

  it('parses conv layer', () => {
    const input = `
    layer {
      name: "conv1"
      type: "Convolution"
      bottom: "data"
      top: "conv1"
      convolution_param {
        num_output: 64
        kernel_size: 3
        stride: 2
      }
    }`;

    const actual = prototxtParser.parse(input);
    const expected: any = {
      layer: {
        name: "conv1",
        type: "Convolution",
        bottom: "data",
        top: "conv1",
        convolution_param: {
          num_output: 64,
          kernel_size: 3,
          stride: 2
        }
      }
    };

    expect(actual).toEqual(expected);
  });

  it('parses pool layer', () => {
    const input = `
    layer {
      name: "pool1"
      type: "Pooling"
      bottom: "conv1"
      top: "pool1"
      pooling_param {
        pool: MAX
        kernel_size: 3
        stride: 2
      }
    }`;

    const actual = prototxtParser.parse(input);
    const expected: any = {
      layer: {
        name: "pool1",
        type: "Pooling",
        bottom: "conv1",
        top: "pool1",
        pooling_param: {
          pool: "MAX",
          kernel_size: 3,
          stride: 2
        }
      }
    };

    expect(actual).toEqual(expected);
  });

  it('parses multiples layers', () => {
    const input = `
    name: "Net"
    layer {
      name: "data"
    }
    layer {
      name: "conv1"
    }
    layer {
      name: "pool1"
    }`;

    const actual = prototxtParser.parse(input);
    const expected: any = {
      name: "Net",
      layer: [
        { name: "data" },
        { name: "conv1" },
        { name: "pool1" }
      ]
    };

    expect(actual).toEqual(expected);
  });
});