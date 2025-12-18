arr =list(input())
n = len(arr)
def f():
    
    for i in range(n,0,-1):
        for k in range(n-i+1):
            for j in range(i//2+1):
                if arr[j+k] != arr[i-j-1+k]:
                    return i
for i in range(n-1):
    if arr[i] != arr[i+1]:
        print(f())
        break
else :
    print(-1)
        