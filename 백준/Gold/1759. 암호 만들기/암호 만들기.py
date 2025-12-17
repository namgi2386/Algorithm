n , m = map(int,input().split())
arr = list(input().split())
arr.sort()


def f(lev,s,start,za,mo):
    if lev==n:
        if mo and za>=2 :
            print("".join(s))
        return
    
    for i in range(start , m):
        if arr[i] not in s:
            if arr[i] in 'aeiuo':
                f(lev+1 , s +[arr[i]] , i,za ,mo+1 )
            else:
                f(lev+1 , s +[arr[i]] , i,za+1 ,mo )
f(0,[],0,0,0)