def pre(t): # 1
    if word[t]:
        print(word[t],end="") # A
        pre(word.index(left[t])) # B
        pre(word.index(right[t])) # C
def ino(t):
    if word[t]:
        ino(word.index(left[t]))
        print(word[t],end="")
        ino(word.index(right[t]))
def pos(t):
    if word[t]:
        pos(word.index(left[t]))
        pos(word.index(right[t]))
        print(word[t],end="")

n = int(input())
left = [0]*(n+1)
right = [0]*(n+1)
word = [0]*(n+1)
for idx in range(n):
    arr = list(input().split())
    word[idx] = arr[0]
    if not left[idx] and arr[1] != '.':
        left[idx] = arr[1]
    if not right[idx] and arr[2] != '.':
        right[idx] = arr[2]
    
pre(0)
print()
ino(0)
print()
pos(0)