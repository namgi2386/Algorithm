

n,m = map(int,input().split())
arr =[ [0]*(n+1) for _ in range(n+1)]

def f(up,un):
    if not arr[un][up] and not arr[up][un]:
        arr[un][up] = 1 # un=1 up=4
        arr[up][un] = -1
        for i in range(n+1):
            if arr[un][i] == -1:  # 1행검사
                f(up,i)
            elif arr[up][i] == 1: #4행검사
                f(i,un)

for i in range(m):
    a,b = map(int,input().split())
    if not arr[a][b] and not arr[b][a]:
        arr[a][b] = 1
        arr[b][a] = -1
        for i in range(n+1):
            if arr[a][i] == -1:
                f(b,i)
            elif arr[b][i] == 1:
                f(i,a)
result = 0
for i in range(1, n+1):
    if arr[i].count(-1) >= (n+1)//2:
        result += 1
    elif arr[i].count(1) >= (n+1)//2:
        result += 1
print(result)