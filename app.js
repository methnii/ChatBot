const chatList = [];  

function sendMessage() {  
    const messageInput = document.getElementById('messageInput');  
    const txtUserInput = messageInput.value.trim();  

  

   
    const sender = "sender1";   
    let chatBubble = `  
        <div class="message ${sender}-message">  
            <h6>${txtUserInput}</h6>  
        </div>  
    `;  

    chatList.push(chatBubble);  
    loadChatBox();  
    messageInput.value = '';  

    fetchAIResponse(txtUserInput);  
}  

function loadChatBox() {  
    const chatMessages = document.getElementById('chatMessages');  
    chatMessages.innerHTML = chatList.join('');  
    chatMessages.scrollTop = chatMessages.scrollHeight;  
}  

function fetchAIResponse(userMessage) {  
    const myHeaders = new Headers({"Content-Type": "application/json"});  
    const raw = JSON.stringify({  
        "contents": [  
            {  
                "parts": [  
                    {"text": userMessage}  
                ]  
            }  
        ]  
    });  

    const requestOptions = {  
        method: "POST",  
        headers: myHeaders,  
        body: raw,  
    };  

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBsBxN_hEZxyCns-TD33w-eyCfXcQUTmZU", requestOptions)  
        .then(response => response.json())  
        .then(result => {  
            const aiResponseBubble = `  
                <div class="message sender2-message">  
                    <h6>${result.candidates[0].content.parts[0].text}</h6>  
                </div>  
            `;  
            chatList.push(aiResponseBubble);  
            loadChatBox();  
        })  
        
}  

