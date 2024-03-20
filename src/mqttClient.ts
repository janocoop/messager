type MqttClient = {
    connect: (args: {
        onSuccess: () => void;
        onFailure: (err: {errorMessage: string}) => void;
    }) => void;

    subscribe: (topic: string) => void;
    send: (topic: string, message: string) => void;
onMessageDelivered: () => void;
onMessageArrived: (msg: {
    destinationName: string;
    payloadString: string;
}) => void

}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const client: MqttClient = new Paho.MQTT.Client("localhost", 8083, Math.random().toString())

client.connect({
    onSuccess: () => {
        console.log("Connected successfully");
        client.subscribe("coop")
        },
    onFailure: (err ) => {
        console.error((err.errorMessage))
    }
});







