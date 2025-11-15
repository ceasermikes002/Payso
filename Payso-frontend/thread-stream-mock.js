
      export const createWriteStream = () => ({
        write: () => {},
        end: () => {},
        on: () => {},
        once: () => {},
        emit: () => {},
        addListener: () => {},
        removeListener: () => {},
        removeAllListeners: () => {},
        setMaxListeners: () => {},
        getMaxListeners: () => 10,
        listeners: () => [],
                        rawListeners: () => [],
                        emit: () => false,
                        listenerCount: () => 0,
                        prependListener: () => {},
                        prependOnceListener: () => {},
                        eventNames: () => []
      });
      export default { createWriteStream };
    