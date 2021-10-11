import { Observable } from "rxjs";

interface EventData {
    type: string;
    payload: any;
}

interface MessageHandler<T> {
    (message: T): void;
}

const webSocket = new WebSocket(`ws://localhost:3001`);

webSocket.addEventListener("open", () => {
    webSocket.send("WebSocket connected!");
});

const messageObservable = new Observable<EventData>(subscriber => {
    webSocket.addEventListener("message", (event) => {
        subscriber.next(JSON.parse(event.data));
    });
});

export const ws = {
    subscribeToMessage: <T>(type: string, handler: MessageHandler<T>) => {
        return messageObservable.subscribe((eventData) => {
            if (eventData.type === type) {
                handler(eventData.payload);
            }
        });
    },
};
