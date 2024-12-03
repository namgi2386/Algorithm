
n = int(input())
arr =[ [] for _ in range(n+1)]

while True:
    a,b = map(int,input().split())
    if a == -1:
        break
    arr[a].append(b)
    arr[b].append(a)
# print(arr)
result_arr = [int(1e9)]*(n+1)
total_result = int(1e9)
for idx in range(1,n+1):
    stack =[]
    visited = [0]*(n+1)
    visited[0] = 1
    visited[idx] = 1
    for i in arr[idx]:
        stack.append((i,1))
    while stack:
        next , lev = stack.pop(0)
        if visited[next] == 0:
            visited[next] = lev
            for i in arr[next]:
                stack.append((i,lev+1))
    result = 0
    for i in range(1,n+1):
        result = max(result , visited[i])
    result_arr[idx] = result
    total_result = min(total_result , result)
print_arr = []
for i in range(n+1):
    if result_arr[i] == total_result:
        print_arr.append(i)
print(f'{total_result} {len(print_arr)}')
print_arr.sort()
print(*print_arr)
