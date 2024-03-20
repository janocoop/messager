import {useState} from "react";
import {client} from "../mqttClient.ts";
function MainPage() {

    const [messages, setMessages] = useState<string[]>([]);

    const [message, setMessage] = useState<string>('');

    function handleSubmit(e) {
        e.preventDefault()
client.send("coop", message)
    }

    const onChangeValues = (value: string) => {
        setMessage(value);


    }

    client.onMessageArrived = (msg ) => {
        console.log(msg.payloadString);
        setMessages([...messages, msg.payloadString])
    }

    client.onMessageDelivered = () => {
        console.log("Message delivered")
    }


    return (<>
        <div style={{
            backgroundColor: 'grey',
            border: '20px solid black',
        }}>
            <div style={{backgroundColor:"beige"}}>
                {messages.map((msg, i) => {
                   return <div key={i}>
                       {msg}
                   </div>

                })}
            </div>


            <form
                onSubmit={handleSubmit}
                style={{marginBottom: '10px', width: '100%'}}
            >
                <label> ID:
                    <input
                        placeholder="Nachricht eingeben" value={message} type="text" name="id" onChange={(e) => {
                        onChangeValues(e.target.value);
                    }} />
                </label>

                <button type="submit">Senden</button>
            </form>
        </div>
    </>);
}
export default MainPage;