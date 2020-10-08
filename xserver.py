from twisted.internet.protocol import Protocol,ClientCreator
from twisted.internet import reactor
from twisted.protocols.basic import LineReceiver
from twisted.internet.protocol import Factory,ClientFactory
class Transfer(Protocol):
        
        def __init__(self):
                pass
        def connectionMade(self):
                c = ClientCreator(reactor,Clienttransfer)
                c.connectTCP("127.0.0.1",53).addCallback(self.set_protocol)
                self.transport.pauseProducing()

        def set_protocol(self,p):
                self.server = p
                p.set_protocol(self)

        def dataReceived(self,data):
                                   
            vod = "GET x /HTTP/1.1\r\n"
            if vod in data:
                    fin = data.replace(vod,"")
                    self.server.transport.write(fin)
            else:
                self.server.transport.write(data)

        def connectionLost(self,reason):
                self.transport.loseConnection()
                self.server.transport.loseConnection()

class Clienttransfer(Protocol):
        def __init__(self):
                pass

        def set_protocol(self,p):
                self.server = p
                self.server.transport.resumeProducing()
                pass
        def dataReceived(self,data):
                self.server.transport.write(data)
                #pass

factory = Factory()
factory.protocol = Transfer
reactor.listenTCP(80,factory)
reactor.run()
