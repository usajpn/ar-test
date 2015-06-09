from __future__ import print_function
import socket
from contextlib import closing

def main():
  host = '192.168.1.10'
  port = 8888
  bufsize = 4096

  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  with closing(sock):
    sock.connect((host, port))
    sock.send(b'Hello world')
    print(sock.recv(bufsize))
  return

if __name__ == '__main__':
  main()
