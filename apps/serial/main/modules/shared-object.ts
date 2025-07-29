import bindings from 'bindings';

const nativeffi = bindings('nativeaddon') as {
  getCurrentDatetime(): string;
  getInputParam(value: number): string;
};

export default nativeffi;
