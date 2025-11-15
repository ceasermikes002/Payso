// Mock implementation for thread-stream to avoid build issues
module.exports = function threadStream() {
  return {
    write: function() {},
    end: function() {},
    on: function() { return this; },
    once: function() { return this; },
    emit: function() { return this; },
    destroy: function() { return this; }
  };
};