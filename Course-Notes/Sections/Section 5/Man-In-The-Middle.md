# Man In The Middle 
Most of the vulnerabilities we encounter in mobile applications (android specifically) are not in the broadcast receivers, content providers, or activities. They are within network services of the application itself. </br>
There are different setups to perform MITM attacks regarding Android devices but they have lots of weaknesses. They act like a proxy for HTTP and HTTPs requests. </br> 
(Go to Wi-Fi settings -> add a proxy -> add the IP of your burp ) this is how you establish a MITM connection. </br>

What is the problem then?
- You will miss a lot of connections; If the app uses SSH, SQL, MQTT or SIP, you don't see this traffic. </br>


## ARP - Address Resolution Protocol 

