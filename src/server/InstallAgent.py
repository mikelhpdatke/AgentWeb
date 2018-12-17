import telnetlib
import sys
import time
HOST = sys.argv[1]
USER = sys.argv[2]
PASSWORD = sys.argv[3]
telnet = telnetlib.Telnet(HOST)
telnet.read_until("login: ")
telnet.write(USER + "\n")
telnet.read_until("Password: ")
telnet.write(PASSWORD + "\n")
telnet.write("mkdir /tmp -p\n")
telnet.write("cd /tmp\n")
telnet.write("uname -m\n")
time.sleep(1)
arch = telnet.read_very_eager().split('\n')[-2]
if arch[0:3] == 'arm':
    telnet.write("wget http://192.168.0.110/ARM/busybox-arm\n")
    telnet.write("wget http://192.168.0.110/ARM/client\n")
    telnet.write("wget http://192.168.0.110/ARM/strace\n")
    telnet.write("wget http://192.168.0.110/ARM/tcpdump\n")
    telnet.write("chmod +x busybox-arm\n")
    telnet.write("chmod +x client\n")
    telnet.write("chmod +x strace\n")
    telnet.write("chmod +x tcpdump\n")
else:
    telnet.write("wget http://192.168.0.110/MIPSEB/busybox-mips\n")
    telnet.write("wget http://192.168.0.110/MIPSEB/client\n")
    telnet.write("wget http://192.168.0.110/MIPSEB/strace\n")
    telnet.write("wget http://192.168.0.110/MIPSEB/tcpdump\n")
    telnet.write("wget http://192.168.0.110/MIPSEB/netstat-mips\n")
    telnet.write("wget http://192.168.0.110/MIPSEB/server\n")
    telnet.write("wget http://192.168.0.110/MIPSEB/timeout\n")
    telnet.write("chmod +x busybox-mips\n")
    telnet.write("chmod +x client\n")
    telnet.write("chmod +x strace\n")
    telnet.write("chmod +x tcpdump\n")
    telnet.write("chmod +x netstat-mips\n")
    telnet.write("chmod +x server\n")
    telnet.write("chmod +x timeout\n")

telnet.write("exit\n")
print telnet.read_all()
