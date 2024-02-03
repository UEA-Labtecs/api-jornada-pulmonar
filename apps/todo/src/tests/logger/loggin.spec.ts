import { logger } from "./logger";

describe('Logger', () => {
  let originalConsoleLog: typeof console.log;

  beforeAll(() => {
    originalConsoleLog = console.log;
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  it('should log a message with context', () => {
    const context = 'TestContext';
    const message = 'TestMessage';
    logger.log(message, context);

    expect(console.log).toHaveBeenCalledWith(`${context}: ${message}`);
  });

  it('should log multiple messages with context', () => {
    const context = 'TestContext';
    const messages = ['Message1', 'Message2', 'Message3'];
    messages.forEach((message) => logger.log(message, context));

    messages.forEach((message) => {
      expect(console.log).toHaveBeenCalledWith(`${context}: ${message}`);
    });
  });
});
