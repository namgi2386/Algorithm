import sys
input = sys.stdin.readline

M = int(input())
S = set()

for _ in range(M):
    command = input().split()
    op = command[0]
    
    if op == "add":
        S.add(int(command[1]))
    elif op == "remove":
        S.discard(int(command[1]))
    elif op == "check":
        print(1 if int(command[1]) in S else 0)
    elif op == "toggle":
        x = int(command[1])
        if x in S:
            S.remove(x)
        else:
            S.add(x)
    elif op == "all":
        S = set(range(1, 21))
    elif op == "empty":
        S = set()