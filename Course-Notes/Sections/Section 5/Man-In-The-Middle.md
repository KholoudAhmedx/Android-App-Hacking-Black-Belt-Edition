# Man In The Middle 
Most of the vulnerabilities we encounter in mobile applications (android specifically) are not in the broadcast receivers, content providers, or activities. They are within network services of the application itself. </br>
There are different setups to perform MITM attacks regarding Android devices but they have lots of weaknesses. They act like a proxy for HTTP and HTTPs requests. </br> 
(Go to Wi-Fi settings -> add a proxy -> add the IP of your burp ) this is how you establish a MITM connection. </br>

What is the problem then?
- You will miss a lot of connections; If the app uses SSH, SQL, MQTT or SIP, you don't see this traffic. </br>

**Preferred Setup in this course**: </br>
- Setup includes DNS, HTTP, and intercept every connection the device is establishing including MQTT, SSH, etc. </br>

MIMT happens when you sniff/intercept the connection between a network device (mobile) and the router.

## ARP - Address Resolution Protocol 
When sending a message between two clients on the network, the sending device need to know the ip and the MAC address of the receiving device. In order to get the MAC address of the receiving device, we need to git advantage of ARP protocol: </br>
client A | --------------------------->           | Client B </br>
 </t></t>| send ARP Request                       | ME! </br>
 </t></t> | (Who has this specific Ip?)            | </br>
         | <------------------------              | </br>
         |  ARP Reply (the ip with MAC address)   | </br>
         |  (now we can send messages between)    | </br>
         |        clients                         | </br>
  </br>
The sending client creates **ARP Cache** that is a resolution of each IP and its corresponding MAC address to avoid asking for the MAC address each time. </br>

**How cache gets updated?** </br>
If the receiving client is no longer connects to the network (your pc breaks or something) and a new device connected to the network and the router assigned the same ip of the old client to the new client with a new MAC address. </br>
The sending device keeps trying to connect to the the new receiving device but it keeps failing (the mapping is now invalid), until the sending device goes through the same cycle to get the MAC address of the new client and then update the ARP Cache with the new values. 

How to establish this attack? 
The vulnerability happens when the attacker sends an ARP Reply to the mobile device to trick it into updating its ARP cache with the malicious addresses. </br> And since this protocol requires no authentication/ authorization to update the cache table, and no prior ARP request is necessary to send the reply, the attacker is able to exploit this protocol. </br>
<img width="1391" height="646" alt="image" src="https://github.com/user-attachments/assets/41380c55-6879-4086-b68a-11f85d664dee" />
<img width="1391" height="646" alt="image" src="https://github.com/user-attachments/assets/ddb7fc89-c7b9-45e5-a5d7-67f1d487c342" />
<img width="1920" height="1052" alt="image" src="https://github.com/user-attachments/assets/bee6005d-df37-41f5-9932-657a896883ad" />

**Weaknesses** </br>
- We need to permenantly flood the device with ARP replies to force it to update the cache which causes a headache on the device and causes us to miss pacakages. </br>

## MITM Setup
The whole idea relies on the fact that if we own the device, we don't need to hack it. So instead of acting as a man in the middle, if we have the device we can control it directly and sniff the traffic via it. </br>
The setup requires the following:
1. A smart device
2. A router (the device we control)
3. The attacker machine (ubuntu, not necessarily) to provide internet access</br>

The setup itself is practical, you can refer to the <a href="https://www.udemy.com/course/android-app-hacking-black-belt-edition/learn/lecture/32283770#overview">video</a></br>
<img width="1127" height="567" alt="image" src="https://github.com/user-attachments/assets/e2568a12-2728-4ea5-b592-8b3b058aed9f" />

## Intercepting Theory 
In order to intercpet http traffic and interact with it before forwarding it to the server, we need to forward the traffic via a local proxy. </br>
<img width="1914" height="1074" alt="image" src="https://github.com/user-attachments/assets/b16f3630-562a-4988-800e-047d5ed9dfce" />
You can do this in two steps: </br>
1. Enable ip forwarding for our kernel via this command `echo 1 > /proc/sys/net/ipv4/ip_forward` to enable ipv4 forwarding that turns your machine into a router to forward packets between interfaces.
2. Forward ipv4 packets via ip tables to the local proxy via this command `iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT -to-destination 10.42.0.1:8080`. </br>
<img width="1914" height="1074" alt="image" src="https://github.com/user-attachments/assets/7fd4da6c-9add-477f-84a9-ef31e276ed76" />
>[!Note]
>In order for Burp proxy to forward the traffic to the destination port, we need to use the mode **invisible** that acts as its port is not there, and therefore forward the traffic to the real destination. </br>

## HTTPs Traffic
HTTPs is more secure than HTTP because it builds a trust relationship between the device and the server that established a cryptographic channel between the devices to send the traffic. </br>

## SSL Pinning
SSL pinning does not weaken your application security but it is recommended to do it. </br>
SSL Pinning can be implemented in the following ways: </br>
1. Embed certificate within apk
2. Hardcode fingerprint of the correct certificate into the application. </br>

It can be easily bypassed by reversing the app and replace those values. </br>


