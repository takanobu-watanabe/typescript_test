// jest.polyfills.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { TextDecoder, TextEncoder } = require('node:util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { Request, Response } = require('undici');
global.Request = Request;
global.Response = Response;
