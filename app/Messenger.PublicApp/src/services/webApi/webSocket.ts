import { Observable } from "rxjs";

interface MessageEventData {
    type: string;
    payload: any;
}

interface SubscriptionHandler<T> {
    (data: T): void;
}

let messageEventObservable: Observable<MessageEventData> | null = null;

export const runWebSocket = (url: string) => {
    const webSocket = new WebSocket(url);

    webSocket.addEventListener("open", () => {
        webSocket.send("WebSocket connected...");
    });

    messageEventObservable = new Observable<MessageEventData>((subscriber) => {
        webSocket.addEventListener("message", (event) => {
            subscriber.next(JSON.parse(event.data));
        });
    });
};

export const subscribeToWebSocket = <T>(type: string, handler: SubscriptionHandler<T>) => {
    if (!messageEventObservable) {
        throw new Error("WebSocket is not running");
    }

    return messageEventObservable.subscribe((eventData) => {
        if (eventData.type === type) {
            handler(eventData.payload);
        }
    });
};
