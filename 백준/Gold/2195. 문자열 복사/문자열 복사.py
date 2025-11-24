def run(bottom_next_cnt , stack):
    global jump_num
    sn = len(stack)
    if sn:
        jump_num += 1
    else:
        return
    next_stack = []
    for i in range(sn):
        idx = stack[i]+1
        if idx <n and bottom_next_cnt <m:
            if top_arr[idx] == bottom_arr[bottom_next_cnt]:
                next_stack.append(idx)
    run(bottom_next_cnt+1, next_stack)



top_arr = list(input())
bottom_arr = list(input())
n = len(top_arr)
m = len(bottom_arr)

result = m
jump_num = 0
for cnt in range(m):
    if jump_num>1 :
        jump_num -=1
        result -= 1
        continue
    stack = []
    jump_num = 0
    for i in range(n):
        if top_arr[i] == bottom_arr[cnt]:
            stack.append(i)
    if cnt != m-1:
        run(cnt+1,stack)
print(result)