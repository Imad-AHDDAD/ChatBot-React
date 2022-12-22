import "./Chat.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { faSun } from "@fortawesome/free-solid-svg-icons";

function Chat() {

    const [chat,setChat] = useState([]);
    const [inputMessage,setInputMessage] = useState('');
    const [botTyping,setbotTyping] = useState(false);

    // it's used to scroll the part of messages
    useEffect(()=>{
        const objDiv = document.getElementById('messageArea');
        objDiv.scrollTop = objDiv.scrollHeight;
    },[chat])

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        const name = "imad";
        const request_temp = {sender : "user", sender_id : name , msg : inputMessage};
        
        if(inputMessage !== ""){
            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(name,inputMessage);
        }
        else{
            window.alert("Please enter valid message");
        }
        
    }

    const rasaAPI = async function handleClick(name,msg) {
        await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'charset':'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
        .then(response => response.json())
        .then((response) => {
            if(response){
                const temp = response[0];
                const recipient_id = temp["recipient_id"];
                const recipient_msg = temp["text"];        
                const response_temp = {sender: "bot",recipient_id : recipient_id,msg: recipient_msg};
                setbotTyping(false);
                setChat(chat => [...chat, response_temp]);

            }
        }) 
    }

    return (
        <>
            <input type="checkbox" name="mod" id="mod-toggle" />
            <div className="container">
                <input type="checkbox" name="nav-toggle" id="nav-toggle" />
                <div className="sidebar">
                    <h3>BA-CHATBOT</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto hic id vitae eum, unde eligendi veniam praesentium eaque deserunt sequi.</p>
                    <h3>HOW TO USE IT ?</h3>
                    <ul>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem, ipsum dolor.</li>
                        <li>Lorem, ipsum dolor.</li>
                    </ul>
                    <h3>DEVELOPED BY : </h3>
                    <ul>
                        <li>Abdessalam BOULAYAT</li>
                        <li>Imad AHDDAD</li>
                    </ul>
                    <h3>MODULE</h3>
                    <ul>
                        <li>DB Administration</li>
                    </ul>
                    <h3>PROFESSOR</h3>
                    <ul>
                        <li>Mme. <br /> Khadija BOUZAACHANE</li>
                    </ul>
                </div>
                <div className="main-content">

                    <div className="header">
                        <div className="logo">
                            <label htmlFor="nav-toggle">
                                <FontAwesomeIcon className="icon" icon={faRobot} />
                            </label>
                            <h3>Chat with BA-CHATBOT</h3>
                        </div>
                        <div className="mod">
                            <label htmlFor="mod-toggle">
                                <FontAwesomeIcon className="icon" icon={faSun} />
                            </label>
                        </div>
                    </div>

                    <div className="chatBody" id="messageArea">
                        <div className="messageshape">
                            {chat.map((user,key) => (
                                    <div key={key}>
                                        {
                                            user.sender === 'bot' ?
                                            (
                                            <div className="left">
                                                <div className="botIcon"><FontAwesomeIcon icon={faRobot} /></div>
                                                <div className="botMsg" key={key}>{user.msg}</div>
                                            </div>
                                            ) :
                                            (
                                            <div className="right">
                                                <div className="userMsg" key={key}>{user.msg}</div>
                                                <div className="userIcon"><FontAwesomeIcon icon={faUser} /></div>
                                            </div>
                                            )
                                        }
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="status">
                        {botTyping ? <h5>Bot Typing....</h5> : null}
                    </div>
                    <div className="chatFooter">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Enter a message ..." name="message" id="message" onChange={e => setInputMessage(e.target.value)} value={inputMessage} />
                            <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Chat;