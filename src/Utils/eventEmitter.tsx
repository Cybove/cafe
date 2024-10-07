class EventEmitter {
    private listeners: { [event: string]: Function[] } = {};
    private eventLog: { timestamp: Date, action: string, event: string }[] = [];

    on(event: string, fn: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(fn);
        this.logEvent('subscribe', event);
    }

    off(event: string, fn: Function) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
            this.logEvent('unsubscribe', event);
        }
    }

    emit(event: string, data: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(fn => fn(data));
            this.logEvent('emit', event);
        }
    }

    removeListener(event: string, fn: Function) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
            this.logEvent('removeListener', event);
        }
    }

    private logEvent(action: string, event: string) {
        this.eventLog.push({ timestamp: new Date(), action, event });
    }

    getEventLog() {
        return this.eventLog;
    }

    getEventCount(): number {
        return Object.keys(this.listeners).length;
    }

    getEventTypes(): string[] {
        return Object.keys(this.listeners);
    }
    getListenerCount(event: string): number {
        return this.listeners[event] ? this.listeners[event].length : 0;
    }

    getAllListenerCounts(): { [event: string]: number } {
        const counts: { [event: string]: number } = {};
        for (const event in this.listeners) {
            counts[event] = this.listeners[event].length;
        }
        return counts;
    }
}

export const eventEmitter = new EventEmitter();
